import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustTicker from '@/components/TrustTicker';
import Services from '@/components/Services';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Patrick Nickolas | Construction & Home Services – Barking & Dagenham',
  description: 'Premium construction, plumbing, painting and electrical services across Barking and Dagenham, London. Trusted local tradespeople. Call +447951542411.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <Services />
      <CtaBand />
    </>
  );
}
