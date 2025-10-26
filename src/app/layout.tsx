import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import GlobalKeyboardShortcuts from '@/components/layout/GlobalKeyboardShortcuts'
import { AgentProvider } from '@/contexts/AgentContext'
import FloatingChatWindow from '@/components/agent/FloatingChatWindow'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Best Buy Agentic Commerce - Your Personal Tech Concierge',
  description: 'AI-powered shopping experience with My Tech Pro - your personal tech concierge for life moments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AgentProvider>
          <GlobalKeyboardShortcuts />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <FloatingChatWindow />
        </AgentProvider>
      </body>
    </html>
  )
}
