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
        
        {/* Script de tema */}
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