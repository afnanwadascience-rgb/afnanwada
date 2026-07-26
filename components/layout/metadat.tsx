import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreatorPilot AI - YouTube Script Optimization Platform',
  description: 'AI-powered insights to help content creators maximize engagement, retention, and scale faster.',
  metadataBase: new URL('https://creatorpilot.ai'),
  openGraph: {
    title: 'CreatorPilot AI',
    description: 'Understand. Optimize. Grow your channel with AI-powered script insights.',
    url: '/',
    siteName: 'CreatorPilot AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CreatorPilot AI Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorPilot AI',
    description: 'AI-powered insights to help content creators maximize engagement.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}