'use client'

import { useState, useEffect, useRef } from 'react'
import { useAgent } from '@/contexts/AgentContext'
import ChatMessage from './ChatMessage'
import agentService from '@/services/agent.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Minimize2, Maximize2, X, MessageCircle, Send, User, Bot, Sparkles, Mic, MicOff, Lightbulb, TrendingUp, Clock, ShoppingCart, Package, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { SolutionBundle } from '@/types/agent'

const quickPrompts = [
  { id: '1', text: "I need a laptop for video editing under $2000", icon: "💻", category: 'laptop' },
  { id: '2', text: "Set up a home theater system", icon: "🎬", category: 'tv' },
  { id: '3', text: "Gaming PC setup under $1500", icon: "🎮", category: 'gaming' },
  { id: '4', text: "Work from home office setup", icon: "💼", category: 'office' },
  { id: '5', text: "Help me choose the right TV", icon: "📺", category: 'tv' },
  { id: '6', text: "Upgrade my aging laptop", icon: "⚡", category: 'laptop' }
]

export default function FloatingChatWindow() {
  const {
    isOpen,
    openAgent,
    closeAgent,
    messages,
    addMessage,
    currentBundles,
    setBundles,
    isLoading,
    setLoading,
    updateContext,
    pendingInput,
    setInputMessage,
    context
  } = useAgent()

  const [input, setInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Auto-scroll to latest message
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, currentBundles, isMinimized])

  // Handle pending input from context
  useEffect(() => {
    if (pendingInput && isOpen && !isMinimized) {
      setInput(pendingInput)
      setInputMessage('') // Clear it from context
    }
  }, [pendingInput, isOpen, isMinimized, setInputMessage])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        closeAgent()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeAgent])

  // Generate context-aware suggestions
  useEffect(() => {
    if (context && context.useCase) {
      const newSuggestions = generateSuggestions(context)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [context])

  // Typing indicator
  useEffect(() => {
    if (isLoading) {
      setIsTyping(true)
      const typingInterval = setInterval(() => {
        // Typing animation handled in UI
      }, 500)

      return () => {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }
  }, [isLoading])

  // Generate smart suggestions based on context
  const generateSuggestions = (ctx: any): string[] => {
    const suggestions: string[] = []

    if (ctx.useCase === 'gaming') {
      suggestions.push('What refresh rate do you need?', 'What games do you play?', 'Do you need peripherals?')
    } else if (ctx.useCase === 'video-editing') {
      suggestions.push('What camera do you use?', 'What resolution do you edit in?', 'Do you need color accuracy?')
    } else if (ctx.useCase === 'work') {
      suggestions.push('What software do you use?', 'Do you travel often?', 'Do you need multiple monitors?')
    } else if (ctx.category === 'laptops') {
      suggestions.push('What screen size do you prefer?', 'How much storage do you need?', 'Battery life important?')
    } else if (ctx.category === 'tvs') {
      suggestions.push('What room size?', 'Do you stream 4K content?', 'Sound system needed?')
    } else if (ctx.budget && ctx.budget < 1000) {
      suggestions.push('Are you open to refurbished?', 'Would you consider previous generation?')
    } else if (ctx.budget && ctx.budget > 2000) {
      suggestions.push('Want premium features?', 'Need professional-grade performance?')
    }

    return suggestions.slice(0, 3) // Limit to 3 suggestions
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    addMessage({ role: 'user', content: userMessage })
    setInput('')
    setLoading(true)

    try {
      // Process user input to extract context
      const updatedContext = await agentService.processUserInput(userMessage)
      updateContext(updatedContext)

      // Analyze intent and generate appropriate response
      const lowerMessage = userMessage.toLowerCase()
      const isGreeting = lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')
      const askingForHelp = lowerMessage.includes('help') || lowerMessage.includes('need') || lowerMessage.includes('looking for')
      const askingAboutBudget = lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')
      const askingAboutCategory = lowerMessage.includes('laptop') || lowerMessage.includes('tv') || lowerMessage.includes('gaming') || lowerMessage.includes('camera')
      
      // Generate multimodal response based on intent
      if (isGreeting) {
        addMessage({
          role: 'assistant',
          content: '👋 Hi! I\'m your Tech Pro from Best Buy. I\'m here to help you find the perfect tech solution!',
          cards: [
            {
              id: 'welcome-card',
              type: 'info',
              title: 'How Can I Help You Today?',
              subtitle: 'I can assist with complete solutions including:',
              highlights: [
                'Finding the right products for your needs',
                'Setting up complete bundles with services',
                'Installation and protection plans',
                'Comparing different options',
                'Finding the best deals and member benefits'
              ],
              cta: {
                label: 'Get Started',
                action: 'get-started'
              }
            }
          ],
          actions: [
            { id: 'laptop', label: '💻 Laptops', action: 'filter-products', data: { category: 'laptops' } },
            { id: 'tv', label: '📺 TVs & Home Theater', action: 'filter-products', data: { category: 'tvs' } },
            { id: 'gaming', label: '🎮 Gaming', action: 'filter-products', data: { category: 'gaming' } },
            { id: 'office', label: '💼 Home Office', action: 'filter-products', data: { category: 'office' } }
          ],
        })
      } else if (askingAboutBudget) {
        addMessage({
          role: 'assistant',
          content: '💰 Let\'s work within your budget to find the best value!',
          cards: [
            {
              id: 'budget-card',
              type: 'info',
              title: 'Select Your Budget Range',
              subtitle: 'I\'ll find solutions that fit your price range',
              content: 'Choose a budget range and I\'ll show you the best options with maximum value, including any current deals or member savings.'
            }
          ],
          actions: [
            { id: 'budget-1', label: 'Under $500', action: 'change-budget', data: { budget: 500 } },
            { id: 'budget-2', label: '$500 - $1000', action: 'change-budget', data: { budget: 1000 } },
            { id: 'budget-3', label: '$1000 - $2000', action: 'change-budget', data: { budget: 2000 } },
            { id: 'budget-4', label: '$2000+', action: 'change-budget', data: { budget: 3000 } }
          ],
        })
      } else if (askingAboutCategory || (updatedContext.category && askingForHelp)) {
        // Generate recommendations with multimodal cards
        const bundles = await agentService.generateRecommendations(updatedContext)
        
        if (bundles.length > 0) {
          setBundles(bundles)
          
          // Create recommendation cards
          const recommendationCards = bundles.slice(0, 2).map((bundle, index) => ({
            id: `rec-${bundle.id}`,
            type: 'recommendation' as const,
            title: bundle.name,
            subtitle: `${bundle.products.length} products • ${bundle.services.length} services`,
            content: bundle.description,
            pricing: {
              current: bundle.totalPrice.oneTime,
              isMonthly: bundle.totalPrice.monthly > 0
            },
            highlights: [
              bundle.whyThisPick || 'Perfect for your needs',
              `Ready in ${bundle.fulfillment[0]?.available || 'store'}`,
              bundle.savingsAmount ? `Save $${bundle.savingsAmount}` : 'Best value'
            ],
            badge: index === 0 ? 'Top Pick' : 'Great Value',
            badgeColor: index === 0 ? 'yellow' : undefined,
            cta: {
              label: 'View Details',
              action: 'view-bundle',
              variant: 'default' as const
            },
            metadata: { bundleId: bundle.id }
          }))
          
          addMessage({
            role: 'assistant',
            content: `🎯 Based on your needs, I've found ${bundles.length} perfect solutions for you!`,
            cards: recommendationCards,
            })
          
          // Add the full bundle details in a separate message
          setTimeout(() => {
            bundles.forEach((bundle, index) => {
              addMessage({
                role: 'assistant',
                content: index === 0 ? '📦 Here are the complete solution details:' : '',
                bundle
              })
            })
          }, 500)
        }
      } else {
        // Default contextual response
        const hasContext = !!(updatedContext.budget || updatedContext.useCase || updatedContext.category)
        
        if (!hasContext) {
          addMessage({
            role: 'assistant',
            content: 'I\'d love to help you find the perfect solution! To get started, could you tell me:',
            cards: [
              {
                id: 'context-gathering',
                type: 'info',
                title: 'Let\'s Find Your Perfect Setup',
                subtitle: 'A few quick questions to personalize your recommendations',
                highlights: [
                  'What will you primarily use it for?',
                  'What\'s your budget range?',
                  'When do you need it by?',
                  'Any specific features you need?'
                ]
              }
            ],
            actions: [
              { id: 'work', label: '💼 Work', action: 'ask-question', data: { question: 'I need a setup for work from home' } },
              { id: 'gaming', label: '🎮 Gaming', action: 'ask-question', data: { question: 'I want a gaming setup' } },
              { id: 'creative', label: '🎨 Creative', action: 'ask-question', data: { question: 'I do video editing and design' } },
              { id: 'general', label: '🏠 General Use', action: 'ask-question', data: { question: 'I need something for everyday use' } }
            ],
            })
        } else {
          // Generate contextual follow-up
          generateRecommendations()
        }
      }
    } catch (error) {
      console.error('Chat error:', error)

      // Fallback to simple context extraction and response
      const updatedContext = await agentService.processUserInput(userMessage)
      updateContext(updatedContext)

      // Simple fallback responses
      const lowerMessage = userMessage.toLowerCase()
      const hasContext = !!(updatedContext.budget || updatedContext.useCase || updatedContext.category)
      const requestsRecommendation =
        lowerMessage.includes('need') ||
        lowerMessage.includes('want') ||
        lowerMessage.includes('looking for') ||
        lowerMessage.includes('show me') ||
        lowerMessage.includes('find') ||
        lowerMessage.includes('recommend')

      let response = ''
      if (!hasContext) {
        response = "I'd love to help! To find the perfect solution, could you tell me:\n\n1. What's your budget range?\n2. What will you use it for?\n3. When do you need it?"
      } else if (!requestsRecommendation) {
        response = "Great! Tell me more about what you need, and I'll find some perfect solutions for you."
      } else {
        response = "Perfect! Let me find some great options for you."
      }

      addMessage({
        role: 'assistant',
        content: response
      })

      // Generate recommendations if we have enough context
      if (hasContext && requestsRecommendation) {
        const bundles = await agentService.generateRecommendations(updatedContext)

        if (bundles.length > 0) {
          setBundles(bundles)
          setTimeout(() => {
            addMessage({
              role: 'assistant',
              content: `I've prepared ${bundles.length} complete solution${bundles.length > 1 ? 's' : ''} for you below. Each includes hardware, services, installation, and protection. Take a look! 👇`
            })
          }, 1000)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePromptClick = (promptText: string) => {
    setInput(promptText)
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
  }

  // Handle card actions from multimodal messages
  const handleActionClick = (action: any) => {
    console.log('Action clicked:', action)
    
    switch (action.action) {
      case 'ask-question':
        setInput(action.data?.question || '')
        break
      case 'filter-products':
        updateContext({ ...context, category: action.data?.category })
        generateRecommendations()
        break
      case 'change-budget':
        updateContext({ ...context, budget: action.data?.budget })
        generateRecommendations()
        break
      case 'view-product':
        router.push(`/products/${action.data?.sku}`)
        break
      case 'compare-products':
        router.push(`/compare?items=${action.data?.skus?.join(',')}`)
        break
      case 'schedule-installation':
        router.push('/services/installation')
        break
      case 'talk-to-expert':
        window.open('tel:1-888-BESTBUY', '_self')
        break
      default:
        console.log('Unhandled action:', action.action)
    }
  }

  // Handle bundle actions
  const handleBundleAction = (bundle: SolutionBundle, action: string) => {
    console.log('Bundle action:', action, bundle)
    
    switch (action) {
      case 'add-to-cart':
        // Add all bundle items to cart
        bundle.products.forEach(product => {
          // Add to cart logic
          console.log('Adding to cart:', product)
        })
        bundle.services.forEach(service => {
          // Add services to cart
          console.log('Adding service:', service)
        })
        
        // Show confirmation
        addMessage({
          role: 'assistant',
          content: '✅ Great choice! I\'ve added your complete solution to the cart.',
          cards: [
            {
              id: 'cart-confirmation',
              type: 'info',
              title: 'Added to Cart',
              content: `${bundle.name} has been added to your cart with all products, services, and protection plans.`,
              highlights: [
                `${bundle.products.length} products`,
                `${bundle.services.length} services & protection plans`,
                `Total: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bundle.totalPrice.oneTime)}`
              ],
              cta: {
                label: 'View Cart',
                action: 'view-cart'
              }
            }
          ]
        })
        break
        
      case 'view-details':
        router.push(`/solutions/${bundle.id}`)
        break
        
      case 'customize':
        // Open customization modal
        console.log('Customize bundle:', bundle)
        break
        
      default:
        console.log('Unhandled bundle action:', action)
    }
  }

  // Generate recommendations helper
  const generateRecommendations = async () => {
    setLoading(true)
    try {
      const bundles = await agentService.generateRecommendations(context)
      if (bundles.length > 0) {
        setBundles(bundles)
        
        // Add message with bundles
        const bundleMessages = bundles.map((bundle, index) => ({
          id: `bundle-${Date.now()}-${index}`,
          role: 'assistant' as const,
          content: index === 0 ? '🎯 Based on your needs, here are my top recommendations:' : '',
          bundle,
        }))
        
        bundleMessages.forEach(msg => addMessage(msg))
      }
    } catch (error) {
      console.error('Error generating recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      // Floating chat button with hover animation
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={openAgent}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative bg-bestbuy-blue hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle
            className={`w-6 h-6 transition-transform duration-300 ${isHovering ? 'scale-110' : 'scale-100'}`}
          />
          <Sparkles
            className={`absolute -top-1 -right-1 w-4 h-4 text-bestbuy-yellow transition-all duration-300 ${isHovering ? 'scale-125 rotate-12' : 'scale-100'}`}
          />
          <div className={`absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
            Talk to My Tech Pro
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[95vw]">
      <Card className="shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white p-4 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">My Tech Pro</CardTitle>
              <CardDescription className="text-blue-100 text-xs">Your personal AI concierge</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeAgent}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-bestbuy-dark mb-2">
                    Hi! I'm your Tech Pro
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Tell me what you need, and I'll design a complete solution with
                    products, services, installation, and protection.
                  </p>

                  {/* Quick Prompts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-sm mx-auto">
                    {quickPrompts.slice(0, 6).map((prompt) => (
                      <Button
                        key={prompt.id}
                        variant="outline"
                        onClick={() => handlePromptClick(prompt.text)}
                        className="flex items-center gap-2 px-3 py-2 h-auto justify-start text-xs border-bestbuy-blue text-bestbuy-blue hover:bg-bestbuy-blue hover:text-white"
                      >
                        <span className="text-lg">{prompt.icon}</span>
                        <span className="truncate">{prompt.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onActionClick={handleActionClick}
                  onBundleAction={handleBundleAction}
                />
              ))}

              {/* Enhanced Loading/Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-bestbuy-blue rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 bg-bestbuy-blue rounded-full transition-all duration-300 ${isTyping ? 'animate-pulse' : ''}`} />
                          <div className={`w-2 h-2 bg-bestbuy-blue rounded-full transition-all duration-300 ${isTyping ? 'animate-pulse' : ''}`} style={{ animationDelay: '150ms' }} />
                          <div className={`w-2 h-2 bg-bestbuy-blue rounded-full transition-all duration-300 ${isTyping ? 'animate-pulse' : ''}`} style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-gray-500 italic">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Smart Suggestions */}
              {showSuggestions && !isLoading && suggestions.length > 0 && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-bestbuy-blue rounded-full flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 shadow-sm">
                      <p className="text-xs font-medium text-blue-900 mb-2">Quick questions:</p>
                      <div className="space-y-1">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInput(suggestion)}
                            className="block w-full text-left text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Solution bundles are now rendered within ChatMessage components */}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <Separator />
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me what you need..."
                  className="flex-1 focus:ring-bestbuy-blue"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-bestbuy-blue hover:bg-blue-700"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* Human Escalation */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <Separator className="flex-1" />
                <Button
                  variant="ghost"
                  className="text-xs text-gray-600 hover:text-bestbuy-blue h-auto p-2"
                >
                  <span className="mr-1">📞</span>
                  Prefer a human? Talk to a Blue Shirt
                </Button>
                <Separator className="flex-1" />
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}