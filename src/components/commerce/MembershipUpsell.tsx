'use client'

interface MembershipUpsellProps {
  bundlePrice: number
  servicesTotal: number
  estimatedSavings?: number
}

export default function MembershipUpsell({ 
  bundlePrice, 
  servicesTotal,
  estimatedSavings = 0 
}: MembershipUpsellProps) {
  const MEMBERSHIP_PRICES = {
    plus: 49.99,
    total: 179.99
  }

  // Calculate estimated value
  const membershipValue = {
    plus: Math.max(estimatedSavings * 0.5, 100),
    total: Math.max(estimatedSavings, 250)
  }

  return (
    <div className="bg-white border-l-4 border-bestbuy-blue rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-bestbuy-yellow rounded-full p-2">
          <span className="text-2xl">💳</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-bestbuy-dark">
            My Best Buy Membership
          </h3>
          <p className="text-sm text-gray-600">
            Save more on this bundle and get exclusive benefits
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* My Best Buy Plus */}
        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-bestbuy-blue transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-bestbuy-dark">My Best Buy Plus™</h4>
              <p className="text-sm text-gray-600">Annual membership</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-bestbuy-blue">
                ${MEMBERSHIP_PRICES.plus}
              </p>
              <p className="text-xs text-gray-500">/year</p>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>Exclusive pricing on select items</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>60-day return window</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>Free standard shipping</span>
            </li>
          </ul>

          {membershipValue.plus > MEMBERSHIP_PRICES.plus && (
            <div className="bg-green-50 rounded-lg p-3 mb-3">
              <p className="text-sm font-semibold text-green-800">
                Save ~${Math.round(membershipValue.plus)} on this bundle
              </p>
              <p className="text-xs text-green-600">
                Membership pays for itself!
              </p>
            </div>
          )}

          <button className="w-full bg-bestbuy-blue text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm">
            Add Plus Membership
          </button>
        </div>

        {/* My Best Buy Total */}
        <div className="border-2 border-bestbuy-blue rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-bestbuy-dark flex items-center gap-2">
                My Best Buy Total™
                <span className="bg-bestbuy-yellow text-bestbuy-dark text-xs px-2 py-0.5 rounded-full font-bold">
                  BEST VALUE
                </span>
              </h4>
              <p className="text-sm text-gray-600">Annual membership</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-bestbuy-blue">
                ${MEMBERSHIP_PRICES.total}
              </p>
              <p className="text-xs text-gray-500">/year</p>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm font-semibold">
              <span className="text-green-600">✓</span>
              <span>Everything in Plus, PLUS:</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>24/7/365 Geek Squad tech support</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>Product protection on purchases</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>20% off repairs & installations</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-green-600">✓</span>
              <span>AppleCare+ coverage included</span>
            </li>
          </ul>

          {membershipValue.total > MEMBERSHIP_PRICES.total && (
            <div className="bg-green-50 rounded-lg p-3 mb-3">
              <p className="text-sm font-semibold text-green-800">
                Save ~${Math.round(membershipValue.total)} on this bundle
              </p>
              <p className="text-xs text-green-600">
                Plus ongoing protection & support value!
              </p>
            </div>
          )}

          <button className="w-full bg-bestbuy-blue text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm">
            Add Total Membership
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Memberships auto-renew annually. Cancel anytime.
      </p>
    </div>
  )
}
