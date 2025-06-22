/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

import { Inter, Fira_Code } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

import { RootProvider } from '@/providers/root-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riskguardian-ai.vercel.app'),
  title: 'RiskGuardian AI - Proteção Inteligente de Portfolio DeFi',
  description: 'Sistema avançado de monitoramento e proteção de riscos para portfolios DeFi com IA e automação blockchain',
  keywords: 'DeFi, blockchain, proteção de risco, portfolio, IA, automação, criptomoedas',
  authors: [{ name: 'RiskGuardian Team' }],
  creator: 'RiskGuardian AI',
  publisher: 'RiskGuardian AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://riskguardian-ai.vercel.app',
    title: 'RiskGuardian AI - Proteção Inteligente de Portfolio DeFi',
    description: 'Sistema avançado de monitoramento e proteção de riscos para portfolios DeFi com IA e automação blockchain',
    siteName: 'RiskGuardian AI',
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
    title: 'RiskGuardian AI - Proteção Inteligente de Portfolio DeFi',
    description: 'Sistema avançado de monitoramento e proteção de riscos para portfolios DeFi com IA e automação blockchain',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Script de tema inline otimizado
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {
      console.warn('Theme script error:', e);
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* Preconnect otimizado */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS Prefetch para melhor performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Meta tags otimizadas */}
        <meta name="theme-color" content="#00d395" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Script de tema otimizado */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body 
        className="antialiased min-h-screen bg-background font-sans"
        suppressHydrationWarning
      >
        <RootProvider>
          <div id="root-content" className="relative min-h-screen">
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
} 