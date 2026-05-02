import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import About from '@/components/About';
import ScrollStory from '@/components/ScrollStory';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'About Us | Patrick Nickolas – Your Trusted Local Tradesmen',
  description: 'Over 12 years serving Barking and Dagenham. Family-run, fully insured, and committed to quality workmanship. Learn about Patrick Nickolas and our team.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Your Trusted Local "
        accentWord="Tradesmen"
        subtitle="Family-run and proudly rooted in Barking and Dagenham for over 12 years — skilled, honest, and reliable every single time."
        bgImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80&auto=format&fit=crop&crop=center"
      />
      <About />
      <ScrollStory />
      <CtaBand
        title="Ready to Work Together?"
        subtitle="Tell us about your project and get a free, no-obligation quote within 24 hours."
      />
    </>
  );
}
