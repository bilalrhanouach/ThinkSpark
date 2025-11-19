'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Lightbulb } from 'lucide-react'
import { convertImageToBase64 } from '@/lib/utils'

interface ChatInputProps {
  onSendMessage: (content: string, imageUrl?: string) => void
  onRequestHint: () => void
  isTyping: boolean
  disabled?: boolean
}

export function ChatInput({ onSendMessage, onRequestHint, isTyping, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!input.trim() || isTyping || disabled) return
    
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB')
      return
    }

    setIsUploading(true)

    try {
      const base64 = await convertImageToBase64(file)
      onSendMessage(input.trim() || 'Please help me solve this problem from the image.', base64)
      setInput('')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const isDisabled = isTyping || disabled || isUploading

  return (
    <div className="border-t bg-background p-4">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isUploading ? "Uploading image..." : "Type your homework question or upload an image..."}
            disabled={isDisabled}
            className="pr-12"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isDisabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent rounded-md transition-colors disabled:opacity-50"
            title="Upload image"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <Button
          onClick={onRequestHint}
          variant="outline"
          size="icon"
          disabled={isDisabled}
          title="Give me a hint"
        >
          <Lightbulb className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isDisabled || !input.trim()}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}