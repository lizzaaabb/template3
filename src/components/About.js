'use client'
import { useEffect, useRef, useState } from 'react'
import '../styles/About.css'

const values = [
  {
    id: '01',
    icon: '◈',
    title: 'ხარისხი',                                                             /* შეცვალე */
    desc:  'ყოველ პროექტს ვუდგებით მაქსიმალური პასუხისმგებლობით და სიზუსტით.', /* შეცვალე */
  },
  {
    id: '02',
    icon: '◎',
    title: 'სისწრაფე',                                                            /* შეცვალე */
    desc:  'ვასრულებთ პროექტებს ვადებში - ყოველგვარი დაგვიანების გარეშე.',      /* შეცვალე */
  },
  {
    id: '03',
    icon: '◇',
    title: 'გამჭვირვალობა',                                                       /* შეცვალე */
    desc:  'კლიენტი ყოველ ეტაპზე ინფორმირებულია პროცესის შესახებ.',            /* შეცვალე */
  },
]

const stats = [
  { end: 200, suffix: '+', label: 'კმაყოფილი კლიენტი' }, /* შეცვალე */
  { end: 5,   suffix: '+', label: 'წლიანი გამოცდილება' }, /* შეცვალე */
  { end: 98,  suffix: '%', label: 'დროული მიწოდება'    }, /* შეცვალე */
]

function useCounter(end, duration = 1800, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])
  return count
}

function StatItem({ stat, started }) {
  const count = useCounter(stat.end, 1800, started)
  return (
    <div className="a2-stat">
      <p className="a2-stat-val">{count}{stat.suffix}</p>
      <p className="a2-stat-lbl">{stat.label}</p>
    </div>
  )
}

function ValueCard({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('a2-card--visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="a2-card" style={{ transitionDelay: `${index * 130}ms` }}>
      <div className="a2-card-shine" />
      <div className="a2-card-top">
        <span className="a2-card-index">{item.id}</span>
        <span className="a2-card-icon">{item.icon}</span>
      </div>
      <h3 className="a2-card-title">{item.title}</h3>
      <p className="a2-card-desc">{item.desc}</p>
    </div>
  )
}

export default function About() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const statsRef = useRef(null)
  const [counterStarted, setCounterStarted] = useState(false)

  useEffect(() => {
    const l = leftRef.current
    const r = rightRef.current
    const observers = []
    ;[l, r].forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add(i === 0 ? 'a2-left--in' : 'a2-right--in'), i * 150)
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    let timeout
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        timeout = setTimeout(() => { setCounterStarted(true); obs.disconnect() }, 600)
      } else clearTimeout(timeout)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(timeout) }
  }, [])

  return (
    <section className="a2-outer" id="about" aria-label="ჩვენს შესახებ">

      <div className="a2-bg-glow" aria-hidden="true" />

      {/* ── LEFT ── */}
      <div className="a2-left" ref={leftRef}>

        <p className="a2-eyebrow">
          <span className="a2-eyebrow-dot" />
          ჩვენს შესახებ{/* შეცვალე */}
        </p>

        <h2 className="a2-title">
          ვინ ვართ და<br />
          <span className="a2-title-grad">რას ვაკეთებთ</span>{/* შეცვალე */}
        </h2>

        <p className="a2-desc">
          {/* შეცვალე */}
          ჩვენ ვართ პროფესიონალური გუნდი, რომელიც გთავაზობთ
          მაღალი ხარისხის სერვისებს. წლების გამოცდილებით
          ჩამოყალიბებული პრინციპები გვეხმარება კლიენტების
          მოლოდინების გადაჭარბებაში.
        </p>

        {/* stats */}
        <div className="a2-stats" ref={statsRef}>
          {stats.map(s => (
            <StatItem key={s.label} stat={s} started={counterStarted} />
          ))}
        </div>

      </div>

      {/* ── RIGHT — cards ── */}
      <div className="a2-right" ref={rightRef}>
        {values.map((item, i) => (
          <ValueCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </section>
  )
}