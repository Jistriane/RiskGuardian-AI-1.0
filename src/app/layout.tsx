import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { RootProvider } from '@/providers/RootProvider'
import { config } from '@/config/env'

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: config.app.name,
  description: 'AI-powered DeFi risk management and portfolio optimization platform',
  keywords: ['DeFi', 'Risk Management', 'AI', 'Blockchain', 'Portfolio', 'Automation'],
  authors: [{ name: 'RiskGuardian Team' }],
  openGraph: {
    title: config.app.name,
    description: 'AI-powered DeFi risk management and portfolio optimization',
    type: 'website',
    url: config.app.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: config.app.name,
    description: 'AI-powered DeFi risk management',
  },
  robots: {
    index: false, // Not indexing testnet app
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 min-h-screen`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
} 