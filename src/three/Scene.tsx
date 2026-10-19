import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshTransmissionMaterial, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { P, REDUCE } from '../lib/canvas.js'

// Site palette (keep in sync with tailwind.config.js)
export const BLUE = '#2F7BFF'
export const LIGHT = '#5FB0FF'
export const CYAN = '#5CE1FF'

export type Variant = 'core' | 'agents' | 'vision' | 'software' | 'apps' | 'api' | 'content' | 'orbit'

/* ---------- shared rig: placement, pointer parallax, scroll spin ---------- */
function Rig({ children, align }: { children: React.ReactNode; align: 'right' | 'center' }) {
  const g = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()
  const wide = size.width >= 1024
  useFrame((_, dt) => {
    const o = g.current
    if (!o) return
    const scroll = Math.min(1.5, window.scrollY / window.innerHeight)
    const tx = wide && align === 'right' ? viewport.width * 0.27 : 0
    const ty = wide ? 0 : viewport.height * 0.27
    o.position.x = THREE.MathUtils.damp(o.position.x, tx, 4, dt)
    o.position.y = THREE.MathUtils.damp(o.position.y, ty + scroll * 0.8, 4, dt)
    o.rotation.y = THREE.MathUtils.damp(o.rotation.y, P.x * 0.6 + scroll * 1.2, 3, dt)
    o.rotation.x = THREE.MathUtils.damp(o.rotation.x, P.y * 0.4 + scroll * 0.3, 3, dt)
    const s = (wide ? 1 : 0.62) * (1 - scroll * 0.15)
    o.scale.setScalar(THREE.MathUtils.damp(o.scale.x, s, 4, dt))
  })
  return <group ref={g}>{children}</group>
}

const glass = {
  backside: true,
  samples: 4,
  resolution: 256,
  thickness: 0.5,
  chromaticAberration: 0.25,
  anisotropy: 0.3,
  distortion: 0.25,
  distortionScale: 0.4,
  temporalDistortion: 0.08,
  ior: 1.28,
  roughness: 0.04,
  color: '#d6ebff',
}

/* ---------- home: glass knot around a glowing core ---------- */
function Core() {
  const knot = useRef<THREE.Mesh>(null)
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (knot.current) {
      knot.current.rotation.x += dt * 0.12
      knot.current.rotation.y += dt * 0.18
    }
    if (r1.current) r1.current.rotation.z += dt * 0.25
    if (r2.current) r2.current.rotation.z -= dt * 0.18
  })
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={knot} scale={0.82}>
          <torusKnotGeometry args={[1, 0.34, 220, 36]} />
          <MeshTransmissionMaterial {...glass} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>
      </Float>
      <mesh ref={r1} rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[2.05, 0.006, 16, 220]} />
        <meshBasicMaterial color={LIGHT} transparent opacity={0.7} />
      </mesh>
      <mesh ref={r2} rotation={[1.9, -0.4, 0.4]}>
        <torusGeometry args={[2.4, 0.004, 16, 220]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.45} />
      </mesh>
      <Sparkles count={90} scale={6} size={2.2} speed={0.35} color={CYAN} />
    </>
  )
}

/* ---------- agents: neural network sphere with travelling pulses ---------- */
function Network() {
  const { points, edges } = useMemo(() => {
    const N = 140, R = 1.6, pts: THREE.Vector3[] = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i
      pts.push(new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R))
    }
    const e: [number, number][] = []
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (pts[i].distanceTo(pts[j]) < 0.5) e.push([i, j])
    return { points: pts, edges: e }
  }, [])
  const pointGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(edges.flatMap(([a, b]) => [points[a], points[b]])), [edges, points])
  const group = useRef<THREE.Group>(null)
  const pulses = useRef<THREE.InstancedMesh>(null)
  const state = useMemo(() => Array.from({ length: 24 }, () => ({ e: Math.floor(Math.random() * edges.length), t: Math.random() })), [edges.length])
  const m = useMemo(() => new THREE.Matrix4(), [])
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12
    state.forEach((p, i) => {
      p.t += dt * 0.9
      if (p.t > 1) {
        p.t = 0
        p.e = Math.floor(Math.random() * edges.length)
      }
      const [a, b] = edges[p.e]
      const v = points[a].clone().lerp(points[b], p.t)
      m.makeTranslation(v.x, v.y, v.z)
      pulses.current?.setMatrixAt(i, m)
    })
    if (pulses.current) pulses.current.instanceMatrix.needsUpdate = true
  })
  return (
    <group ref={group}>
      <points geometry={pointGeo}>
        <pointsMaterial size={0.05} color={LIGHT} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.35} />
      </lineSegments>
      <instancedMesh ref={pulses} args={[undefined, undefined, 24]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={CYAN} />
      </instancedMesh>
      <Float speed={2} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[0.6, 1]} />
          <MeshTransmissionMaterial {...glass} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>
      </Float>
    </group>
  )
}

/* ---------- vision: lens rings, iris and floating detections ---------- */
function Lens() {
  const rings = useRef<THREE.Group>(null)
  const scan = useRef<THREE.Mesh>(null)
  const boxes = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ a: (i / 6) * Math.PI * 2, r: 2 + (i % 2) * 0.35, y: ((i % 3) - 1) * 0.6, s: 0.22 + (i % 3) * 0.06 })), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), [])
  const orbit = useRef<THREE.Group>(null)
  useFrame((s, dt) => {
    rings.current?.children.forEach((c, i) => (c.rotation.z += dt * (0.15 + i * 0.08) * (i % 2 ? -1 : 1)))
    if (scan.current) scan.current.position.y = Math.sin(s.clock.elapsedTime * 0.9) * 1.4
    if (orbit.current) orbit.current.rotation.y += dt * 0.2
  })
  return (
    <>
      <group ref={rings}>
        {[1.1, 1.35, 1.6, 1.85].map((r, i) => (
          <mesh key={r} rotation={[0, 0, i]}>
            <torusGeometry args={[r, i === 2 ? 0.03 : 0.008, 16, 200, i % 2 ? Math.PI * 1.4 : Math.PI * 2]} />
            <meshBasicMaterial color={i % 2 ? CYAN : LIGHT} transparent opacity={0.75 - i * 0.12} />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshTransmissionMaterial {...glass} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>
      <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.9, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={orbit}>
        {boxes.map((b, i) => (
          <Float key={i} speed={2} floatIntensity={0.5}>
            <lineSegments geometry={edges} position={[Math.cos(b.a) * b.r, b.y, Math.sin(b.a) * b.r]} scale={b.s}>
              <lineBasicMaterial color={CYAN} />
            </lineSegments>
          </Float>
        ))}
      </group>
    </>
  )
}

/* ---------- software: isometric data blocks rising in waves ---------- */
function Blocks() {
  const n = 9
  const mesh = useRef<THREE.InstancedMesh>(null)
  const m = useMemo(() => new THREE.Matrix4(), [])
  const col = useMemo(() => new THREE.Color(), [])
  const a = useMemo(() => new THREE.Color(BLUE), [])
  const b = useMemo(() => new THREE.Color(CYAN), [])
  useFrame((s) => {
    const t = s.clock.elapsedTime
    let k = 0
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const h = 0.2 + ((Math.sin(i * 0.6 + t) + Math.cos(j * 0.5 + t * 0.8) + 2) / 4) * 1.4
        m.compose(new THREE.Vector3((i - n / 2) * 0.32, h / 2 - 0.6, (j - n / 2) * 0.32), new THREE.Quaternion(), new THREE.Vector3(0.26, h, 0.26))
        mesh.current?.setMatrixAt(k, m)
        mesh.current?.setColorAt(k, col.copy(a).lerp(b, (h - 0.2) / 1.4))
        k++
      }
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    }
  })
  return (
    <group rotation={[0.55, Math.PI / 4, 0]} scale={0.68}>
      <instancedMesh ref={mesh} args={[undefined, undefined, n * n]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.4} roughness={0.25} emissive={BLUE} emissiveIntensity={0.25} />
      </instancedMesh>
    </group>
  )
}

/* ---------- apps: floating phones ---------- */
function Phones() {
  const phones = [
    [-1.3, 0.1, -0.6, 0.35],
    [0, 0, 0.3, 0],
    [1.3, -0.1, -0.6, -0.35],
  ]
  return (
    <>
      {phones.map(([x, y, z, ry], i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.3} floatIntensity={0.8}>
          <group position={[x, y, z]} rotation={[0, ry, 0]}>
            <RoundedBox args={[1.05, 2.15, 0.09]} radius={0.12} smoothness={6}>
              <meshPhysicalMaterial color="#0b1222" metalness={0.8} roughness={0.2} clearcoat={1} />
            </RoundedBox>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[0.92, 2]} />
              <meshBasicMaterial color={i === 1 ? BLUE : '#0f2547'} />
            </mesh>
            {[0.55, 0.25, -0.05, -0.35, -0.65].map((yy, k) => (
              <mesh key={k} position={[0, yy, 0.055]}>
                <planeGeometry args={[k === 0 ? 0.78 : 0.7 - (k % 2) * 0.2, k === 0 ? 0.36 : 0.12]} />
                <meshBasicMaterial color={k === 0 ? CYAN : LIGHT} transparent opacity={k === 0 ? 0.9 : 0.45} />
              </mesh>
            ))}
          </group>
        </Float>
      ))}
      <Sparkles count={50} scale={5} size={2} speed={0.3} color={CYAN} />
    </>
  )
}

/* ---------- api: data streams flowing through a hub ---------- */
function Streams() {
  const curves = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const side = i < 5 ? -1 : 1, k = (i % 5) - 2
        return new THREE.CatmullRomCurve3([new THREE.Vector3(side * 2.4, k * 0.55, Math.sin(i) * 0.4), new THREE.Vector3(side * 1.1, k * 0.25, 0.2), new THREE.Vector3(0, 0, 0)])
      }),
    [],
  )
  const lines = useMemo(
    () => curves.map((c, i) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(40)), new THREE.LineBasicMaterial({ color: i < 5 ? LIGHT : CYAN, transparent: true, opacity: 0.4 }))),
    [curves],
  )
  const dots = useRef<THREE.InstancedMesh>(null)
  const st = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ c: i % 10, t: Math.random() })), [])
  const m = useMemo(() => new THREE.Matrix4(), [])
  const hub = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    st.forEach((p, i) => {
      p.t = (p.t + dt * 0.35) % 1
      const v = curves[p.c].getPoint(p.c < 5 ? p.t : 1 - p.t)
      m.makeTranslation(v.x, v.y, v.z)
      dots.current?.setMatrixAt(i, m)
    })
    if (dots.current) dots.current.instanceMatrix.needsUpdate = true
    if (hub.current) {
      hub.current.rotation.x += dt * 0.4
      hub.current.rotation.y += dt * 0.3
    }
  })
  return (
    <group scale={0.78}>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
      <instancedMesh ref={dots} args={[undefined, undefined, 40]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={CYAN} />
      </instancedMesh>
      <mesh ref={hub}>
        <torusGeometry args={[0.55, 0.18, 32, 96]} />
        <MeshTransmissionMaterial {...glass} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>
      {curves.map((c, i) => {
        const p = c.points[0]
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={i < 5 ? LIGHT : CYAN} emissive={i < 5 ? BLUE : CYAN} emissiveIntensity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

/* ---------- content: helix of floating cards ---------- */
function Helix() {
  const g = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.25
  })
  return (
    <group ref={g}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = i * 0.7, y = (i - 8) * 0.26
        return (
          <group key={i} position={[Math.cos(a) * 1.6, y, Math.sin(a) * 1.6]} rotation={[0, -a + Math.PI / 2, 0]}>
            <RoundedBox args={[0.9, 0.56, 0.03]} radius={0.05} smoothness={4}>
              <meshPhysicalMaterial color={i % 3 === 0 ? BLUE : '#0d1a33'} metalness={0.5} roughness={0.25} clearcoat={1} emissive={i % 3 === 0 ? BLUE : '#000'} emissiveIntensity={0.4} />
            </RoundedBox>
            <mesh position={[0, 0.1, 0.02]}>
              <planeGeometry args={[0.7, 0.06]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.8} />
            </mesh>
            <mesh position={[-0.08, -0.05, 0.02]}>
              <planeGeometry args={[0.54, 0.04]} />
              <meshBasicMaterial color={LIGHT} transparent opacity={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

/* ---------- generic pages: particle galaxy ---------- */
function Galaxy() {
  const geo = useMemo(() => {
    const N = 3500, pos = new Float32Array(N * 3), col = new Float32Array(N * 3)
    const a = new THREE.Color(BLUE), b = new THREE.Color(CYAN), c = new THREE.Color()
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 0.7) * 2.6, arm = (i % 3) * ((Math.PI * 2) / 3), spin = r * 1.8
      const j = () => (Math.random() - 0.5) * 0.35 * (1 - r / 3)
      pos.set([Math.cos(arm + spin) * r + j(), j() * 0.6, Math.sin(arm + spin) * r + j()], i * 3)
      c.copy(b).lerp(a, r / 2.6)
      col.set([c.r, c.g, c.b], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08
  })
  return (
    <group rotation={[0.5, 0, 0.15]}>
      <points ref={ref} geometry={geo}>
        <pointsMaterial size={0.025} vertexColors transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshTransmissionMaterial {...glass} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
    </group>
  )
}

const SCENES: Record<Variant, () => JSX.Element> = {
  core: Core,
  agents: Network,
  vision: Lens,
  software: Blocks,
  apps: Phones,
  api: Streams,
  content: Helix,
  orbit: Galaxy,
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Scene({ variant = 'orbit', align = 'right' }: { variant?: Variant; align?: 'right' | 'center' }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [ok] = useState(hasWebGL)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])
  const S = SCENES[variant]
  if (!ok) return <div className="orb-fallback absolute right-[8%] top-1/2 aspect-square w-[34%] -translate-y-1/2 rounded-full" aria-hidden="true" />
  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.2], fov: 40 }} gl={{ antialias: true, alpha: true }} frameloop={visible && !REDUCE ? 'always' : 'demand'}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color={LIGHT} />
        <pointLight position={[-4, -2, 2]} intensity={20} color={CYAN} />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.5} color={LIGHT} position={[0, 5, -6]} scale={[10, 2, 1]} />
          <Lightformer intensity={3} color={CYAN} form="ring" position={[-6, 0, 0]} rotation-y={Math.PI / 2} scale={4} />
          <Lightformer intensity={2} color="#ffffff" position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
          <Lightformer intensity={1.5} color={BLUE} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        </Environment>
        <Rig align={align}>
          <S />
        </Rig>
      </Canvas>
    </div>
  )
}
