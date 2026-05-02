import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact & Free Quote | Patrick Nickolas – Barking & Dagenham',
  description: 'Contact Patrick Nickolas for a free, no-obligation construction, plumbing, painting or electrical quote. Call +447951542411 or fill in our quick form.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Talk About "
        accentWord="Your Project"
        subtitle="Whether it's a quick repair or a full renovation — we're ready to help. Reach out for a free quote today."
        bgImage="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1600&q=80&auto=format&fit=crop&crop=center"
      />
      <Contact />
    </>
  );
}
