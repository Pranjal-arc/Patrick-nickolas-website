'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';

const photos = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&auto=format&fit=crop&crop=center', alt: 'Residential extension construction project', cap: 'Residential Extension — Barking', tag: 'Construction', wide: true },
  { src: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=75&auto=format&fit=crop&crop=center', alt: 'Interior renovation and painting', cap: 'Interior Renovation — Dagenham', tag: 'Painting' },
  { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=75&auto=format&fit=crop&crop=center', alt: 'Electrical panel installation', cap: 'Full Rewire — Barking', tag: 'Electrical' },
  { src: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=75&auto=format&fit=crop&crop=center', alt: 'Bathroom plumbing installation', cap: 'Bathroom Plumbing — Dagenham', tag: 'Plumbing' },
  { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=75&auto=format&fit=crop&crop=center', alt: 'Modern luxury home construction', cap: 'New Build — East London', tag: 'Construction' },
  { src: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=680&q=85&auto=format&fit=crop&crop=center', alt: 'Brickwork and masonry wall', cap: 'Brickwork & Masonry — Barking', tag: 'Masonry' },
];

const tags = ['All', 'Construction', 'Plumbing', 'Painting', 'Electrical', 'Masonry'];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lb, setLb] = useState<{ src: string; cap: string } | null>(null);

  const filtered = active === 'All' ? photos : photos.filter(p => p.tag === active);

  return (
    <section id="gallery" style={{ padding: '120px 0', background: 'var(--off-white)' }}>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Our Work</div>
          <h2 className="display-title">Recent <span className="accent">Projects</span></h2>
          <p className="body-lg">
            A selection of completed projects across construction, plumbing, painting and electrical — all in the Barking and Dagenham area.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              style={{
                padding: '8px 20px',
                borderRadius: 50,
                border: active === tag ? 'none' : '1.5px solid var(--border)',
                background: active === tag ? 'var(--orange)' : 'var(--white)',
                color: active === tag ? 'var(--white)' : 'var(--muted)',
                fontFamily: 'var(--font-display)',
                fontSize: '.78rem', fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: active === tag ? '0 4px 20px var(--orange-glow)' : 'none',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          variants={container}
          initial="hidden"
          animate="show"
          className="gallery-grid"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.src}
              variants={item}
              className="g-item"
              style={i === 0 && active === 'All' ? { gridColumn: 'span 2' } : {}}
              onClick={() => setLb({ src: p.src.replace(/w=\d+/, 'w=1400'), cap: p.cap })}
            >
              <Image src={p.src} alt={p.alt} width={800} height={400} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="g-overlay">
                <div className="g-sub">{p.tag}</div>
                <div className="g-caption">{p.cap}</div>
              </div>
              <div className="g-zoom"><FaSearchPlus /></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(2,6,15,.95)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setLb(null)}
              style={{ position: 'absolute', top: 22, right: 28, color: 'rgba(255,255,255,.6)', fontSize: '2.2rem', cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1 }}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <motion.img
              src={lb.src}
              alt={lb.cap}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '88vw', maxHeight: '82vh', borderRadius: 10, boxShadow: '0 30px 100px rgba(0,0,0,.7)' }}
              onClick={e => e.stopPropagation()}
            />
            <div style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.6)', fontFamily: 'var(--font-display)', fontSize: '.88rem', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
              {lb.cap}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
