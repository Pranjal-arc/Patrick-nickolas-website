import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Services | Patrick Nickolas – Construction, Plumbing, Painting & Electrical',
  description: 'Expert construction, plumbing, painting, and electrical services in Barking and Dagenham. Certified professionals. Fast response. Transparent pricing.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Expert "
        accentWord="Services"
        subtitle="From full-scale construction projects to rapid repairs — we cover all four trades with certified, experienced professionals."
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop&crop=center"
      />
      <Services />
      <WhyChooseUs />
      <CtaBand />
    </>
  );
}
