'use client'

import { SolutionBundle } from '@/types/agent'
import FulfillmentStrip from './FulfillmentStrip'

interface SolutionCardProps {
  bundle: SolutionBundle
  onSelect?: () => void
  showMembershipSavings?: boolean
}

export default function SolutionCard({
  bundle,
  onSelect,
  showMembershipSavings = true
}: SolutionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
            <p className="text-blue-100">{bundle.description}</p>
          </div>
          {showMembershipSavings && bundle.membershipSavings && (
            <div className="bg-bestbuy-yellow text-bestbuy-dark px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
              Save ${bundle.membershipSavings}
            </div>
          )}
        </div>
      </div>

      {/* What's Included */}
      <div className="p-6 space-y-6">
        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold text-bestbuy-dark mb-3 flex items-center gap-2">
            <span>🛍️</span>
            Hardware
          </h4>
          <div className="space-y-3">
            {bundle.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-bestbuy-blue">${product.price}</p>
                  {product.inStock ? (
                    <p className="text-xs text-green-600">In Stock</p>
                  ) : (
                    <p className="text-xs text-red-600">Out of Stock</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        {bundle.services.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-bestbuy-dark mb-3 flex items-center gap-2">
              <span>🛠️</span>
              Services & Protection
            </h4>
            <div className="space-y-2">
              {bundle.services.map((service) => (
                <div key={service.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <p className="font-semibold text-bestbuy-blue ml-4">
                    {service.price === 0 ? 'FREE' : `$${service.price}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fulfillment Options */}
        <div>
          <h4 className="text-lg font-semibold text-bestbuy-dark mb-3 flex items-center gap-2">
            <span>🚀</span>
            Fulfillment & Installation
          </h4>
          <FulfillmentStrip options={bundle.fulfillment} />
        </div>

        {/* Why This Pick */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-bestbuy-blue">
          <h4 className="text-sm font-semibold text-bestbuy-dark mb-2 flex items-center gap-2">
            <span>💡</span>
            Why This Pick
          </h4>
          <p className="text-gray-700">{bundle.whyThisPick}</p>
        </div>

        {/* Total Cost */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              {bundle.totalPrice.monthly > 0 && (
                <p className="text-xs text-gray-500">or ${bundle.totalPrice.monthly}/mo</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-bestbuy-blue">
                ${bundle.totalPrice.oneTime}
              </p>
              {bundle.membershipSavings && showMembershipSavings && (
                <p className="text-xs text-green-600">
                  (${bundle.totalPrice.oneTime - bundle.membershipSavings} with membership)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onSelect}
            className="flex-1 bg-bestbuy-blue text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Book This Bundle
          </button>
          <button className="px-6 py-3 border-2 border-bestbuy-blue text-bestbuy-blue rounded-full font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
            Talk to Expert
          </button>
        </div>
      </div>
    </div>
  )
}