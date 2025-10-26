'use client'

import { FulfillmentOption } from '@/types/agent'

interface FulfillmentStripProps {
  options: FulfillmentOption[]
}

export default function FulfillmentStrip({ options }: FulfillmentStripProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pickup':
        return '🏪'
      case 'delivery':
        return '🚚'
      case 'installation':
        return '🔧'
      default:
        return '📦'
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            option.available
              ? 'bg-blue-50 text-bestbuy-blue border border-blue-200 hover:bg-blue-100'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
          }`}
        >
          <span className="text-lg">{getIcon(option.type)}</span>
          <span>
            {option.type === 'pickup' && 'Pickup: '}
            {option.type === 'delivery' && 'Delivery: '}
            {option.type === 'installation' && 'Install: '}
            {option.timing}
          </span>
          {option.location && (
            <span className="text-xs text-gray-600">@ {option.location}</span>
          )}
          {option.price !== undefined && option.price > 0 && (
            <span className="ml-2 bg-bestbuy-yellow text-bestbuy-dark px-2 py-0.5 rounded text-xs font-bold">
              +${option.price}
            </span>
          )}
          {option.price === 0 && (
            <span className="ml-2 bg-bestbuy-yellow text-bestbuy-dark px-2 py-0.5 rounded text-xs font-bold">
              FREE
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
