import { AgentContext, SolutionBundle } from '@/types/agent'

export class AgentService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  async generateRecommendations(context: AgentContext): Promise<SolutionBundle[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(context),
      })

      if (!response.ok) {
        throw new Error('Failed to generate recommendations')
      }

      return await response.json()
    } catch (error) {
      console.error('Agent recommendation error:', error)
      return this.getFallbackRecommendations(context)
    }
  }

  async chat(message: string, context: AgentContext): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context }),
      })

      if (!response.ok) {
        throw new Error('Failed to get chat response')
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Agent chat error:', error)
      return "I'm having trouble processing that. Would you like to speak with a human expert?"
    }
  }

  private getFallbackRecommendations(context: AgentContext): SolutionBundle[] {
    // Fallback recommendations when API fails
    return [
      {
        id: '1',
        name: 'Creator Video Edit Setup - Good',
        description: 'Perfect for content creators starting their journey',
        products: [
          {
            id: 'p1',
            sku: 'BBY123',
            name: 'MacBook Air M2',
            price: 1199,
            image: '/placeholder-laptop.jpg',
            category: 'Laptops',
            inStock: true,
          },
        ],
        services: [
          {
            id: 's1',
            type: 'data-transfer',
            name: 'Data Transfer Service',
            price: 99,
            description: 'Transfer all your files from old device',
          },
          {
            id: 's2',
            type: 'protection',
            name: 'AppleCare+ Protection',
            price: 279,
            description: '3-year protection plan',
          },
        ],
        totalPrice: {
          oneTime: 1577,
          monthly: 0,
        },
        fulfillment: [
          {
            type: 'pickup',
            available: true,
            timing: 'Ready in 1 hour',
            location: 'Best Buy Union Square',
          },
          {
            type: 'installation',
            available: true,
            timing: 'Tomorrow 8-10am',
            price: 0,
          },
        ],
        membershipSavings: 150,
        whyThisPick: 'Great performance for video editing with efficient M2 chip, includes data transfer and protection.',
      },
    ]
  }

  async processUserInput(input: string): Promise<AgentContext> {
    // Parse user input to extract context
    const context: AgentContext = {}

    // Extract budget
    const budgetMatch = input.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
    if (budgetMatch) {
      context.budget = parseFloat(budgetMatch[0].replace(/[$,]/g, ''))
    }

    // Extract urgency
    if (input.toLowerCase().includes('today')) {
      context.urgency = 'today'
    } else if (input.toLowerCase().includes('tomorrow')) {
      context.urgency = 'tomorrow'
    } else if (input.toLowerCase().includes('week')) {
      context.urgency = 'this-week'
    }

    // Extract use case
    if (input.toLowerCase().includes('video') || input.toLowerCase().includes('edit')) {
      context.useCase = 'video-editing'
    } else if (input.toLowerCase().includes('game') || input.toLowerCase().includes('gaming')) {
      context.useCase = 'gaming'
    } else if (input.toLowerCase().includes('work') || input.toLowerCase().includes('office')) {
      context.useCase = 'work'
    }

    return context
  }
}

export default new AgentService()