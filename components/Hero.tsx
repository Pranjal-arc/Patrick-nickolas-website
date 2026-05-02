'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFileAlt, FaPhoneAlt } from 'react-icons/fa';

const HERO_BG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=70';

const stats = [
  { count: 12, suffix: '+', label: 'Years Experience' },
  { count: 500, suffix: '+', label: 'Projects Completed' },
  { count: 4, suffix: '', label: 'Expert Services' },
  { count: 100, suffix: '%', label: 'Satisfaction Rate' },
];

function animateCount(el: HTMLElement, target: number, suffix: string) {
  const dur = 1800;
  const start = performance.now();
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  function tick(now: number) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(easeOut(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const px = parallaxRef.current;
    if (!px) return;
    const onScroll = () => {
      if (scrollY < innerHeight * 1.3)
        px.style.transform = `translateY(${scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Number counter on viewport entry
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !counted.current) {
          counted.current = true;
          stats.forEach(({ count, suffix }, i) => {
            const span = el.querySelector<HTMLElement>(`[data-idx="${i}"]`);
            if (span) animateCount(span, count, suffix);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="hero-section" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', backgroundColor: 'var(--ink)',
    }}>
      {/* Background Image (replaces heavy video) */}
      <div
        ref={parallaxRef}
        style={{
          position: 'absolute', inset: '-10%',
          zIndex: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.55) contrast(1.1)',
          willChange: 'transform',
        }}
      />

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(110deg, rgba(2,6,15,.95) 0%, rgba(2,6,15,.75) 40%, rgba(2,6,15,.4) 70%, rgba(2,6,15,.2) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: .04, pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1180, margin: '0 auto',
        padding: '130px 28px 90px', width: '100%',
      }}>
        {/* Location Pill + Est Badge */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-location-pill">
            <span className="dot" />
            Barking &amp; Dagenham, London
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(251,191,36,.12)',
            border: '1px solid rgba(251,191,36,.25)',
            color: 'var(--amber)',
            fontFamily: 'var(--font-body)',
            fontSize: '.65rem', fontWeight: 700,
            letterSpacing: '.16em', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: 50,
          }}>
            ✦ Est. 2012
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
            fontWeight: 800, lineHeight: 1.02,
            letterSpacing: '-.04em', color: 'var(--white)',
            maxWidth: 740, marginBottom: 22,
            fontFamily: 'var(--font-display)',
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          Reliable Construction<br />
          <span style={{ color: 'var(--amber)' }}>&amp; Home Services</span><br />
          <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,.5)', color: 'transparent' }}>
            Done Right.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            fontSize: '1.1rem', lineHeight: 1.75,
            color: 'rgba(255,255,255,.65)', fontWeight: 400,
            maxWidth: 520, marginBottom: 38,
            letterSpacing: '-0.006em',
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        >
          Expert plumbing, painting, electrical &amp; general construction across East London — delivered by trusted local tradespeople.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/contact" className="btn btn-fire btn-pulse hero-shimmer-btn">
            <FaFileAlt /> Get a Free Quote
          </Link>
          <a href="tel:+447951542411" className="btn btn-ghost">
            <FaPhoneAlt /> Call +44 7951 542411
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 64, paddingTop: 48,
            borderTop: '1px solid rgba(255,255,255,.1)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }}
          className="hero-stats-grid"
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div className="hero-stat-val" data-idx={i}>0{s.suffix}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
