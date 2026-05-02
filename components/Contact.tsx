'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaTools, FaPaperPlane, FaCheck, FaSpinner } from 'react-icons/fa';
import PainterPro from './PainterPro';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
      formRef.current?.reset();
    }, 1400);
  };

  const contactItems = [
    { Icon: FaPhoneAlt, label: 'Phone', value: <a href="tel:+447951542411" style={{ color: 'var(--orange)', fontWeight: 600 }}>+44 7951 542411</a> },
    { Icon: FaMapMarkerAlt, label: 'Location', value: 'Barking and Dagenham, London, UK' },
    { Icon: FaClock, label: 'Working Hours', value: <span>Mon–Fri: 7:00am – 7:00pm<br />Saturday: 8:00am – 5:00pm</span> },
    { Icon: FaTools, label: 'Services', value: 'Construction · Plumbing · Painting · Electrical' },
  ];

  return (
    <section id="contact" style={{ padding: '120px 0', background: 'var(--off-white)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 60, alignItems: 'start' }} className="contact-grid">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">Get In Touch</div>
            <h2 className="display-title" style={{ marginBottom: 16 }}>
              Let&apos;s Talk About <span className="accent">Your Project</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: 40 }}>
              Whether it&apos;s a quick question or a major build, we&apos;re here and happy to help. Reach out today for a free, no-obligation quote.
            </p>

            <a href="tel:+447951542411" className="call-btn-big">
              <FaPhoneAlt /> Call +44 7951 542411
            </a>

            {contactItems.map(({ Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 26 }}
              >
                <div style={{
                  width: 50, height: 50, flexShrink: 0,
                  background: 'var(--navy)', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--amber)', fontSize: '1.05rem',
                  boxShadow: '0 4px 16px rgba(4,13,26,.15)',
                }}>
                  <Icon />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '.95rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 3, letterSpacing: '-.01em' }}>{label}</div>
                  <div style={{ fontSize: '.95rem', color: 'var(--muted)', lineHeight: 1.5 }}>{value}</div>
                </div>
              </motion.div>
            ))}

            {/* Animation */}
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(4,13,26,.08)', height: 260, marginTop: 4 }}>
              <PainterPro />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="form-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: 6 }}>
              Request a Free Quote
            </h3>
            <p style={{ fontSize: '.94rem', color: 'var(--muted)', marginBottom: 32, lineHeight: 1.6 }}>
              Fill in the form below and we&apos;ll get back to you within 24 hours — usually much sooner.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="f-row">
                <div>
                  <label htmlFor="fn" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>First Name *</label>
                  <input type="text" id="fn" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="ln" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>Last Name</label>
                  <input type="text" id="ln" placeholder="Smith" />
                </div>
              </div>

              {[
                { id: 'em', label: 'Email Address *', type: 'email', placeholder: 'john@example.com' },
                { id: 'ph', label: 'Phone Number', type: 'tel', placeholder: '+44 XXXX XXXXXX' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} style={{ marginBottom: 18 }}>
                  <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>{label}</label>
                  <input type={type} id={id} placeholder={placeholder} required={id === 'em'} />
                </div>
              ))}

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="sv" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>Service Required *</label>
                <select id="sv" required>
                  <option value="" disabled>Select a service…</option>
                  <option>General Construction</option>
                  <option>Plumbing</option>
                  <option>Painting &amp; Decorating</option>
                  <option>Electrical</option>
                  <option>Multiple Services</option>
                </select>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="msg" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>Tell Us About Your Project *</label>
                <textarea id="msg" placeholder="Please describe the work needed, your property type, and any relevant timeline…" required />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending' || status === 'done'}
                style={{
                  width: '100%', padding: 16,
                  background: status === 'done' ? '#10b981' : 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 800,
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  border: 'none', borderRadius: 50, cursor: status === 'done' ? 'default' : 'pointer',
                  boxShadow: '0 6px 24px var(--orange-glow)',
                  transition: 'background 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                }}
              >
                {status === 'idle' && <><FaPaperPlane /> Send My Request</>}
                {status === 'sending' && <><FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>}
                {status === 'done' && <><FaCheck /> Sent!</>}
              </motion.button>

              {status === 'done' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 16, background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#065f46', borderRadius: 10, padding: '14px 18px', fontWeight: 600, fontSize: '.95rem' }}
                >
                  ✅ Thank you! We&apos;ve received your request and will be in touch within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .f-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
