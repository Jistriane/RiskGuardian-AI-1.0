import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RootProvider from '@/providers/root-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RiskGuardian AI',
  description: 'Automated DeFi Risk Management Platform',
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
} 