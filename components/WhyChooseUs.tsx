'use client';
import { motion, Variants } from 'framer-motion';
import { FaUserTie, FaBolt, FaTags, FaMedal, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const cards = [
  { Icon: FaUserTie, title: 'Experienced Professionals', desc: 'Every job is handled by fully qualified, experienced tradespeople. No apprentice-only crews — skilled professionals on site, every time.' },
  { Icon: FaBolt, title: 'Fast Response', desc: 'We offer rapid assessments and clear timelines before any work begins. For urgent jobs, we can often be there the same day.' },
  { Icon: FaTags, title: 'Affordable Pricing', desc: "Competitive and honest quotes with no hidden costs. Premium workmanship shouldn't have a premium price — and with us, it doesn't." },
  { Icon: FaMedal, title: 'Quality Workmanship', desc: 'We never cut corners. Every project is finished to the highest standard using quality materials and meticulous attention to detail.' },
  { Icon: FaMapMarkerAlt, title: 'Genuinely Local', desc: 'Based in Barking and Dagenham, we know the area, the housing stock, and the community. We\'re always nearby and easy to reach.' },
  { Icon: FaShieldAlt, title: 'Fully Insured & Certified', desc: 'All work is insured and completed in full compliance with UK safety and building regulations, so you can proceed with complete confidence.' },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function WhyChooseUs() {
  return (
    <section id="why" style={{
      padding: '120px 0',
      background: 'linear-gradient(160deg, var(--ink) 0%, var(--navy) 50%, #0f2d52 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(249,104,22,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -150, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(251,191,36,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow" style={{ color: 'var(--amber)' }}>
            <span style={{ background: 'var(--amber)', display: 'block', width: 28, height: 2, borderRadius: 2 }} />
            Why Choose Us
          </div>
          <h2 className="display-title" style={{ color: 'var(--white)' }}>
            The <span style={{ color: 'var(--amber)' }}>Patrick Nickolas</span> Difference
          </h2>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,.55)' }}>
            We combine local expertise, certified tradespeople, and a genuine commitment to quality — giving you complete peace of mind from quote to completion.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 64 }}
          className="why-grid"
        >
          {cards.map(({ Icon, title, desc }) => (
            <motion.div key={title} variants={item} className="why-card">
              <div className="why-icon-wrap"><Icon /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--white)', marginBottom: 10, letterSpacing: '-.02em' }}>
                {title}
              </h3>
              <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.72, letterSpacing: '-0.006em' }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .why-grid { grid-template-columns: 1fr !important; } }
        .eyebrow::before { display: none !important; }
      `}</style>
    </section>
  );
}
