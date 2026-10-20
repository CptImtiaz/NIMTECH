import { useEffect, useRef, useState } from 'react'
import { REDUCE } from '../lib/canvas.js'
import { hasWebGL } from '../three/themes'

// The glassy orb in the home hero. The source video has a black
// background, and `mix-blend-mode: screen` over a white page would wash it
// out, so the orb is drawn in WebGL instead: the video's brightness becomes
// its alpha (black drops out) and the CSS filter grades purple to brand
// blue. If the video can't be used (offline, blocked, no CORS), a
// procedural glass orb in brand blue is drawn in its place.
export const ORB_SRC = 'https://future.co/images/homepage/glassy-orb/orb-purple.webm'
const GRADE = 'hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)'

const VERT = 'attribute vec2 p; varying vec2 v; void main(){ v = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }'
const KEY = `precision mediump float; uniform sampler2D tex; varying vec2 v;
void main(){
  vec3 c = texture2D(tex, vec2(v.x, 1. - v.y)).rgb;
  float m = max(c.r, max(c.g, c.b));
  float a = smoothstep(.08, .6, m) * m;
  gl_FragColor = vec4(c / max(m, .001) * mix(.55, 1., m), a);
}`
const ORB = `precision highp float; uniform float t; uniform vec2 res; varying vec2 v;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += a*n(p); p *= 2.03; a *= .5; } return s; }
void main(){
  vec2 p = (v * 2. - 1.) * vec2(res.x / res.y, 1.);
  float R = .66, r = length(p) / R;
  vec3 deep = vec3(.0, .27, .92), mid = vec3(.0, .52, 1.), lit = vec3(.38, .69, 1.);
  if (r > 1.) { float g = exp(-(r - 1.) * 3.6); gl_FragColor = vec4(mid, g * .38); return; }
  vec3 N = vec3(p / R, sqrt(max(0., 1. - r*r)));
  float a = t * .12; mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
  vec2 q = m * (N.xy * 1.7);
  float f = fbm(q * 1.4 + vec2(fbm(q + t * .18), fbm(q - t * .14)) * 1.6);
  vec3 col = mix(deep * .75, mid, clamp(N.z * .9 + (f - .5) * .8, 0., 1.));
  col = mix(col, lit, smoothstep(.58, .92, f) * .7 * N.z);
  float fr = pow(1. - N.z, 2.2);
  col = mix(col, vec3(.45, .74, 1.), fr * .55);
  col += pow(max(dot(N, normalize(vec3(-.45, .55, .7))), 0.), 36.) * .85;
  col += vec3(.2, .55, 1.) * pow(max(dot(N, normalize(vec3(.55, -.55, .5))), 0.), 4.) * .45;
  gl_FragColor = vec4(col, smoothstep(1., .93, r) * (.88 + .12 * fr));
}`

function program(gl, frag) {
  const sh = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const pr = gl.createProgram()
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT))
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(pr)
  return pr
}

export default function Orb({ className = '' }) {
  const ref = useRef(null)
  const [mode, setMode] = useState('init') // init | video | shader | css

  // decide once the page is idle: no GPU (software WebGL) gets the CSS orb
  const [gpu, setGpu] = useState(null)
  useEffect(() => {
    const run = () => setGpu(hasWebGL())
    if (!('requestIdleCallback' in window)) return void setTimeout(run, 300)
    const id = requestIdleCallback(run, { timeout: 1500 })
    return () => cancelIdleCallback(id)
  }, [])

  useEffect(() => {
    if (gpu === null) return
    if (!gpu) return void setMode('css')
    const cv = ref.current
    const gl = cv?.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: true })
    if (!gl) return void setMode('css')
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    const use = (pr) => {
      gl.useProgram(pr)
      const loc = gl.getAttribLocation(pr, 'p')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    }
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5)
      cv.width = Math.max(1, Math.round(cv.clientWidth * d))
      cv.height = Math.max(1, Math.round(cv.clientHeight * d))
      gl.viewport(0, 0, cv.width, cv.height)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)

    // reduced motion: draw one still frame
    const still = REDUCE
    let state = 'shader', raf = 0, visible = true, drawn = false, t0 = performance.now()
    const keyPr = program(gl, KEY)
    const orbPr = program(gl, ORB)
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // try the hosted video; anything that goes wrong keeps the shader orb
    const video = document.createElement('video')
    Object.assign(video, { crossOrigin: 'anonymous', muted: true, loop: true, playsInline: true, autoplay: true, preload: 'auto', src: ORB_SRC })
    video.setAttribute('playsinline', '')
    const onPlay = () => {
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
        if (gl.getError() !== gl.NO_ERROR) throw new Error('texture')
        state = 'video'
        drawn = false
        setMode('video')
        if (REDUCE) video.pause()
      } catch {
        video.removeAttribute('src')
      }
    }
    video.addEventListener('playing', onPlay, { once: true })
    video.play().catch(() => {})
    setMode('shader')

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible || document.hidden || (still && drawn)) return
      drawn = true
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (state === 'video') {
        use(keyPr)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        if (video.readyState >= 2) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      } else {
        use(orbPr)
        gl.uniform1f(gl.getUniformLocation(orbPr, 't'), REDUCE ? 4 : (performance.now() - t0) / 1000)
        gl.uniform2f(gl.getUniformLocation(orbPr, 'res'), cv.width, cv.height)
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      video.pause()
      video.removeAttribute('src')
      video.load()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [gpu])

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <canvas ref={ref} className="absolute inset-0 h-full w-full transition-opacity duration-1000" style={{ filter: mode === 'video' ? GRADE : undefined, opacity: mode === 'init' ? 0 : 1 }} />
      {mode === 'css' && (
        <div className="orb-css absolute inset-[18%] rounded-full">
          <span className="orb-css-shine" />
        </div>
      )}
    </div>
  )
}
