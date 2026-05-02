const items = [
  '✦ Fully Insured & Certified',
  '✦ Fast Response Times',
  '✦ Transparent Pricing',
  '✦ Local to Barking & Dagenham',
  '✦ 5-Star Rated Service',
  '✦ All Trades Under One Roof',
  '✦ UK Regulation Compliant',
  '✦ +44 7951 542411',
];

export default function TrustTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="trust-ticker">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item" style={{ color: i % 2 === 0 ? 'rgba(255,255,255,.7)' : 'var(--amber)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
