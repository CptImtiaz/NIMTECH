import { useEffect, useRef, useState } from 'react'
import { P, REDUCE } from '../lib/canvas.js'

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

// Liquid glass sphere: domain-warped interior with bright ribbons, fresnel
// rim, specular highlight and a soft halo. Output is premultiplied so it
// sits cleanly on white.
const FRAG = `
precision highp float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*n(p);p=p*2.02+vec3(1.7,9.2,3.1);a*=.5;}return s;}
mat3 rot(float a,float b){float ca=cos(a),sa=sin(a),cb=cos(b),sb=sin(b);
 return mat3(ca,0.,-sa,0.,1.,0.,sa,0.,ca)*mat3(1.,0.,0.,0.,cb,sb,0.,-sb,cb);}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y)*2.6;
 float d=length(uv);float R=1.;
 vec3 deep=vec3(0.,.3,1.),mid=vec3(.19,.6,1.),ice=vec3(.86,.95,1.),vio=vec3(.4,.38,1.),cyan=vec3(.35,.88,1.);
 if(d>R){
  float g=exp(-(d-R)*5.)*.3*smoothstep(1.29,1.05,d);
  gl_FragColor=vec4(mid*g,g);return;
 }
 vec3 nrm=vec3(uv,sqrt(1.-d*d));
 vec3 q=rot(t*.08+m.x*.8,m.y*.6)*nrm;
 vec3 w=vec3(fbm(q*1.4+t*.05),fbm(q*1.4+vec3(5.2,1.3,2.8)-t*.04),fbm(q*1.4+vec3(1.7,9.2,4.1)));
 float f=fbm(q*1.6+w*2.2+vec3(0.,0.,t*.06));
 float shade=.5+.5*dot(nrm,normalize(vec3(-.5,.6,.6)));
 vec3 col=mix(deep,mid,shade*.75+f*.35);
 col=mix(col,vio,smoothstep(.5,.8,w.y)*.5);
 float rib=pow(.5+.5*sin(f*16.+w.x*6.+t*.7),8.);
 float rib2=pow(.5+.5*sin(w.z*14.-t*.5),10.);
 col+=rib*vec3(.55,.85,1.)*.75+rib2*cyan*.35;
 float fr=pow(1.-nrm.z,3.);
 col=mix(col,ice,fr*.95);
 vec3 L=normalize(vec3(-.45+m.x*.6,.55-m.y*.5,.75));
 float sp=pow(max(dot(reflect(-L,nrm),vec3(0.,0.,1.)),0.),48.);
 float sp2=pow(max(dot(reflect(-normalize(vec3(.6,-.5,.6)),nrm),vec3(0.,0.,1.)),0.),10.)*.18;
 col+=vec3(sp*1.2+sp2);
 float a=clamp(.55+.45*fr+rib*.3+sp,0.,1.)*smoothstep(R,R-.012,d);
 gl_FragColor=vec4(col*a,a);
}`

export default function Orb({ className = '' }) {
  const ref = useRef(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const c = ref.current
    const gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true })
    if (!gl) return setFallback(true)
    const sh = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const pr = gl.createProgram()
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return setFallback(true)
    gl.useProgram(pr)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm')
    gl.clearColor(0, 0, 0, 0)

    let raf, vis = true, mx = 0, my = 0
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    const rs = () => {
      c.width = Math.round(c.clientWidth * dpr)
      c.height = Math.round(c.clientHeight * dpr)
      gl.viewport(0, 0, c.width, c.height)
    }
    rs()
    const ro = new ResizeObserver(rs)
    ro.observe(c)
    const io = new IntersectionObserver((es) => (vis = es[0].isIntersecting))
    io.observe(c)
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!vis || document.hidden) return
      mx += (P.x - mx) * 0.05
      my += (P.y - my) * 0.05
      gl.uniform2f(uR, c.width, c.height)
      gl.uniform1f(uT, REDUCE ? 4 : now / 1000)
      gl.uniform2f(uM, mx, my)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  if (fallback) {
    return (
      <div className={`${className} grid place-items-center`} aria-hidden="true">
        <div className="orb-fallback aspect-square w-[72%] rounded-full" />
      </div>
    )
  }
  return <canvas ref={ref} className={className} aria-hidden="true" />
}
