'use client'

import { useState, useEffect, useRef } from 'react'
import { useAgent } from '@/contexts/AgentContext'
import SolutionCard from '@/components/commerce/SolutionCard'
import agentService from '@/services/agent.service'

type Agent = 'shopping' | 'support' | 'geek-squad' | 'trade-in'

const AGENTS = {
  shopping: {
    name: 'Shopping Pro',
    icon: '🛍️',
    description: 'Find products and complete solutions',
    color: 'from-blue-500 to-blue-600'
  },
  support: {
    name: 'Support Pro',
    icon: '🎧',
    description: 'Get help with orders and products',
    color: 'from-green-500 to-green-600'
  },
  'geek-squad': {
    name: 'Geek Squad',
    icon: '🔧',
    description: 'Tech support and installation',
    color: 'from-orange-500 to-orange-600'
  },
  'trade-in': {
    name: 'Trade-In Pro',
    icon: '💰',
    description: 'Value your old devices',
    color: 'from-purple-500 to-purple-600'
  }
}

const QUICK_ACTIONS = [
  { icon: '📦', text: 'Track my order', prompt: 'Track my recent order' },
  { icon: '🎯', text: 'Find a laptop', prompt: 'I need a laptop' },
  { icon: '🏠', text: 'Home theater setup', prompt: 'Help me set up a home theater' },
  { icon: '🔧', text: 'Schedule installation', prompt: 'Schedule Geek Squad installation' },
  { icon: '💡', text: 'Smart home devices', prompt: 'Show me smart home solutions' },
  { icon: '🎮', text: 'Gaming setup', prompt: 'I want to build a gaming setup' },
]

export default function CommandCenter() {
  const { 
    messages, 
    addMessage, 
    currentBundles,
    setBundles,
    isLoading,
    setLoading,
    updateContext
  } = useAgent()
  
  const [input, setInput] = useState('')
  const [currentAgent, setCurrentAgent] = useState<Agent>('shopping')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentBundles])

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    addMessage({ role: 'user', content: userMessage })
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context: await agentService.processUserInput(userMessage),
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) throw new Error('Chat API failed')

      const data = await response.json()
      
      if (data.context) {
        updateContext(data.context)
      }

      addMessage({ 
        role: 'assistant', 
        content: data.response 
      })

      if (data.shouldGenerateRecommendations && data.context) {
        const bundles = await agentService.generateRecommendations(data.context)
        if (bundles.length > 0) {
          setBundles(bundles)
          setTimeout(() => {
            addMessage({ 
              role: 'assistant', 
              content: `I've prepared ${bundles.length} complete solution${bundles.length > 1 ? 's' : ''} for you 👇` 
            })
          }, 500)
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      addMessage({ 
        role: 'assistant', 
        content: "I'm having trouble processing that. Would you like to speak with a human expert? 📞" 
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <div className="flex-none bg-gray-800/50 backdrop-blur-xl border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bestbuy-blue to-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">BB</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Best Buy Command Center</h1>
              <p className="text-gray-400 text-xs">Powered by AI</p>
            </div>
          </div>
          
          {/* Agent Selector */}
          <div className="flex items-center space-x-2">
            {Object.entries(AGENTS).map(([key, agent]) => (
              <button
                key={key}
                onClick={() => setCurrentAgent(key as Agent)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentAgent === key
                    ? 'bg-gradient-to-r ' + agent.color + ' text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={agent.description}
              >
                <span className="mr-1">{agent.icon}</span>
                <span className="hidden sm:inline">{agent.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
              {/* Welcome */}
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  Welcome to Best Buy Command Center
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                  Your AI-powered tech concierge. Tell me what you need, and I'll design 
                  complete solutions with products, services, and installation.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="w-full max-w-2xl">
                <p className="text-sm text-gray-500 mb-3 font-semibold">Quick Actions</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {QUICK_ACTIONS.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl p-4 text-left transition-all group"
                    >
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white">
                        {action.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${AGENTS[currentAgent].color} flex items-center justify-center`}>
                        <span className="text-white text-sm">{AGENTS[currentAgent].icon}</span>
                      </div>
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-bestbuy-blue text-white' 
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${AGENTS[currentAgent].color} flex items-center justify-center`}>
                      <span className="text-white text-sm">{AGENTS[currentAgent].icon}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-gray-800/50 backdrop-blur-xl border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Best Buy Command Center..."
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 pr-28 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bestbuy-blue focus:border-transparent resize-none"
              rows={1}
              style={{ maxHeight: '200px' }}
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
                title="Voice input"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* Image Upload Button */}
              <button
                type="button"
                className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                title="Upload image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-bestbuy-blue text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Shift + Enter for new line</span>
              <button className="hover:text-gray-400 transition-colors">
                📞 Talk to a human
              </button>
            </div>
            <div>
              Powered by AI • Best Buy 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
