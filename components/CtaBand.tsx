import Link from 'next/link';
import { FaFileAlt, FaPhoneAlt } from 'react-icons/fa';

interface CtaBandProps {
  title?: string;
  subtitle?: string;
}

export default function CtaBand({ title = 'Ready to Start Your Next Project?', subtitle = 'Get a free, no-obligation quote from your trusted local tradesmen in Barking and Dagenham. We respond within 24 hours.' }: CtaBandProps) {
  return (
    <section id="cta" style={{
      padding: '100px 24px',
      background: 'linear-gradient(115deg, #ff7a2e 0%, var(--orange) 40%, #c94e0a 100%)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: .04,
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.035em', color: 'var(--white)' }}>
          {title}
        </div>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,.8)', maxWidth: 520, margin: '16px auto 40px' }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-dark">
            <FaFileAlt /> Get a Free Quote
          </Link>
          <a href="tel:+447951542411" className="btn btn-ghost">
            <FaPhoneAlt /> Call +44 7951 542411
          </a>
        </div>
      </div>
    </section>
  );
}
