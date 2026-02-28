'use client'
import { useEffect, useRef } from 'react'
import '../styles/Services.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   შეცვალე სერვისები აქ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const services = [
  {
    id: '01',
    icon: '◈',
    title: 'კონსულტაცია',                                                                   /* შეცვალე */
    desc:  'პროფესიონალური კონსულტაცია თქვენი ბიზნესის საჭიროებებზე - სწრაფად და ეფექტურად.', /* შეცვალე */
    tags:  ['ანალიზი', 'სტრატეგია', 'გეგმა'],                                              /* შეცვალე */
  },
  {
    id: '02',
    icon: '◎',
    title: 'დიზაინი',                                                                       /* შეცვალე */
    desc:  'თანამედროვე და მიმზიდველი ვიზუალური გადაწყვეტილებები თქვენი ბრენდისთვის.',      /* შეცვალე */
    tags:  ['UI/UX', 'ბრენდინგი', 'გრაფიკა'],                                             /* შეცვალე */
  },
  {
    id: '03',
    icon: '◇',
    title: 'განვითარება',                                                                   /* შეცვალე */
    desc:  'სრულფასოვანი ტექნიკური განვითარება - სწრაფი, სტაბილური და მასშტაბური.',        /* შეცვალე */
    tags:  ['Web', 'Mobile', 'API'],                                                        /* შეცვალე */
  },
  {
    id: '04',
    icon: '○',
    title: 'მხარდაჭერა',                                                                   /* შეცვალე */
    desc:  '24/7 ტექნიკური მხარდაჭერა და მოვლა - ყოველთვის მზად ვართ დასახმარებლად.',    /* შეცვალე */
    tags:  ['24/7', 'მოვლა', 'განახლება'],                                                 /* შეცვალე */
  },
]

function ServiceCard({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('s2-card--visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="s2-card" style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="s2-card-shine" />

      {/* icon box */}
      <div className="s2-card-iconbox">
        <span className="s2-card-icon">{item.icon}</span>
      </div>

      {/* body */}
      <div className="s2-card-body">
        <div className="s2-card-header">
          <span className="s2-card-index">{item.id}</span>
          <h3 className="s2-card-title">{item.title}</h3>
        </div>
        <p className="s2-card-desc">{item.desc}</p>
        <div className="s2-card-tags">
          {item.tags.map(tag => (
            <span key={tag} className="s2-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* arrow */}
      <div className="s2-card-arrow">→</div>
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('s2-head--visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="s2-outer" id="services" aria-label="სერვისები">

      <div className="s2-bg-glow" aria-hidden="true" />

      {/* heading */}
      <div className="s2-head" ref={headRef}>
        <p className="s2-eyebrow">
          <span className="s2-eyebrow-dot" />
          სერვისები{/* შეცვალე */}
        </p>
        <h2 className="s2-title">
          რას გთავაზობთ{/* შეცვალე */}
          <br />
          <span className="s2-title-grad">თქვენთვის</span>{/* შეცვალე */}
        </h2>
      </div>

      {/* list */}
      <div className="s2-list">
        {services.map((item, i) => (
          <ServiceCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </section>
  )
}