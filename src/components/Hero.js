'use client'
import { useEffect, useRef } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  const canvasRef  = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const cleanupRef = useRef([])

  useEffect(() => {
    const l = leftRef.current
    const r = rightRef.current
    if (l) setTimeout(() => l.classList.add('t2h-left--in'), 80)
    if (r) setTimeout(() => r.classList.add('t2h-right--in'), 320)
  }, [])

  useEffect(() => {
    let animId
    const init = async () => {
      const THREE = await import('three')
      const canvas = canvasRef.current
      if (!canvas) return

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100)
      camera.position.z = 6.5

      const root = new THREE.Group()
      scene.add(root)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         OUTER WIREFRAME ICOSAHEDRON
         Hand-built edges so we can
         animate each one individually
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      const icoGeo = new THREE.IcosahedronGeometry(1.9, 1)
      // Wireframe as individual Line segments for opacity control
      const wireGeo = new THREE.WireframeGeometry(icoGeo)
      const wireMat = new THREE.LineBasicMaterial({
        color: 0xB8956A,
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const wire = new THREE.LineSegments(wireGeo, wireMat)
      root.add(wire)

      /* second, slightly larger icosahedron — rotated offset, even more ghostly */
      const icoGeo2  = new THREE.IcosahedronGeometry(2.45, 1)
      const wireGeo2 = new THREE.WireframeGeometry(icoGeo2)
      const wireMat2 = new THREE.LineBasicMaterial({
        color: 0xD4AF82,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const wire2 = new THREE.LineSegments(wireGeo2, wireMat2)
      wire2.rotation.y = Math.PI / 5   // offset rotation so edges don't overlap
      wire2.rotation.x = Math.PI / 7
      root.add(wire2)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         INNER SMALL SPHERE — glassy
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      const coreGeo = new THREE.SphereGeometry(0.42, 64, 64)
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0xC9A876,
        roughness: 0.02,
        metalness: 0.0,
        transmission: 0.82,
        thickness: 0.8,
        ior: 1.5,
        transparent: true,
        opacity: 0.65,
        envMapIntensity: 0.5,
      })
      const core = new THREE.Mesh(coreGeo, coreMat)
      root.add(core)

      /* soft glow halo around the core */
      const haloGeo = new THREE.SphereGeometry(0.56, 32, 32)
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xD4AF82,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      })
      const halo = new THREE.Mesh(haloGeo, haloMat)
      root.add(halo)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         DUST PARTICLES — 3 layers
         close / mid / far — creates
         beautiful depth parallax
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      const layers = [
        { count: 320, rMin: 0.6,  rMax: 1.7,  size: 0.016, speed: 0.14, opacity: 0.55, color: 0xC9A876 },
        { count: 480, rMin: 1.8,  rMax: 3.0,  size: 0.012, speed: 0.08, opacity: 0.38, color: 0xD4AF82 },
        { count: 200, rMin: 3.1,  rMax: 4.2,  size: 0.008, speed: 0.04, opacity: 0.18, color: 0xE8D2AA },
      ]

      const particleSystems = layers.map(({ count, rMin, rMax, size, speed, opacity, color }) => {
        const pos   = new Float32Array(count * 3)
        const phase = new Float32Array(count)
        const r     = new Float32Array(count)
        const theta = new Float32Array(count)
        const spd   = new Float32Array(count)
        const phi   = new Float32Array(count)

        for (let i = 0; i < count; i++) {
          phase[i] = Math.random() * Math.PI * 2
          r[i]     = rMin + Math.random() * (rMax - rMin)
          theta[i] = Math.random() * Math.PI * 2
          phi[i]   = Math.acos(2 * Math.random() - 1)   // spherical distribution
          spd[i]   = speed * (0.7 + Math.random() * 0.6)
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

        const mat = new THREE.PointsMaterial({
          color,
          size,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        })

        const pts = new THREE.Points(geo, mat)
        root.add(pts)
        return { pts, geo, mat, pos, phase, r, theta, phi, spd, count }
      })

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         LIGHTS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      scene.add(new THREE.AmbientLight(0xFFF8F0, 1.2))
      const keyLight = new THREE.DirectionalLight(0xFFEAC8, 2.0)
      keyLight.position.set(4, 5, 4)
      scene.add(keyLight)
      const rimLight = new THREE.DirectionalLight(0xC9A876, 0.6)
      rimLight.position.set(-3, -1, -2)
      scene.add(rimLight)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         MOUSE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      let tmx = 0, tmy = 0, mx = 0, my = 0
      const onMove = e => {
        tmx = (e.clientX / window.innerWidth  - 0.5) * 0.8
        tmy = (e.clientY / window.innerHeight - 0.5) * -0.5
      }
      window.addEventListener('mousemove', onMove)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         RESIZE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      const onResize = () => {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         ANIMATE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      const clock = new THREE.Clock()

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        mx += (tmx - mx) * 0.035
        my += (tmy - my) * 0.035

        /* icosahedrons — counter-rotate slowly, different axes */
        wire.rotation.y  =  t * 0.055
        wire.rotation.x  =  t * 0.032
        wire2.rotation.y = -t * 0.038 + Math.PI / 5
        wire2.rotation.x =  t * 0.021 + Math.PI / 7
        wire2.rotation.z =  t * 0.016

        /* wireframe breathe — opacity pulse */
        wireMat.opacity  = 0.22 + 0.10 * Math.sin(t * 0.6)
        wireMat2.opacity = 0.07 + 0.05 * Math.sin(t * 0.4 + 1.2)

        /* core gentle pulse */
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.9)
        core.scale.setScalar(1.0 + pulse * 0.04)
        coreMat.opacity = 0.58 + pulse * 0.12
        haloMat.opacity = 0.04 + pulse * 0.05

        /* particles — each layer drifts at its own speed */
        particleSystems.forEach(({ pos, phase, r, theta, phi, spd, count, geo, mat }, li) => {
          for (let i = 0; i < count; i++) {
            const a  = t * spd[i] + phase[i]
            const ri = r[i]
            const ph = phi[i]
            const th = theta[i] + t * spd[i] * 0.3
            /* spherical coords with slow drift */
            pos[i*3]   = ri * Math.sin(ph) * Math.cos(a)
            pos[i*3+1] = ri * Math.cos(ph) + Math.sin(a * 0.5 + phase[i]) * 0.15
            pos[i*3+2] = ri * Math.sin(ph) * Math.sin(a)
          }
          geo.attributes.position.needsUpdate = true
          /* each layer pulses at different phase */
          mat.opacity = layers[li].opacity * (0.75 + 0.28 * Math.sin(t * 0.5 + li * 1.3))
        })

        /* gentle whole-scene float */
        root.position.y = Math.sin(t * 0.38) * 0.06

        /* mouse parallax */
        root.rotation.y = mx * 0.4
        root.rotation.x = my * 0.28

        renderer.render(scene, camera)
      }
      animate()

      cleanupRef.current = [
        () => cancelAnimationFrame(animId),
        () => window.removeEventListener('mousemove', onMove),
        () => window.removeEventListener('resize', onResize),
        () => { renderer.dispose(); wireMat.dispose(); wireMat2.dispose(); coreMat.dispose(); haloMat.dispose() },
      ]
    }

    init()
    return () => cleanupRef.current.forEach(fn => fn())
  }, [])

  return (
    <section className="t2h-outer" id="home" aria-label="მთავარი სექცია">
      <div className="t2h-grid-bg" aria-hidden="true" />
      <div className="t2h-grain"   aria-hidden="true" />

      <div className="t2h-left" ref={leftRef}>
        <p className="t2h-eyebrow">
          <span className="t2h-eyebrow-dot" />
          პროფესიონალური სერვისი
        </p>
        <h1 className="t2h-title">
          <span className="t2h-title-line t2h-tl-1">თქვენი</span>
          <span className="t2h-title-line t2h-tl-2">ბიზნესი</span>
          <span className="t2h-title-line t2h-tl-3">
            <em className="t2h-grad-italic">ახალ</em>
            <span className="t2h-outlined"> დონეზე</span>
          </span>
        </h1>
        <p className="t2h-sub">
          პროფესიონალური გადაწყვეტილებები თქვენი ბიზნესისთვის -
          სწრაფად, საიმედოდ, შედეგზე ორიენტირებულად.
        </p>
        <div className="t2h-btns">
          <a href="tel:+995500000000" className="t2h-btn-p">
            <span>დაგვირეკეთ</span>
            <span className="t2h-btn-arrow">→</span>
          </a>
          <a href="https://wa.me/995500000000" target="_blank" rel="noopener noreferrer" className="t2h-btn-s">
            მოგვწერეთ
          </a>
        </div>
        <div className="t2h-stats">
          <div className="t2h-stat">
            <p className="t2h-stat-val">200+</p>
            <p className="t2h-stat-lbl">კლიენტი</p>
          </div>
          <div className="t2h-stat-sep" />
          <div className="t2h-stat">
            <p className="t2h-stat-val">5+</p>
            <p className="t2h-stat-lbl">წელი</p>
          </div>
          <div className="t2h-stat-sep" />
          <div className="t2h-stat">
            <p className="t2h-stat-val">98%</p>
            <p className="t2h-stat-lbl">შედეგი</p>
          </div>
        </div>
      </div>

      <div className="t2h-right" ref={rightRef} aria-hidden="true">
        <canvas className="t2h-canvas" ref={canvasRef} />
        <div className="t2h-fc t2h-fc-tl">
          <span className="t2h-fc-icon">★</span>
          <div>
            <p className="t2h-fc-val">5.0</p>
            <p className="t2h-fc-lbl">შეფასება</p>
          </div>
        </div>
        <div className="t2h-fc t2h-fc-br">
          <span className="t2h-fc-icon">✦</span>
          <div>
            <p className="t2h-fc-val">24/7</p>
            <p className="t2h-fc-lbl">მხარდაჭერა</p>
          </div>
        </div>
      </div>

      <div className="t2h-scroll">
        <div className="t2h-scroll-line" />
        <p className="t2h-scroll-lbl">scroll</p>
      </div>
      <div className="t2h-bottom-fade" />
    </section>
  )
}