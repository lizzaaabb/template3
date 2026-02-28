'use client'
import React, { useState } from 'react'
import '../styles/Header.css'

const Logo = '/logo1.png' /* შეცვალე */

const navLinks = [
  { label: 'მთავარი',       href: '#home' },
  { label: 'ჩვენს შესახებ', href: '#about' },
  { label: 'სერვისები',     href: '#services' },
  { label: 'კონტაქტი',     href: '#contact' },
]

const PHONE     = 'tel:+995500000000'   /* შეცვალე */
const PHONE_LBL = '+995 500 00 00 00'   /* შეცვალე */

function handleScroll(e, href) {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (e, href) => {
    handleScroll(e, href)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className={`hdr-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Header bar ── */}
      <header className="hdr-outer" role="banner">
        <nav className="hdr-inner" aria-label="მთავარი ნავიგაცია">

          <a
            href="#home"
            className="hdr-logo-wrap"
            onClick={e => handleScroll(e, '#home')}
            aria-label="მთავარ გვერდზე გადასვლა"
          >
            <img src={Logo} alt="ლოგო" className="hdr-logo" width="72" height="72" loading="eager" />
          </a>

          <ul className="hdr-nav" role="list">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a href={link.href} className="hdr-nav-link" onClick={e => handleScroll(e, link.href)}>
                  {link.label}
                </a>
                {i < navLinks.length - 1 && <span className="hdr-nav-divider" aria-hidden="true" />}
              </li>
            ))}
          </ul>

          <a href={PHONE} className="hdr-cta" aria-label={`დაგვიკავშირდი - ${PHONE_LBL}`}>
            დაგვიკავშირდი
          </a>

          {/* Hamburger — animates into X when open, circle appears */}
          <button
            className={`hdr-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
            <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
            <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
          </button>

        </nav>
      </header>

      {/* ── Mobile drawer — OUTSIDE <header>, no close button inside ── */}
      <div
        id="mobile-menu"
        className={`hdr-mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
      >
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="hdr-mobile-link"
            onClick={e => handleNav(e, link.href)}
          >
            {link.label}
          </a>
        ))}

        <a
          href={PHONE}
          className="hdr-mobile-cta"
          onClick={() => setMenuOpen(false)}
          aria-label={`დაგვიკავშირდი - ${PHONE_LBL}`}
        >
          დაგვიკავშირდი
        </a>
      </div>
    </>
  )
}