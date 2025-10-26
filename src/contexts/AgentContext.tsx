'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { AgentContext as AgentContextType, AgentMessage, SolutionBundle } from '@/types/agent'

interface AgentState {
  isOpen: boolean
  messages: AgentMessage[]
  context: AgentContextType
  currentBundles: SolutionBundle[]
  isLoading: boolean
  pendingInput: string
}

interface AgentContextValue extends AgentState {
  openAgent: () => void
  openAgentWithMessage: (message: string) => void
  closeAgent: () => void
  addMessage: (message: Omit<AgentMessage, 'id' | 'timestamp'>) => void
  updateContext: (updates: Partial<AgentContextType>) => void
  setBundles: (bundles: SolutionBundle[]) => void
  setLoading: (loading: boolean) => void
  setInputMessage: (message: string) => void
  clearConversation: () => void
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined)

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AgentState>({
    isOpen: false,
    messages: [],
    context: {},
    currentBundles: [],
    isLoading: false,
    pendingInput: '',
  })

  const openAgent = () => {
    setState(prev => ({ ...prev, isOpen: true }))
  }

  const openAgentWithMessage = (message: string) => {
    setState(prev => ({ ...prev, isOpen: true, pendingInput: message }))
  }

  const setInputMessage = (message: string) => {
    setState(prev => ({ ...prev, pendingInput: message }))
  }

  const closeAgent = () => {
    setState(prev => ({ ...prev, isOpen: false }))
  }

  const addMessage = (message: Omit<AgentMessage, 'id' | 'timestamp'>) => {
    const newMessage: AgentMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
  }

  const updateContext = (updates: Partial<AgentContextType>) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, ...updates },
    }))
  }

  const setBundles = (bundles: SolutionBundle[]) => {
    setState(prev => ({ ...prev, currentBundles: bundles }))
  }

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }))
  }

  const clearConversation = () => {
    setState(prev => ({
      ...prev,
      messages: [],
      currentBundles: [],
      context: {},
    }))
  }

  return (
    <AgentContext.Provider
      value={{
        ...state,
        openAgent,
        openAgentWithMessage,
        closeAgent,
        addMessage,
        updateContext,
        setBundles,
        setLoading,
        setInputMessage,
        clearConversation,
      }}
    >
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider')
  }
  return context
}
