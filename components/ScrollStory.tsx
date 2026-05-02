'use client';
import { useEffect, useRef } from 'react';

const steps = [
  { title: 'Outdated & Damaged Spaces', desc: 'Cracked walls, outdated fittings, and poor workmanship holding your home back.' },
  { title: 'Professional Work Begins', desc: 'Our expert team arrives and starts transforming your space with precision.' },
  { title: 'Transformation in Progress', desc: 'Every detail refined — plumbing, electrics, finishes — perfectly aligned.' },
  { title: 'Flawless Final Result', desc: 'A clean, modern, high-quality space delivered exactly as promised.' },
];

const images = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=70',
  'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&q=70',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70',
  'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800&q=70',
];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      stepRefs.current.forEach((s, i) => {
        if (!s) return;
        s.classList.toggle('active', i === index);
      });

      bg.style.backgroundImage = `url(${images[index]})`;
      bg.style.transform = `scale(${1 + progress * 0.2})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="story" ref={sectionRef}>
      <div className="story-sticky">
        <div className="story-bg" ref={bgRef}
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className="story-content">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`story-step${i === 0 ? ' active' : ''}`}
              ref={el => { stepRefs.current[i] = el; }}
            >
              <div style={{
                fontSize: '.75rem', fontWeight: 700,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'var(--orange)', marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ display: 'block', width: 28, height: 2, background: 'var(--orange)', borderRadius: 2 }} />
                Step {i + 1} of {steps.length}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', marginBottom: 12 }}>
                {step.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
                {steps.map((_, j) => (
                  <div key={j} style={{
                    width: j === i ? 28 : 8, height: 8,
                    borderRadius: 8,
                    background: j === i ? 'var(--orange)' : 'rgba(255,255,255,.3)',
                    transition: 'all 0.4s ease',
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
