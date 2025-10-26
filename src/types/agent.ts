export interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
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
  fulfillment: FulfillmentOption[]
  membershipSavings?: number
  whyThisPick: string
}

export interface Product {
  id: string
  sku: string
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export interface Service {
  id: string
  type: 'installation' | 'data-transfer' | 'protection' | 'recycling' | 'support'
  name: string
  price: number
  description: string
}

export interface FulfillmentOption {
  type: 'pickup' | 'delivery' | 'installation'
  available: boolean
  timing: string
  location?: string
  price?: number
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
