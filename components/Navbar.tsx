'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Projects' },
  { href: '/testimonials', label: 'Reviews' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobOpen(false), [pathname]);

  return (
    <>
      <nav
        id="nav"
        ref={navRef}
        className={scrolled ? 'scrolled' : ''}
      >
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          padding: '0 28px', height: 74,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              style={{
                position: 'relative',
                width: 58, height: 58,
                borderRadius: 14,
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 3px var(--orange), 0 0 20px rgba(249,104,22,.4), 0 0 40px rgba(249,104,22,.15)',
                flexShrink: 0,
              }}
              className="logo-glow-ring"
            >
              <Image
                src="/logo.png"
                alt="Patrick Nickolas Logo"
                width={50} height={50}
                priority
                style={{
                  objectFit: 'contain',
                  borderRadius: 10,
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ lineHeight: 1.15 }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem', fontWeight: 800,
                color: 'var(--white)', letterSpacing: '-.02em',
                textShadow: '0 2px 12px rgba(249,104,22,.3)',
              }}>Patrick Nickolas</div>
              <div style={{
                fontSize: '.68rem', fontWeight: 700,
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: 'var(--amber)', opacity: 1,
                fontFamily: 'var(--font-body)',
              }}>Construction &amp; Services</div>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none' }}
            className="hidden-mob">
            {links.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '.8rem', fontWeight: 600,
                    letterSpacing: '.06em', textTransform: 'uppercase',
                    color: pathname === l.href ? 'var(--white)' : 'rgba(255,255,255,.7)',
                    padding: '8px 14px', borderRadius: 6,
                    background: pathname === l.href ? 'rgba(255,255,255,.08)' : 'transparent',
                    transition: 'all .2s',
                    display: 'block',
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="nav-cta-btn">Get a Quote</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMobOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column', gap: 5,
              cursor: 'pointer', padding: 5, background: 'none', border: 'none',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={mobOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 7 : i === 2 ? -7 : 0,
                  opacity: i === 1 ? 0 : 1,
                  scaleX: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'block', width: 22, height: 2,
                  background: 'var(--white)', borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobOpen && (
          <motion.nav
            key="mob"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mob-menu"
          >
            <ul>
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li><Link href="/contact">Get a Free Quote</Link></li>
              <li>
                <a href="tel:+447951542411">
                  📞 +44 7951 542411
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .hidden-mob { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
