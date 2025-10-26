'use client'

import { useAgent } from '@/contexts/AgentContext'
import { Button } from '@/components/ui/button'
import { Lightbulb, Zap, Shield } from 'lucide-react'

export default function AgentHero() {
  const { openAgent } = useAgent()
  return (
    <section className="bg-gradient-to-br from-bestbuy-blue to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Meet My Tech Pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Your personal AI concierge that understands your needs, designs complete solutions,
            and manages your tech from purchase to support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={openAgent}
              className="bg-bestbuy-yellow text-bestbuy-dark hover:bg-yellow-300 text-lg h-14 px-8"
            >
              Start Shopping
            </Button>
            <Button
              size="lg"
              onClick={openAgent}
              variant="outline"
              className="bg-white text-bestbuy-blue hover:bg-gray-50 border-white text-lg h-14 px-8"
            >
              Talk to an Expert
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Solutions, Not SKUs</h3>
            <p className="text-blue-100">
              Get complete setups with products, services, installation, and protection
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Same-Day Service</h3>
            <p className="text-blue-100">
              Pickup today, delivery tonight, Geek Squad installation tomorrow
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lifecycle Care</h3>
            <p className="text-blue-100">
              24/7 support, proactive maintenance, and upgrade planning included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}