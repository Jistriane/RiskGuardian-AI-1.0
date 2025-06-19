import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: 'RiskGuardian AI - DeFi Risk Management',
  description: 'Advanced DeFi Risk Management Platform with AI-powered analytics',
  keywords: 'DeFi, Risk Management, AI, Blockchain, Portfolio, Analytics',
  authors: [{ name: 'RiskGuardian Team' }],
  openGraph: {
    title: 'RiskGuardian AI',
    description: 'Advanced DeFi Risk Management Platform',
    type: 'website',
    url: 'https://riskguardian.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RiskGuardian AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiskGuardian AI',
    description: 'Advanced DeFi Risk Management Platform',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body 
        className={`${inter.variable} ${orbitron.variable} antialiased min-h-screen bg-background text-foreground overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'glass border border-border',
              style: {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              },
              duration: 4000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
} 