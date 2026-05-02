'use client';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accentWord?: string;
  subtitle: string;
  bgImage: string;
}

export default function PageHero({ eyebrow, title, accentWord, subtitle, bgImage }: PageHeroProps) {
  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className="page-hero">
      <div className="page-hero-bg" style={{ backgroundImage: `url('${bgImage}')` }} />
      {/* Orange accent line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange), var(--amber), var(--orange))', backgroundSize: '200% 100%', animation: 'gradient-shift 4s ease infinite', zIndex: 3 }} />

      <div className="page-hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="hero-location-pill"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 20 }}
        >
          <span className="dot" /> {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-.04em',
            color: 'var(--white)',
            marginBottom: 20,
            maxWidth: 700,
          }}
        >
          {accentWord ? (
            <>{parts[0]}<span style={{ color: 'var(--amber)' }}>{accentWord}</span>{parts[1]}</>
          ) : title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 520 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
