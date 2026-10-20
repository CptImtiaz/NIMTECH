// Apps: a phone and a tablet with live-looking app screens, and UI cards
// floating around them at different depths (parallax with the pointer).
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { C, type Ctx, type SceneObj, canvasTex, glossy, rounded } from '../kit'

const F = '"Geist Variable", "Inter Variable", system-ui, sans-serif'

function phoneScreen() {
  return canvasTex(512, 1080, (x) => {
    x.fillStyle = '#f6f8ff'
    x.fillRect(0, 0, 512, 1080)
    x.fillStyle = '#0a0f29'
    x.font = `600 26px ${F}`
    x.fillText('9:41', 44, 62)
    x.font = `700 46px ${F}`
    x.fillText('Good morning', 40, 170)
    x.fillStyle = '#5a6488'
    x.font = `500 26px ${F}`
    x.fillText('3 deliveries arriving today', 40, 214)
    const g = x.createLinearGradient(40, 250, 472, 470)
    g.addColorStop(0, '#2a4bff')
    g.addColorStop(1, '#7b61ff')
    rounded(x, 40, 250, 432, 220, 34)
    x.fillStyle = g
    x.fill()
    x.fillStyle = 'rgba(255,255,255,.8)'
    x.font = `500 24px ${F}`
    x.fillText('Orders this week', 72, 304)
    x.fillStyle = '#fff'
    x.font = `700 64px ${F}`
    x.fillText('1,284', 72, 380)
    x.strokeStyle = 'rgba(255,255,255,.9)'
    x.lineWidth = 5
    x.beginPath()
    ;[0, 18, 8, 30, 22, 44, 36].forEach((v, i) => (i ? x.lineTo(270 + i * 30, 440 - v * 1.6) : x.moveTo(270, 440)))
    x.stroke()
    const rows = [
      ['#12b5ad', 'Shipment #4821', 'Out for delivery'],
      ['#2a4bff', 'Invoice paid', 'RM 12,400'],
      ['#7b61ff', 'New review', '★★★★★'],
    ]
    rows.forEach(([c, a, b], i) => {
      const y = 510 + i * 128
      rounded(x, 40, y, 432, 108, 26)
      x.fillStyle = '#ffffff'
      x.fill()
      x.fillStyle = c
      rounded(x, 62, y + 24, 60, 60, 18)
      x.fill()
      x.fillStyle = '#0a0f29'
      x.font = `600 28px ${F}`
      x.fillText(a, 146, y + 50)
      x.fillStyle = '#5a6488'
      x.font = `500 23px ${F}`
      x.fillText(b, 146, y + 84)
    })
    rounded(x, 40, 920, 432, 96, 48)
    x.fillStyle = '#0a0f29'
    x.fill()
    x.fillStyle = '#fff'
    x.font = `600 30px ${F}`
    x.textAlign = 'center'
    x.fillText('Track order', 256, 978)
  })
}

function tabletScreen() {
  return canvasTex(1024, 720, (x) => {
    x.fillStyle = '#0b1230'
    x.fillRect(0, 0, 1024, 720)
    x.fillStyle = '#141d45'
    x.fillRect(0, 0, 200, 720)
    for (let i = 0; i < 6; i++) {
      rounded(x, 28, 90 + i * 64, 144, 36, 10)
      x.fillStyle = i === 1 ? '#2a4bff' : 'rgba(255,255,255,.08)'
      x.fill()
    }
    x.fillStyle = '#fff'
    x.font = `700 40px ${F}`
    x.fillText('Operations', 240, 92)
    ;['#2a4bff', '#12b5ad', '#7b61ff'].forEach((c, i) => {
      rounded(x, 240 + i * 255, 130, 235, 140, 18)
      x.fillStyle = 'rgba(255,255,255,.06)'
      x.fill()
      x.fillStyle = c
      x.fillRect(262 + i * 255, 236, 60 + i * 40, 10)
      x.fillStyle = '#fff'
      x.font = `700 44px ${F}`
      x.fillText(['98.2%', '4.1k', '12m'][i], 262 + i * 255, 210)
    })
    rounded(x, 240, 300, 745, 380, 18)
    x.fillStyle = 'rgba(255,255,255,.05)'
    x.fill()
    for (let i = 0; i < 14; i++) {
      const h = 60 + Math.abs(Math.sin(i * 1.7)) * 220
      rounded(x, 270 + i * 50, 650 - h, 30, h, 8)
      x.fillStyle = i % 4 === 3 ? '#12b5ad' : '#2a4bff'
      x.fill()
    }
  })
}

function card(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void) {
  const S = 2
  const tex = canvasTex(w * S, h * S, (x) => {
    x.scale(S, S)
    x.shadowColor = 'rgba(10,15,41,.18)'
    x.shadowBlur = 18
    x.shadowOffsetY = 6
    rounded(x, 14, 10, w - 28, h - 30, 18)
    x.fillStyle = '#ffffff'
    x.fill()
    x.shadowColor = 'transparent'
    draw(x)
  })
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w / 300, h / 300), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }))
  m.renderOrder = 5
  return m
}

export function devices(ctx: Ctx): SceneObj {
  const root = new THREE.Group()

  const phone = new THREE.Group()
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.66, 1.36, 0.07, 6, 0.1), glossy(C.navy, { roughness: 0.25, metalness: 0.6 }))
  phone.add(body)
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.27), new THREE.MeshBasicMaterial({ map: phoneScreen() }))
  scr.position.z = 0.0362
  phone.add(scr)
  const island = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.045, 0.01, 2, 0.02), new THREE.MeshBasicMaterial({ color: 0x000000 }))
  island.position.set(0, 0.57, 0.04)
  phone.add(island)
  phone.position.set(0.18, -0.02, 0.15)
  phone.rotation.set(0.05, -0.32, 0.04)
  root.add(phone)

  const tablet = new THREE.Group()
  const tb = new THREE.Mesh(new RoundedBoxGeometry(1.4, 1.0, 0.05, 6, 0.07), glossy(0xdfe4f5, { roughness: 0.3, metalness: 0.5 }))
  tablet.add(tb)
  const ts = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.92), new THREE.MeshBasicMaterial({ map: tabletScreen() }))
  ts.position.z = 0.026
  tablet.add(ts)
  tablet.position.set(-0.5, 0.18, -0.45)
  tablet.rotation.set(0.04, 0.38, -0.03)
  root.add(tablet)

  const cards = [
    {
      m: card(300, 120, (x) => {
        x.fillStyle = '#12b5ad'
        rounded(x, 32, 30, 44, 44, 12)
        x.fill()
        x.fillStyle = '#fff'
        x.font = `700 24px ${F}`
        x.fillText('✓', 44, 61)
        x.fillStyle = '#0a0f29'
        x.font = `600 17px ${F}`
        x.fillText('Order shipped', 90, 47)
        x.fillStyle = '#5a6488'
        x.font = `500 14px ${F}`
        x.fillText('Arrives tomorrow, 10am', 90, 68)
      }),
      p: new THREE.Vector3(0.95, 0.45, 0.45),
      d: 0.9,
    },
    {
      m: card(240, 170, (x) => {
        x.fillStyle = '#5a6488'
        x.font = `500 14px ${F}`
        x.fillText('Active users', 34, 46)
        x.fillStyle = '#0a0f29'
        x.font = `700 30px ${F}`
        x.fillText('24,310', 34, 84)
        ;[30, 46, 38, 62, 54, 78].forEach((h, i) => {
          x.fillStyle = i === 5 ? '#2a4bff' : '#c9d3ff'
          rounded(x, 34 + i * 28, 140 - h * 0.6, 18, h * 0.6, 5)
          x.fill()
        })
      }),
      p: new THREE.Vector3(-1.05, -0.45, 0.35),
      d: 0.7,
    },
    {
      m: card(220, 110, (x) => {
        x.fillStyle = '#7b61ff'
        x.beginPath()
        x.arc(56, 52, 22, 0, Math.PI * 2)
        x.fill()
        x.fillStyle = '#0a0f29'
        x.font = `600 17px ${F}`
        x.fillText('4.9 rating', 92, 46)
        x.fillStyle = '#f5a524'
        x.font = `500 15px ${F}`
        x.fillText('★★★★★', 92, 68)
      }),
      p: new THREE.Vector3(0.88, -0.6, 0.6),
      d: 1.1,
    },
  ]
  cards.forEach((c) => {
    c.m.position.copy(c.p)
    root.add(c.m)
  })

  return {
    root,
    tilt: [0.06, 0],
    follow: 0.5,
    update(t, _dt, p) {
      phone.position.y = -0.02 + Math.sin(t * 0.9) * 0.03
      tablet.position.y = 0.18 + Math.sin(t * 0.7 + 1) * 0.025
      cards.forEach((c, i) => {
        c.m.position.set(c.p.x + (p.inside ? p.x * 0.06 * c.d : 0), c.p.y + Math.sin(t * 1.1 + i * 2) * 0.04 + (p.inside ? p.y * 0.05 * c.d : 0), c.p.z)
        c.m.rotation.set(-root.rotation.x * 0.5, -root.rotation.y * 0.6, 0)
      })
    },
  }
}
