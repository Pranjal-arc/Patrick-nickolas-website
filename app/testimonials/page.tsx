import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Testimonials from '@/components/Testimonials';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Client Reviews | Patrick Nickolas – 5‑Star Construction Services',
  description: 'Read genuine 5-star reviews from homeowners and businesses in Barking and Dagenham who experienced Patrick Nickolas construction and home services.',
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Reviews"
        title="What Our Clients "
        accentWord="Say"
        subtitle="Hundreds of happy customers across Barking and Dagenham. Here's what a few of them have to say."
        bgImage="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80&auto=format&fit=crop&crop=center"
      />
      <Testimonials />
      <CtaBand
        title="Join Our Happy Customers"
        subtitle="Get a free, no-obligation quote today and experience the Patrick Nickolas difference for yourself."
      />
    </>
  );
}
