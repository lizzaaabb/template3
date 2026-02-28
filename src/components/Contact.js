'use client'
import { useEffect, useRef } from 'react'
import '../styles/Contact.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   შეცვალე კონტაქტის ინფო აქ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PHONE    = '+995 500 00 00 00'
const PHONE_HR = 'tel:+995500000000'
const EMAIL    = 'info@yourcompany.ge'         /* შეცვალე */
const ADDRESS  = 'თბილისი, საქართველო'        /* შეცვალე */
const INSTAGRAM = 'https://instagram.com/'    /* შეცვალე */
const FACEBOOK  = 'https://facebook.com/'     /* შეცვალე */
const WHATSAPP  = 'https://wa.me/995500000000' /* შეცვალე */

const contactItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
      </svg>
    ),
    label: 'ტელეფონი',
    value: PHONE,
    href: PHONE_HR,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'მეილი',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'მისამართი',
    value: ADDRESS,
    href: null,
  },
]

export default function Contact() {
  const headRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    const els = [headRef.current, bodyRef.current]
    els.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('cnt-visible'), i * 150)
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(el)
      return () => obs.disconnect()
    })
  }, [])

  return (
    <section className="cnt-outer" id="contact" aria-label="კონტაქტი">

      <div className="cnt-glow" aria-hidden="true" />

      {/* ── CTA strip ── */}
      <div className="cnt-cta" ref={headRef}>
        <p className="cnt-eyebrow">
          <span className="cnt-eyebrow-line" />
          დაგვიკავშირდით{/* შეცვალე */}
          <span className="cnt-eyebrow-line cnt-eyebrow-line--r" />
        </p>

        <h2 className="cnt-title">
          მზად ხართ{/* შეცვალე */}
          <br />
          <span className="cnt-title-grad">დასაწყებად?</span>{/* შეცვალე */}
        </h2>

        <p className="cnt-subtitle">
          {/* შეცვალე */}
          კონსულტაცია უფასოა — დაგვიკავშირდით და ერთად
          ვიპოვოთ თქვენთვის საუკეთესო გამოსავალი.
        </p>

        <div className="cnt-cta-btns">
          <a href={PHONE_HR} className="cnt-btn-primary">
            დაგვირეკეთ
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cnt-btn-secondary">
            WhatsApp
          </a>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="cnt-divider" aria-hidden="true" />

      {/* ── Contact info + socials ── */}
      <div className="cnt-body" ref={bodyRef}>

        {/* Contact items */}
        <div className="cnt-items">
          {contactItems.map(item => (
            <div key={item.label} className="cnt-item">
              <span className="cnt-item-icon">{item.icon}</span>
              <div>
                <p className="cnt-item-label">{item.label}</p>
                {item.href
                  ? <a href={item.href} className="cnt-item-value">{item.value}</a>
                  : <p className="cnt-item-value cnt-item-value--plain">{item.value}</p>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="cnt-socials">
          <p className="cnt-socials-label">სოციალური მედია</p>
          <div className="cnt-socials-row">

            {/* Instagram */}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cnt-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Instagram
            </a>

            {/* Facebook */}
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="cnt-social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </a>

          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="cnt-footer">
        <p className="cnt-footer-text">
          © {new Date().getFullYear()} {/* შეცვალე კომპანიის სახელი */}
          <span className="cnt-footer-brand">კომპანიის სახელი</span>. ყველა უფლება დაცულია.
        </p>
      </div>

    </section>
  )
}