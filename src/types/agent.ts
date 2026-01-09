// Updated: 2026-01-09 - Added cards, actions, bundle support for rich messages
export interface MessageCard {
  id: string
  type: 'info' | 'product' | 'service' | 'recommendation' | 'comparison' | 'deal'
  title: string
  subtitle?: string
  content?: string
  image?: string
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

export interface MessageAction {
  id: string
  label: string
  action: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  data?: Record<string, any>
}

export interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
  cards?: MessageCard[]
  actions?: MessageAction[]
  bundle?: SolutionBundle
  products?: Product[]
  isTyping?: boolean
}

export interface SolutionBundle {
  id: string
  name: string
  description: string
  products: Product[]
  services: Service[]
  totalPrice: {
    oneTime: number
    monthly: number
  }
  memberPrice?: {  // Price for members
    oneTime: number
    monthly: number
  }
  fulfillment: FulfillmentOption[]
  membershipSavings?: number
  savingsAmount?: number  // Total savings on bundle
  whyThisPick: string
}

export interface Product {
  id?: string  // Optional, can use sku as identifier
  sku: string
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
  brand?: string
  rating?: number
  reviewCount?: number
}

export interface Service {
  id: string
  type: 'installation' | 'data-transfer' | 'protection' | 'recycling' | 'support' | 'membership' | 'service'
  name: string
  price: number
  description: string
  isMonthly?: boolean   // For monthly subscription services
  isAnnual?: boolean    // For annual subscription services
}

export interface FulfillmentOption {
  type: 'pickup' | 'delivery' | 'installation'
  available: boolean | string  // boolean or timing string
  timing?: string
  location?: string
  price?: number
  cost?: number  // Alternative to price
}

export interface AgentContext {
  budget?: number
  useCase?: string
  category?: string
  urgency?: 'today' | 'tomorrow' | 'this-week' | 'flexible'
  location?: string
  existingDevices?: string[]
  roomDimensions?: {
    width: number
    length: number
    height: number
  }
  caregivingNeeds?: {
    fallDetection: boolean
    activityMonitoring: boolean
    emergencyContacts: string[]
  }
}
