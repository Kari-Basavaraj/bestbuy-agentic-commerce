'use client'

import SolutionCard from './SolutionCard'
import { mockBundles } from '@/data/mockBundles'
import { useAgent } from '@/contexts/AgentContext'

export default function FeaturedBundles() {
  const { openAgent } = useAgent()

  // Get first 3 bundles for home page, all bundles for products page
  const featuredBundles = mockBundles.slice(0, 3)

  const handleBundleSelect = (bundleId: string) => {
    // Handle bundle selection - could open details or add to cart
    console.log('Selected bundle:', bundleId)
    openAgent()
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-bestbuy-dark mb-4">
          Featured Solution Bundles
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete tech setups curated by experts. Each bundle includes everything you need —
          products, services, installation, and protection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredBundles.map((bundle) => (
          <SolutionCard
            key={bundle.id}
            bundle={bundle}
            onSelect={() => handleBundleSelect(bundle.id)}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={openAgent}
          className="inline-flex items-center px-6 py-3 bg-bestbuy-blue text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  )
}