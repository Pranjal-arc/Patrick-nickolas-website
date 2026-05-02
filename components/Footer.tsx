'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp, FaPhone, FaLocationDot, FaClock } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,.55)' }}>
      <div style={{ padding: '76px 28px 56px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2.2fr 1fr 1fr 1.3fr',
          gap: 48,
        }}
        className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 2px var(--orange), 0 0 16px rgba(249,104,22,.3)',
                flexShrink: 0,
              }}>
                <Image src="/logo.png" alt="Patrick Nickolas" width={42} height={42}
                  style={{ objectFit: 'contain', borderRadius: 10 }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-.01em' }}>
                  Patrick Nickolas
                </div>
                <div style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber)', opacity: .8, fontFamily: 'var(--font-body)' }}>
                  Construction &amp; Services
                </div>
              </div>
            </div>
            <p style={{ fontSize: '.88rem', lineHeight: 1.75, maxWidth: 270, marginBottom: 22 }}>
              Your trusted local construction and home services specialists in Barking and Dagenham, East London.
            </p>
            <div style={{ display: 'flex', gap: 9 }}>
              {[
                { Icon: FaFacebookF, label: 'Facebook' },
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaXTwitter, label: 'X/Twitter' },
                { Icon: FaWhatsapp, label: 'WhatsApp' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" className="social-a" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 20 }}>
              Services
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {['General Construction', 'Plumbing', 'Painting & Decorating', 'Electrical', 'Get a Free Quote'].map(s => (
                <li key={s}>
                  <Link href="/services" style={{ fontSize: '.87rem', color: 'rgba(255,255,255,.5)', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 20 }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Projects', href: '/gallery' },
                { label: 'Client Reviews', href: '/testimonials' },
                { label: 'Why Choose Us', href: '/services' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: '.87rem', color: 'rgba(255,255,255,.5)', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 20 }}>
              Contact
            </h4>
            {[
              { Icon: FaPhone, content: <a href="tel:+447951542411" style={{ color: 'rgba(255,255,255,.55)' }}>+44 7951 542411</a> },
              { Icon: FaLocationDot, content: <span>Barking &amp; Dagenham, London</span> },
              { Icon: FaClock, content: <span>Mon–Fri: 7am–7pm<br />Sat: 8am–5pm</span> },
            ].map(({ Icon, content }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 12, fontSize: '.87rem' }}>
                <Icon style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0, fontSize: '.85rem' }} />
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 28px', background: 'rgba(0,0,0,.25)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: '.82rem' }}>
          <span>© 2025 Patrick Nickolas Construction &amp; Services. All Rights Reserved.</span>
          <span>Trusted Since 2012 · Serving Barking &amp; Dagenham · <Link href="/contact" style={{ color: 'var(--amber)' }}>Get a Free Quote</Link></span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>
    </footer>
  );
}
