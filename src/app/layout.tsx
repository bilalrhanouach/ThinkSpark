import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SignOutButton } from '@/components/SignOutButton'

// Using Inter as the primary font (optionally swap to Space_Grotesk or Geist if available)
const inter = Inter({ subsets: ['latin'], weight: ['400','500','600'] })

export const metadata: Metadata = {
  title: 'ThinkSpark - AI Tutor',
  description: 'An AI tutor that helps students solve homework problems using the Socratic method',
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#10b981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        {/* Floating Sign out button (hidden on /login via CSS if desired) */}
        <SignOutButton />
        {children}
      </body>
    </html>
  )
}