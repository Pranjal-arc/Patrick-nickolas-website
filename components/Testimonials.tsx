'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const reviews = [
  { stars: 5, text: '"Patrick and his team completely transformed our living room and hallway. The finish is absolutely flawless — they were punctual, tidy and incredibly professional. Wouldn\'t hesitate to book again."', name: 'Sarah M.', role: 'Homeowner, Barking', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80&auto=format&fit=crop&crop=faces' },
  { stars: 5, text: '"Had a major plumbing emergency on a Sunday morning — Patrick answered immediately and was at my door within two hours. Fixed the burst pipe cleanly and quickly. Absolute lifesavers."', name: 'James T.', role: 'Landlord, Dagenham', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop&crop=faces' },
  { stars: 5, text: '"We hired Patrick Nickolas for a full kitchen extension. On budget, on time, and the quality is outstanding. The team were always courteous and left the site immaculate each day."', name: 'Priya K.', role: 'Homeowner, Barking', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&q=80&auto=format&fit=crop&crop=faces' },
  { stars: 5, text: '"Our whole property needed rewiring. Patrick\'s electricians were knowledgeable, explained everything clearly, and the work was done safely and efficiently with full certification."', name: 'David O.', role: 'Business Owner, Barking', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80&auto=format&fit=crop&crop=faces' },
  { stars: 5, text: '"Used Patrick Nickolas to paint throughout my new flat before I moved in. The team worked quickly and the finish is immaculate. Very reasonable pricing and no mess left behind — 10/10."', name: 'Marcus L.', role: 'Tenant, Dagenham', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=96&q=80&auto=format&fit=crop&crop=faces' },
  { stars: 5, text: '"Patrick replaced all our bathroom plumbing and installed a new shower. The workmanship is brilliant and he was refreshingly transparent about costs throughout. Will definitely use again."', name: 'Claire B.', role: 'Homeowner, Dagenham', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=80&auto=format&fit=crop&crop=faces' },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '120px 0', background: 'var(--white)' }}>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Client Reviews</div>
          <h2 className="display-title">What Our <span className="accent">Clients Say</span></h2>
          <p className="body-lg">
            Hear from the homeowners and businesses we&apos;ve helped across Barking and Dagenham.
          </p>
          {/* Trust bar */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            marginTop: 28, padding: '10px 24px',
            background: 'var(--surface)', borderRadius: 50,
            border: '1px solid var(--border)', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--amber)', fontSize: '.85rem', letterSpacing: 1 }}>★★★★★</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '.92rem', color: 'var(--navy)', letterSpacing: '-.01em' }}>5.0</span>
            </div>
            <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.06em', fontFamily: 'var(--font-body)' }}>
              500+ Satisfied Clients
            </span>
            <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 600, color: '#10b981', letterSpacing: '.06em', fontFamily: 'var(--font-body)' }}>
              ✓ 100% Recommended
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}
          className="t-grid"
        >
          {reviews.map(({ stars, text, name, role, avatar }) => (
            <motion.div key={name} variants={item} className="t-card">
              <div style={{ color: 'var(--amber)', fontSize: '.9rem', letterSpacing: 2, marginBottom: 16 }}>
                {'★'.repeat(stars)}
              </div>
              <p style={{ fontSize: '.97rem', lineHeight: 1.75, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 26 }}>
                {text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <Image
                  src={avatar} alt={name} width={48} height={48} loading="lazy"
                  style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)', flexShrink: 0, width: 48, height: 48 }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '.95rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.01em' }}>{name}</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 2, fontFamily: 'var(--font-body)' }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .t-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .t-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
