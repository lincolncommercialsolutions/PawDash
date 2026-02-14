import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ChatAssistant from '@/components/ChatAssistant'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PawDash - On-Demand Pet Care',
  description: 'The Uber of dog walking. Immediate, reliable pet care when you need it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatAssistant />
      </body>
    </html>
  )
}
