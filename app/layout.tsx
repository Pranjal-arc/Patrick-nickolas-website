import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';
import Loader from '@/components/Loader';
import Chatbot from '@/components/Chatbot';
import { SpeedInsights } from '@vercel/speed-insights/next';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Patrick Nickolas | Construction, Plumbing, Painting & Electrical – Barking & Dagenham',
  description:
    'Patrick Nickolas – Premium construction, plumbing, painting and electrical services across Barking and Dagenham, London. Trusted local tradespeople. Call +447951542411.',
  keywords:
    'Construction services Barking and Dagenham, Plumber Barking London, Electrician Barking and Dagenham, painting services Barking',
  openGraph: {
    title: 'Patrick Nickolas – Construction & Home Services',
    description: 'Reliable construction, plumbing, painting & electrical in Barking and Dagenham.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: 'var(--inter, "Inter", sans-serif)' }} suppressHydrationWarning>
        <Loader />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <Chatbot />
        <SpeedInsights />
      </body>
    </html>
  );
}
