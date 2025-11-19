'use client'

import { Message } from '@/types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatTimestamp } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { User, Bot } from 'lucide-react'
import 'katex/dist/katex.min.css'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
          {message.imageUrl && (
            <img 
              src={message.imageUrl} 
              alt="Uploaded image" 
              className="max-w-full h-auto rounded-md mb-2"
            />
          )}
          
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            className="prose prose-sm max-w-none dark:prose-invert leading-relaxed"
          >
            {message.content}
          </ReactMarkdown>
        </div>
        
        <span className="text-xs text-muted-foreground tracking-tight">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  )
}