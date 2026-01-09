'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Bot, User, ShoppingCart, Package, Truck, Shield, 
  Calendar, MapPin, Clock, DollarSign, ChevronRight,
  Zap, Heart, Star, Info, CheckCircle2, AlertCircle,
  Wrench, ArrowRight, Sparkles, TrendingUp, Gift
} from 'lucide-react'
import type { SolutionBundle, Product } from '@/types/agent'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp?: Date
    cards?: MessageCard[]
    actions?: MessageAction[]
    bundle?: SolutionBundle
    products?: Product[]
    isTyping?: boolean
  }
  onActionClick?: (action: MessageAction) => void
  onBundleAction?: (bundle: SolutionBundle, action: string) => void
}

interface MessageCard {
  id: string
  type: 'info' | 'product' | 'service' | 'recommendation' | 'comparison' | 'deal'
  title: string
  subtitle?: string
  content?: string
  image?: string
  icon?: React.ReactNode
  badge?: string
  badgeColor?: string
  highlights?: string[]
  pricing?: {
    original?: number
    current: number
    savings?: number
    isMonthly?: boolean
  }
  cta?: {
    label: string
    action: string
    variant?: 'default' | 'outline' | 'ghost'
  }
  metadata?: Record<string, any>
}

interface MessageAction {
  id: string
  label: string
  icon?: React.ReactNode
  action: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  data?: any
}

export default function ChatMessage({ message, onActionClick, onBundleAction }: ChatMessageProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const getCardIcon = (type: MessageCard['type']) => {
    switch (type) {
      case 'product': return <Package className="w-4 h-4" />
      case 'service': return <Wrench className="w-4 h-4" />
      case 'recommendation': return <Sparkles className="w-4 h-4" />
      case 'comparison': return <TrendingUp className="w-4 h-4" />
      case 'deal': return <Gift className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const formatPrice = (price: number, isMonthly?: boolean) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
    return isMonthly ? `${formatted}/mo` : formatted
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-start gap-2 max-w-[70%]">
          <div className="bg-bestbuy-blue text-white rounded-2xl px-4 py-3">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
            {message.timestamp && (
              <p className="text-xs text-blue-100 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            )}
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2 max-w-[85%]">
        <div className="w-8 h-8 bg-bestbuy-blue rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 space-y-2">
          {/* Main message content */}
          {message.content && (
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-800 whitespace-pre-line">{message.content}</p>
            </div>
          )}

          {/* Typing indicator */}
          {message.isTyping && (
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-gray-500 italic">Thinking...</span>
              </div>
            </div>
          )}

          {/* Message cards */}
          {message.cards && message.cards.length > 0 && (
            <div className="grid gap-2">
              {message.cards.map((card) => (
                <Card 
                  key={card.id}
                  className={`border transition-all cursor-pointer hover:shadow-md ${
                    selectedCard === card.id ? 'border-bestbuy-blue shadow-md' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {card.icon || getCardIcon(card.type)}
                        <CardTitle className="text-base">{card.title}</CardTitle>
                      </div>
                      {card.badge && (
                        <Badge 
                          variant={card.badgeColor === 'yellow' ? 'default' : 'secondary'}
                          className={card.badgeColor === 'yellow' ? 'bg-bestbuy-yellow text-black' : ''}
                        >
                          {card.badge}
                        </Badge>
                      )}
                    </div>
                    {card.subtitle && (
                      <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    {card.content && (
                      <p className="text-sm text-gray-700 mb-3">{card.content}</p>
                    )}
                    
                    {card.highlights && card.highlights.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {card.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {card.pricing && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex items-end justify-between">
                          <div>
                            {card.pricing.original && card.pricing.original !== card.pricing.current && (
                              <p className="text-xs text-gray-500 line-through">
                                {formatPrice(card.pricing.original)}
                              </p>
                            )}
                            <p className="text-lg font-bold text-bestbuy-blue">
                              {formatPrice(card.pricing.current, card.pricing.isMonthly)}
                            </p>
                          </div>
                          {card.pricing.savings && (
                            <Badge className="bg-green-100 text-green-800">
                              Save {formatPrice(card.pricing.savings)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {card.cta && (
                      <Button
                        variant={card.cta.variant || 'default'}
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!card.cta) return
                          onActionClick?.({
                            id: card.id,
                            label: card.cta.label,
                            action: card.cta.action,
                            data: card.metadata
                          })
                        }}
                      >
                        {card.cta.label}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Solution Bundle Display */}
          {message.bundle && (
            <Card className="border-2 border-bestbuy-blue shadow-lg">
              <CardHeader className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {message.bundle.name}
                  </span>
                  <Badge className="bg-bestbuy-yellow text-black">
                    Complete Solution
                  </Badge>
                </CardTitle>
                <p className="text-sm text-blue-100 mt-1">{message.bundle.description}</p>
              </CardHeader>
              
              <CardContent className="pt-4">
                {/* Products */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Products
                  </h4>
                  <div className="space-y-2">
                    {message.bundle.products.map((product) => (
                      <div key={product.sku} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <img 
                            src={product.image || '/placeholder-product.jpg'} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-600">SKU: {product.sku}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-sm">{formatPrice(product.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                {message.bundle.services.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Services & Protection
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {message.bundle.services.map((service) => (
                        <div key={service.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-xs font-medium">{service.name}</p>
                            <p className="text-xs text-gray-600">
                              {formatPrice(service.price, service.isMonthly)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fulfillment Options */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Fulfillment Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {message.bundle.fulfillment.map((option) => (
                      <Badge key={option.type} variant="outline" className="flex items-center gap-1">
                        {option.type === 'pickup' && <MapPin className="w-3 h-3" />}
                        {option.type === 'delivery' && <Truck className="w-3 h-3" />}
                        {option.type === 'installation' && <Wrench className="w-3 h-3" />}
                        {option.available}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Total Price */}
                <Separator className="my-4" />
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Solution Cost</p>
                    <p className="text-2xl font-bold text-bestbuy-blue">
                      {formatPrice(message.bundle.totalPrice.oneTime)}
                    </p>
                    {message.bundle.totalPrice.monthly > 0 && (
                      <p className="text-sm text-gray-600">
                        + {formatPrice(message.bundle.totalPrice.monthly)}/month
                      </p>
                    )}
                  </div>
                  {message.bundle.savingsAmount && (
                    <Badge className="bg-green-100 text-green-800">
                      <DollarSign className="w-3 h-3" />
                      Save {formatPrice(message.bundle.savingsAmount)}
                    </Badge>
                  )}
                </div>

                {/* Why This Pick */}
                {message.bundle.whyThisPick && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Why This Solution?</p>
                    <p className="text-xs text-blue-800">{message.bundle.whyThisPick}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="bg-bestbuy-blue hover:bg-blue-700"
                    onClick={() => onBundleAction?.(message.bundle!, 'add-to-cart')}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onBundleAction?.(message.bundle!, 'view-details')}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          {message.actions && message.actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={() => onActionClick?.(action)}
                  className="text-xs"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}