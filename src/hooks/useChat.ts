'use client'

import { useState, useCallback, useEffect } from 'react'
import { Message, ChatSession } from '@/types'
import { generateId } from '@/lib/utils'

const STORAGE_KEY = 'thinkspark_chat_session'

export function useChat() {
  const [session, setSession] = useState<ChatSession>({
    messages: [],
    isTyping: false,
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsedSession = JSON.parse(saved)
        setSession(parsedSession)
      } catch (error) {
        console.error('Failed to parse saved chat session:', error)
      }
    }
  }, [])

  // Save to localStorage whenever session changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  }, [session])

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      timestamp: Date.now(),
    }

    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))

    return newMessage
  }, [])

  const setTyping = useCallback((isTyping: boolean) => {
    setSession(prev => ({
      ...prev,
      isTyping,
    }))
  }, [])

  const clearChat = useCallback(() => {
    setSession({
      messages: [],
      isTyping: false,
    })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const sendMessage = useCallback(async (content: string, imageUrl?: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
      imageUrl,
    })

    setTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: session.messages,
          newMessage: { content, imageUrl },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      // Add AI response
      addMessage({
        role: 'assistant',
        content: data.content,
      })
    } catch (error) {
      console.error('Error sending message:', error)
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
      })
    } finally {
      setTyping(false)
    }
  }, [session.messages, addMessage, setTyping])

  const requestHint = useCallback(async () => {
    if (session.messages.length === 0) return

    setTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: session.messages,
          requestHint: true,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get hint')
      }

      const data = await response.json()
      
      // Add AI hint response
      addMessage({
        role: 'assistant',
        content: data.content,
      })
    } catch (error) {
      console.error('Error requesting hint:', error)
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I couldn't provide a hint right now. Please try again.",
      })
    } finally {
      setTyping(false)
    }
  }, [session.messages, addMessage, setTyping])

  return {
    session,
    sendMessage,
    requestHint,
    clearChat,
    isTyping: session.isTyping,
  }
}