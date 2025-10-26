'use client'

import { useState, useEffect, useRef } from 'react'
import { useAgent } from '@/contexts/AgentContext'
import SolutionCard from '@/components/commerce/SolutionCard'
import agentService from '@/services/agent.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Minimize2, Maximize2, X, MessageCircle, Send, User, Bot, Sparkles } from 'lucide-react'

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
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    addMessage({ role: 'user', content: userMessage })
    setInput('')
    setLoading(true)

    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // Call the chat API for intelligent response and context extraction
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context,
          conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error('Chat API request failed')
      }

      const data = await response.json()

      // Update context from API response
      updateContext(data.context)

      addMessage({
        role: 'assistant',
        content: data.response,
        isCard: true
      })

      // Generate recommendations if API indicates we should
      if (data.shouldGenerateRecommendations) {
        const bundles = await agentService.generateRecommendations(data.context)

        if (bundles.length > 0) {
          setBundles(bundles)
          setTimeout(() => {
            addMessage({
              role: 'assistant',
              content: `I've prepared ${bundles.length} complete solution${bundles.length > 1 ? 's' : ''} for you below. Each includes hardware, services, installation, and protection. Take a look! 👇`,
              isCard: true
            })
          }, 1000)
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
        content: response,
        isCard: true
      })

      // Generate recommendations if we have enough context
      if (hasContext && requestsRecommendation) {
        const bundles = await agentService.generateRecommendations(updatedContext)

        if (bundles.length > 0) {
          setBundles(bundles)
          setTimeout(() => {
            addMessage({
              role: 'assistant',
              content: `I've prepared ${bundles.length} complete solution${bundles.length > 1 ? 's' : ''} for you below. Each includes hardware, services, installation, and protection. Take a look! 👇`,
              isCard: true
            })
          }, 1000)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePromptClick = (promptText: string) => {
    // Directly submit the prompt instead of just setting input
    addMessage({ role: 'user', content: promptText })
    setLoading(true)

    // Trigger the same submission logic
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
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
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-bestbuy-blue rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-bestbuy-blue text-white ml-auto'
                          : message.isCard
                          ? 'bg-white border border-gray-200 shadow-sm'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-bestbuy-blue rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-bestbuy-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Solution Bundles */}
              {currentBundles.length > 0 && (
                <div className="space-y-4">
                  {currentBundles.map((bundle) => (
                    <div key={bundle.id} className="scale-75 origin-top-left">
                      <SolutionCard bundle={bundle} />
                    </div>
                  ))}
                </div>
              )}

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