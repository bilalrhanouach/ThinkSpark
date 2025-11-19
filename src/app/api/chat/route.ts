import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse, generateAIResponseWithImage } from '@/lib/openai'
import { Message, OpenAIMessage } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, newMessage, requestHint } = body

    // Convert our message format to OpenAI format
    const openAIMessages: OpenAIMessage[] = messages.map((msg: Message) => {
      if (msg.imageUrl) {
        return {
          role: msg.role,
          content: [
            { type: 'text', text: msg.content },
            { type: 'image_url', image_url: { url: msg.imageUrl } }
          ]
        }
      }
      return {
        role: msg.role,
        content: msg.content
      }
    })

    let aiResponse: string

    if (requestHint) {
      // Add a system message indicating the user is stuck
      const hintMessages: OpenAIMessage[] = [
        ...openAIMessages,
        {
          role: 'system',
          content: 'The user is stuck and has requested a hint. Provide a slightly more obvious hint, but still do not reveal the answer. Guide them to the next logical step.'
        }
      ]
      aiResponse = await generateAIResponse(hintMessages)
    } else if (newMessage?.imageUrl) {
      // Handle image message
      aiResponse = await generateAIResponseWithImage(
        newMessage.content,
        newMessage.imageUrl,
        openAIMessages
      )
    } else {
      // Add the new text message
      if (newMessage) {
        openAIMessages.push({
          role: 'user',
          content: newMessage.content
        })
      }
      aiResponse = await generateAIResponse(openAIMessages)
    }

    return NextResponse.json({ content: aiResponse })

  } catch (error: any) {
    console.error('API Error:', error)
    // Return a friendly message instead of 500 so the UI shows guidance
    return NextResponse.json(
      { content: "I'm having trouble reaching the AI service right now. Please wait a moment and try again. If this keeps happening, we might be hitting usage limits." },
      { status: 200 }
    )
  }
}