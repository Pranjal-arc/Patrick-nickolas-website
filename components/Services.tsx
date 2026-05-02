'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FaBuilding, FaFaucet, FaPaintRoller, FaBolt, FaArrowRight } from 'react-icons/fa6';

export const servicesData = [
  {
    icon: FaBuilding,
    title: 'General Construction',
    desc: 'New builds, extensions, loft conversions and full renovations — managed end-to-end with precision. We handle everything from groundwork to finishing touches.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70',
    alt: 'General Construction – Workers building a structure on site',
    bg: '#0e2a47',
  },
  {
    icon: FaFaucet,
    title: 'Plumbing',
    desc: 'Leaks, boiler installations, bathroom fitting and complete plumbing systems. Our certified plumbers respond fast and fix it right the first time — every time.',
    img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=70',
    alt: 'Plumbing Services – Copper pipework and fittings',
    bg: '#0e2a47',
  },
  {
    icon: FaPaintRoller,
    title: 'Painting & Decorating',
    desc: 'Interior and exterior painting, wallpapering, and feature wall finishes. We achieve immaculate results with premium materials and minimal disruption.',
    img: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=70',
    alt: 'Painting and Decorating – Paint roller on fresh wall',
    bg: '#1a2e18',
  },
  {
    icon: FaBolt,
    title: 'Electrical',
    desc: 'Consumer unit upgrades, full rewires, smart lighting, and fault diagnosis. All work is Part P certificated and fully compliant with current UK regulations.',
    img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=70',
    alt: 'Electrical Services – Electrician working on wiring panel',
    bg: '#1a1a0e',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 0', background: 'var(--off-white)' }}>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">What We Do</div>
          <h2 className="display-title">Our Expert <span className="accent">Services</span></h2>
          <p className="body-lg">
            From full-scale construction projects to rapid repairs — Patrick Nickolas covers all four trades with certified, experienced professionals.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}
          className="services-grid"
        >
          {servicesData.map(({ icon: Icon, title, desc, img, alt, bg }) => (
            <motion.div key={title} variants={item} className="svc-card">
              <div className="svc-img" style={{ background: bg }}>
                <Image src={img} alt={alt} width={800} height={240} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="svc-img-overlay" />
                <div className="svc-badge"><Icon /></div>
              </div>
              <div className="svc-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="/contact" className="svc-link">
                  Request Service <FaArrowRight style={{ fontSize: '.75rem' }} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
