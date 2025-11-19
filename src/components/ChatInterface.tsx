'use client'

import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageBubble } from '@/components/MessageBubble'
import { TypingIndicator } from '@/components/TypingIndicator'
import { ChatInput } from '@/components/ChatInput'
import { useChat } from '@/hooks/useChat'
import { useConfetti } from '@/hooks/useConfetti'
import { FeaturesBento } from '@/components/FeaturesBento'

export function ChatInterface() {
  const { session, sendMessage, requestHint, isTyping } = useChat()
  const { celebrate } = useConfetti()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session.messages, isTyping])

  // Check for success patterns in AI responses to trigger celebration
  useEffect(() => {
    const lastMessage = session.messages[session.messages.length - 1]
    if (lastMessage?.role === 'assistant') {
      const successPatterns = [
        /excellent!?/i,
        /great job!?/i,
        /well done!?/i,
        /perfect!?/i,
        /correct!?/i,
        /you.?ve got it!?/i,
        /you solved it!?/i,
        /congratulations!?/i,
      ]
      
      if (successPatterns.some(pattern => pattern.test(lastMessage.content))) {
        setTimeout(celebrate, 500)
      }
    }
  }, [session.messages, celebrate])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full border border-zinc-200 dark:border-white/10 bg-background flex items-center justify-center">
              <span className="text-foreground font-semibold text-sm tracking-tight">TS</span>
            </div>
            <div>
              <h1 className="font-semibold tracking-tight">ThinkSpark</h1>
              <p className="text-xs text-muted-foreground">Your AI Tutor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="container max-w-4xl mx-auto p-4">
          {session.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6">
              <div className="h-16 w-16 rounded-full border border-zinc-200 dark:border-white/10 bg-background flex items-center justify-center mb-4">
                <span className="text-foreground font-semibold text-xl tracking-tight">TS</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight mb-2">Welcome to ThinkSpark!</h2>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                I'm your AI tutor. I won't give you answers directly, but I'll guide you 
                to discover the solution yourself. Ready to learn?
              </p>
              <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                <p>💡 Ask me a homework question</p>
                <p>📸 Upload a photo of your problem</p>
                <p>🧠 I'll help you think through it step by step</p>
              </div>
              <div className="w-full max-w-3xl">
                <FeaturesBento />
              </div>
            </div>
          ) : (
            <>
              {session.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && <TypingIndicator />}
            </>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={sendMessage}
        onRequestHint={requestHint}
        isTyping={isTyping}
      />
    </div>
  )
}