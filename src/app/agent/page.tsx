'use client'

import { useAgent } from '@/contexts/AgentContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Package, Rocket } from 'lucide-react'
import { useEffect } from 'react'

export default function AgentPage() {
  const { openAgent } = useAgent()

  useEffect(() => {
    // Open agent drawer when page loads
    openAgent()
  }, [openAgent])

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bestbuy-dark mb-4">
            My Tech Pro
          </h1>
          <p className="text-xl text-gray-600">
            Your personal AI concierge for all things tech
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-bestbuy-blue" />
              </div>
              <CardTitle className="text-lg">Personalized Recommendations</CardTitle>
              <CardDescription>
                Get solutions tailored to your specific needs, budget, and timeline
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <Package className="w-6 h-6 text-bestbuy-blue" />
              </div>
              <CardTitle className="text-lg">Complete Bundles</CardTitle>
              <CardDescription>
                Hardware, services, installation, and protection all in one package
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <Rocket className="w-6 h-6 text-bestbuy-blue" />
              </div>
              <CardTitle className="text-lg">Fast Fulfillment</CardTitle>
              <CardDescription>
                Same-day pickup, overnight delivery, and next-day installation available
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-bestbuy-blue rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-6">
            Tell me what you need, and I'll design the perfect solution for you.
          </p>
          <Button 
            size="lg"
            onClick={openAgent}
            className="bg-bestbuy-yellow text-bestbuy-dark hover:bg-yellow-300"
          >
            Start Conversation
          </Button>
        </div>
      </div>
    </div>
  )
}
