'use client'

import SolutionCard from './SolutionCard'
import { mockBundles } from '@/data/mockBundles'
import { useAgent } from '@/contexts/AgentContext'

export default function AllBundles() {
  const { openAgent } = useAgent()

  const handleBundleSelect = (bundleId: string) => {
    // Handle bundle selection - could open details or add to cart
    console.log('Selected bundle:', bundleId)
    openAgent()
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-bestbuy-dark mb-4">
          All Solution Bundles
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete tech setups for every need. Each bundle includes products, services,
          installation, and protection — everything you need in one package.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockBundles.map((bundle) => (
          <SolutionCard
            key={bundle.id}
            bundle={bundle}
            onSelect={() => handleBundleSelect(bundle.id)}
          />
        ))}
      </div>

      <div className="text-center py-8">
        <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-bestbuy-dark mb-3">
            Don't see what you're looking for?
          </h3>
          <p className="text-gray-600 mb-4">
            Our Tech Pro can create a custom solution based on your specific needs,
            budget, and timeline.
          </p>
          <button
            onClick={openAgent}
            className="inline-flex items-center px-6 py-3 bg-bestbuy-blue text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Talk to My Tech Pro
          </button>
        </div>
      </div>
    </div>
  )
}