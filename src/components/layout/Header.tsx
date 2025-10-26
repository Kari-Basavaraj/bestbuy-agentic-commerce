'use client'

import Link from 'next/link'
import { useAgent } from '@/contexts/AgentContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Header() {
  const { openAgent } = useAgent()
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-bestbuy-dark">Best Buy</span>
              <div className="ml-2 w-8 h-8 bg-bestbuy-yellow rounded"></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-bestbuy-blue transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-bestbuy-blue transition-colors">
              Products
            </Link>
            <Link href="/agent" className="text-gray-700 hover:text-bestbuy-blue transition-colors">
              My Tech Pro
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-bestbuy-blue transition-colors">
              Support
            </Link>
          </nav>

          {/* My Tech Pro CTA */}
          <div className="flex items-center gap-2">
            <Button onClick={openAgent}>
              Ask My Tech Pro
            </Button>
            <Badge variant="secondary" className="hidden md:inline-flex text-xs">
              ⌘K
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
