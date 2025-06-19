import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { RootProvider } from '@/providers/root-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'RiskGuardian AI - Portfolio Risk Management',
  description: 'AI-powered portfolio risk analysis and automated protection for DeFi investments',
  keywords: ['DeFi', 'Risk Management', 'AI', 'Portfolio', 'Blockchain', 'Automation'],
  authors: [{ name: 'RiskGuardian Team' }],
  openGraph: {
    title: 'RiskGuardian AI',
    description: 'AI-powered portfolio risk analysis and automated protection for DeFi investments',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiskGuardian AI',
    description: 'AI-powered portfolio risk analysis and automated protection for DeFi investments',
  },
  manifest: '/site.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>
            <div className="relative min-h-screen bg-background text-foreground">
              {children}
            </div>
          </RootProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
} 