import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { AgentContext } from '@/types/agent'

// Lazy-load OpenAI client to prevent build-time errors
// Updated: 2026-01-09
let openaiClient: OpenAI | null = null

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return openaiClient
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, conversationHistory } = await request.json()

    // Get OpenAI client (lazy-loaded)
    const openai = getOpenAIClient()

    // If OpenAI is not configured, use fallback responses
    if (!openai) {
      const updatedContext = await extractContextFromMessage(message, context || {})
      const fallbackResponse = generateFallbackResponse(message, updatedContext, conversationHistory)

      return NextResponse.json({
        response: fallbackResponse,
        context: updatedContext,
        shouldGenerateRecommendations: shouldTriggerRecommendations(message, updatedContext)
      })
    }

    // Build enhanced system prompt
    const systemPrompt = buildSystemPrompt(context)

    // Build conversation messages with history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ]

    // Add conversation history if provided
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })
      })
    }

    // Add current message
    messages.push({ role: 'user', content: message })

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    const response = completion.choices[0]?.message?.content || 
      "I'm having trouble processing that. Would you like to speak with a human expert?"

    // Extract any updated context from the conversation
    const updatedContext = await extractContextFromMessage(message, context)

    return NextResponse.json({ 
      response,
      context: updatedContext,
      shouldGenerateRecommendations: shouldTriggerRecommendations(message, updatedContext)
    })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    
    // Handle any error with fallback response
    const { message, context } = await request.json().catch(() => ({ message: '', context: {} }))
    const updatedContext = await extractContextFromMessage(message, context || {})
    const fallbackResponse = generateFallbackResponse(message, updatedContext, [])
    
    return NextResponse.json({ 
      response: fallbackResponse,
      context: updatedContext,
      shouldGenerateRecommendations: shouldTriggerRecommendations(message, updatedContext)
    })
  }
}

function buildSystemPrompt(context: AgentContext): string {
  const contextInfo = context ? `\n\nCurrent customer context:
- Budget: ${context.budget ? `$${context.budget}` : 'Not specified'}
- Use case: ${context.useCase || 'Not specified'}
- Urgency: ${context.urgency || 'Flexible'}
- Location: ${context.location || 'Not specified'}
- Existing devices: ${context.existingDevices?.join(', ') || 'None mentioned'}
` : ''

  return `You are "My Tech Pro", Best Buy's AI concierge assistant. You embody the trusted Blue Shirt expert who knows technology inside-out.

## Core Principles

1. **Budget-Aware & Respectful**: Never shame customers about budget. Every budget deserves respect.
2. **Complete Solutions**: Recommend BUNDLES (hardware + services + installation + protection), not just products.
3. **Service as Product**: Installation, data transfer, and Geek Squad support are selling points.
4. **Calm Expert Tone**: Friendly, knowledgeable, never pushy or salesy.
5. **Transparent Pricing**: Always show total cost upfront, including services.

## Conversation Guidelines

**First Interaction:**
- Warmly greet the customer
- Ask 2-3 clarifying questions to understand their needs:
  * What will they use it for? (use case)
  * What's their budget range?
  * When do they need it? (urgency)
  * Any existing devices/setup?

**During Conversation:**
- Listen actively and acknowledge what they share
- Ask follow-up questions if something is unclear
- Educate without overwhelming (explain ONE tech detail at a time)
- Use plain English, avoid jargon unless customer uses it first

**When Ready to Recommend:**
- Signal you're ready: "Based on what you've shared, I have some great options for you."
- Explain you'll show 1-2 COMPLETE solutions (not just products)
- Mention they'll see: hardware, services, installation options, and pricing

**Important:**
- DON'T list products in chat - let the Solution Cards do that
- DO explain WHY these solutions fit their needs
- DO mention membership savings opportunities
- ALWAYS offer "Want to talk to a human expert?" option

## Membership Value
When relevant, mention:
- My Best Buy Plus ($49.99/year): 20% off services, exclusive member prices
- My Best Buy Total ($179.99/year): All Plus benefits + 24/7 Geek Squad support, 2-year protection

## Human Escalation
Offer human help when:
- Customer expresses frustration
- Request is complex (business/commercial setup)
- Customer explicitly asks
- Technical question beyond general knowledge${contextInfo}

## Response Style
- Use conversational language
- Keep responses concise (2-4 sentences usually)
- Use emojis sparingly (🎯, ✨, 🚀, 💡) for key points only
- End with a question or clear next step`
}

async function extractContextFromMessage(message: string, existingContext: AgentContext): Promise<AgentContext> {
  const context = { ...existingContext }
  const lowerMessage = message.toLowerCase()

  // Extract budget
  const budgetMatch = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
  if (budgetMatch && !context.budget) {
    const amount = parseFloat(budgetMatch[0].replace(/[$,]/g, ''))
    if (amount >= 100) { // Reasonable tech budget threshold
      context.budget = amount
    }
  }

  // Extract urgency
  if (!context.urgency) {
    if (lowerMessage.includes('today') || lowerMessage.includes('asap') || lowerMessage.includes('urgent')) {
      context.urgency = 'today'
    } else if (lowerMessage.includes('tomorrow')) {
      context.urgency = 'tomorrow'
    } else if (lowerMessage.includes('week') || lowerMessage.includes('weekend')) {
      context.urgency = 'this-week'
    } else if (lowerMessage.includes('flexible') || lowerMessage.includes('whenever')) {
      context.urgency = 'flexible'
    }
  }

  // Extract use case
  if (!context.useCase) {
    if (lowerMessage.includes('video') && (lowerMessage.includes('edit') || lowerMessage.includes('editing'))) {
      context.useCase = 'video-editing'
    } else if (lowerMessage.includes('game') || lowerMessage.includes('gaming')) {
      context.useCase = 'gaming'
    } else if (lowerMessage.includes('work') || lowerMessage.includes('office') || lowerMessage.includes('productivity')) {
      context.useCase = 'work'
    } else if (lowerMessage.includes('student') || lowerMessage.includes('school') || lowerMessage.includes('college')) {
      context.useCase = 'student'
    } else if (lowerMessage.includes('photo') && lowerMessage.includes('edit')) {
      context.useCase = 'photo-editing'
    } else if (lowerMessage.includes('coding') || lowerMessage.includes('programming') || lowerMessage.includes('development')) {
      context.useCase = 'development'
    } else if (lowerMessage.includes('streaming') || lowerMessage.includes('content creation')) {
      context.useCase = 'content-creation'
    }
  }

  // Extract device category
  if (!context.category) {
    if (lowerMessage.includes('laptop') || lowerMessage.includes('notebook')) {
      context.category = 'laptops'
    } else if (lowerMessage.includes('desktop') || lowerMessage.includes('pc')) {
      context.category = 'desktops'
    } else if (lowerMessage.includes('tv') || lowerMessage.includes('television')) {
      context.category = 'tvs'
    } else if (lowerMessage.includes('tablet') || lowerMessage.includes('ipad')) {
      context.category = 'tablets'
    } else if (lowerMessage.includes('phone') || lowerMessage.includes('smartphone')) {
      context.category = 'phones'
    } else if (lowerMessage.includes('camera')) {
      context.category = 'cameras'
    } else if (lowerMessage.includes('headphone') || lowerMessage.includes('earbuds')) {
      context.category = 'audio'
    } else if (lowerMessage.includes('home theater') || lowerMessage.includes('soundbar') || lowerMessage.includes('speaker')) {
      context.category = 'home-theater'
    }
  }

  return context
}

function shouldTriggerRecommendations(message: string, context: AgentContext): boolean {
  // Trigger recommendations when we have enough context
  const hasMinimumContext = !!(context.budget || context.useCase || context.category)
  
  const lowerMessage = message.toLowerCase()
  const requestsRecommendation = 
    lowerMessage.includes('show me') ||
    lowerMessage.includes('recommend') ||
    lowerMessage.includes('find') ||
    lowerMessage.includes('looking for') ||
    lowerMessage.includes('need') ||
    lowerMessage.includes('want') ||
    lowerMessage.includes('search')

  return hasMinimumContext && requestsRecommendation
}

function generateFallbackResponse(message: string, context: AgentContext, conversationHistory: any[]): string {
  const lowerMessage = message.toLowerCase()
  const isFirstMessage = conversationHistory.length === 0

  // Simple greeting without context
  if ((isFirstMessage || conversationHistory.length === 0) && lowerMessage.match(/^(hi|hello|hey)\s*$/)) {
    return "Hi! I'm your Tech Pro. I can help you find the perfect tech solution. What are you looking for today?"
  }

  // Has enough context, ready to recommend
  if (context.budget && (context.useCase || context.category)) {
    if (shouldTriggerRecommendations(message, context)) {
      return `Perfect! Based on your ${context.budget ? `$${context.budget} budget` : 'requirements'} for ${context.useCase || context.category}, I'm preparing some complete solutions for you. Each will include products, services, installation, and protection. One moment! ✨`
    }
  }

  // Need more info - ask about budget
  if (!context.budget && (context.useCase || context.category)) {
    return `Great! I can help you with ${context.useCase || context.category}. What's your budget range? This helps me find the best options for you.

For example: "Under $1500" or "Around $2000"`
  }

  // Need more info - ask about use case
  if (context.budget && !context.useCase && !context.category) {
    return `Perfect! I see you have a budget of $${context.budget}. What will you primarily use this for?

For example: "Video editing", "Gaming", "Work", "Student needs"`
  }

  // Need both budget and use case
  if (!context.budget && !context.useCase && !context.category) {
    if (lowerMessage.includes('laptop') || lowerMessage.includes('computer')) {
      return `I can help you find the perfect laptop! To give you the best recommendations, could you tell me:

1. What's your budget range?
2. What will you use it for? (video editing, gaming, work, etc.)`
    } else if (lowerMessage.includes('tv') || lowerMessage.includes('television')) {
      return `I can help you set up an amazing home theater! To get started:

1. What's your budget?
2. What size screen are you thinking?`
    } else {
      return `I'd love to help you! Could you tell me:

1. What type of tech are you looking for? (laptop, TV, phone, etc.)
2. What's your budget range?
3. What will you use it for?`
    }
  }

  // Ask for urgency if we have budget and use case
  if (context.budget && (context.useCase || context.category) && !context.urgency) {
    return `Excellent! I can find some great ${context.useCase || context.category} options within your $${context.budget} budget. When do you need this?

• Today (same-day pickup/delivery)
• This week
• I'm flexible`
  }

  // Default helpful response
  return `I'm here to help! Tell me what you're looking for, your budget, and when you need it, and I'll design a complete solution for you. 🎯`
}
