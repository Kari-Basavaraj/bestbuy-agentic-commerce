'use client'

import { useEffect } from 'react'
import { useAgent } from '@/contexts/AgentContext'

export default function GlobalKeyboardShortcuts() {
  const { openAgent, isOpen } = useAgent()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to open agent
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          openAgent()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openAgent, isOpen])

  return null
}
