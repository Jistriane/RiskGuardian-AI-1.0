import { Inter, Fira_Code } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

import { RootProvider } from '@/providers/root-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RiskGuardian AI - DeFi Risk Management',
  description: 'Plataforma avançada de gerenciamento de risco para DeFi com IA, automação e análise em tempo real',
  keywords: [
    'DeFi',
    'Risk Management',
    'Blockchain',
    'AI',
    'Cryptocurrency',
    'Portfolio',
    'Automation',
    'Web3',
  ],
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
    url: 'https://riskguardian.ai',
    title: 'RiskGuardian AI - DeFi Risk Management',
    description: 'Plataforma avançada de gerenciamento de risco para DeFi com IA',
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
    title: 'RiskGuardian AI - DeFi Risk Management',
    description: 'Plataforma avançada de gerenciamento de risco para DeFi com IA',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Meta tags adicionais */}
        <meta name="theme-color" content="#00d395" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Script SPA para GitHub Pages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Single Page Apps for GitHub Pages
              (function(l) {
                if (l.search[1] === '/' ) {
                  var decoded = l.search.slice(1).split('&').map(function(s) { 
                    return s.replace(/~and~/g, '&')
                  }).join('?');
                  window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              }(window.location))
            `,
          }}
        />
        
        {/* Scripts de terceiros críticos */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Previne flash de tema incorreto
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.variable} ${firaCode.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
} 