'use client'

import { useState, useEffect, useRef } from 'react'
import { useAgent } from '@/contexts/AgentContext'
import SolutionCard from '@/components/commerce/SolutionCard'
import agentService from '@/services/agent.service'

export default function AgentDrawer() {
  const {
    isOpen,
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentBundles])

  // Handle pending input from context
  useEffect(() => {
    if (pendingInput && isOpen) {
      setInput(pendingInput)
      setInputMessage('') // Clear it from context
    }
  }, [pendingInput, isOpen, setInputMessage])

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
        content: data.response
      })

      // Generate recommendations if API indicates we should
      if (data.shouldGenerateRecommendations) {
        const bundles = await agentService.generateRecommendations(data.context)

        if (bundles.length > 0) {
          setBundles(bundles)
          setTimeout(() => {
            addMessage({
              role: 'assistant',
              content: `I've prepared ${bundles.length} complete solution${bundles.length > 1 ? 's' : ''} for you below. Each includes hardware, services, installation, and protection. Take a look! 👇`
            })
          }, 1000)
        } else {
          setTimeout(() => {
            addMessage({
              role: 'assistant',
              content: "I couldn't find exact matches. Would you like to talk to a Blue Shirt expert?"
            })
          }, 500)
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          closeAgent()
        }}
        role="button"
        aria-label="Close drawer"
      />

      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl z-50 transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">My Tech Pro</h2>
              <p className="text-blue-100 text-sm">Your personal AI concierge</p>
            </div>
            <button 
              onClick={closeAgent}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close agent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-bestbuy-dark mb-2">
                  Hi! I'm your Tech Pro
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Tell me what you need, and I'll design a complete solution with 
                  products, services, installation, and protection.
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-gray-500 font-semibold">Try asking:</p>
                  <button 
                    onClick={() => setInput("I need a laptop for video editing under $2000")}
                    className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-bestbuy-blue transition-colors"
                  >
                    "I need a laptop for video editing under $2000"
                  </button>
                  <button 
                    onClick={() => setInput("Help me set up a home theater")}
                    className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-bestbuy-blue transition-colors"
                  >
                    "Help me set up a home theater"
                  </button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-bestbuy-blue text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Solution Bundles */}
            {currentBundles.length > 0 && (
              <div className="space-y-4 pt-4">
                {currentBundles.map((bundle) => (
                  <SolutionCard key={bundle.id} bundle={bundle} />
                ))}
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me what you need..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-bestbuy-blue focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-bestbuy-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
            <button className="w-full mt-3 text-sm text-gray-600 hover:text-bestbuy-blue transition-colors flex items-center justify-center gap-2">
              <span>📞</span>
              <span>Prefer a human? Talk to a Blue Shirt now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
