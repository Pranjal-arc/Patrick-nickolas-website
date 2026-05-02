import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Gallery from '@/components/Gallery';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Projects Gallery | Patrick Nickolas – Construction & Home Services',
  description: 'Browse our portfolio of completed construction, plumbing, painting and electrical projects across Barking and Dagenham, East London.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Recent "
        accentWord="Projects"
        subtitle="Browse a curated selection of completed projects — from residential extensions to full electrical rewires."
        bgImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop&crop=center"
      />
      <Gallery />
      <CtaBand
        title="Love What You See?"
        subtitle="Get in touch today and let's discuss your project. Free quotes, fast response, guaranteed quality."
      />
    </>
  );
}
