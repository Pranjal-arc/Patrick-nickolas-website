'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

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

export default function About() {
  const visualRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !counted.current) {
          counted.current = true;
          const n1 = el.querySelector<HTMLElement>('[data-c="500"]');
          const n2 = el.querySelector<HTMLElement>('[data-c="12"]');
          if (n1) animateCount(n1, 500, '+');
          if (n2) animateCount(n2, 12, '+');
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const checks = [
    'Fully insured, certified and compliant with UK building regulations and safety standards.',
    'Transparent, no-hidden-fees quotes — you always know exactly what you\'re paying for.',
    'Tidy, professional teams who respect your property every single day on site.',
    'A single trusted contact for all construction and home improvement needs.',
  ];

  return (
    <section id="about" style={{ padding: '120px 0', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">

          {/* Visual */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85&auto=format&fit=crop&crop=center"
              alt="Patrick Nickolas construction team at work"
              width={900} height={520} loading="lazy"
              style={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: 16, display: 'block', boxShadow: '0 20px 60px rgba(4,13,26,.18)' }}
            />
            {/* Float card 1 */}
            <div style={{
              position: 'absolute', right: -28, bottom: 36,
              background: 'var(--navy)', borderRadius: 14,
              padding: '20px 26px 22px',
              borderLeft: '4px solid var(--orange)',
              boxShadow: '0 12px 44px rgba(4,13,26,.3)',
              minWidth: 180,
            }}>
              <div data-c="500" style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: 800, color: 'var(--amber)', lineHeight: 1, letterSpacing: '-.04em' }}>0+</div>
              <div style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginTop: 5, fontFamily: 'var(--font-body)' }}>
                Projects<br />Completed
              </div>
            </div>
            {/* Float card 2 */}
            <div style={{
              position: 'absolute', left: -24, top: 40,
              background: 'var(--orange)', borderRadius: 14,
              padding: '16px 22px',
              boxShadow: '0 10px 36px var(--orange-glow)',
              minWidth: 150, zIndex: 2,
              animation: 'float 4s ease-in-out infinite',
            }}>
              <div data-c="12" style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1, letterSpacing: '-.04em' }}>0+</div>
              <div style={{ fontSize: '.66rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', marginTop: 4, fontFamily: 'var(--font-body)' }}>
                Years in<br />Business
              </div>
            </div>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">About Us</div>
            <h2 className="display-title">Your Trusted Local <span className="accent">Tradesmen</span></h2>
            <p className="body-lg" style={{ marginTop: 16, marginBottom: 30 }}>
              Patrick Nickolas is a family-run construction and home services company proudly rooted in Barking and Dagenham. For over 12 years we&apos;ve served the local community with skilled, honest and reliable workmanship — from one-off repairs to full-scale builds.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 36 }}>
              {checks.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '.97rem', color: 'var(--text)', lineHeight: 1.6 }}
                >
                  <div className="check-icon"><FaCheck /></div>
                  <span>{c}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <div style={{
                width: 52, height: 52,
                background: 'linear-gradient(135deg, var(--navy), var(--navy-lt))',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800,
                color: 'var(--amber)', flexShrink: 0,
                boxShadow: '0 4px 16px rgba(4,13,26,.2)',
              }}>PN</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--navy)', fontSize: '1rem', letterSpacing: '-.01em' }}>
                  Patrick Nickolas
                </div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 2, fontFamily: 'var(--font-body)' }}>
                  Founder &amp; Lead Tradesman
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
