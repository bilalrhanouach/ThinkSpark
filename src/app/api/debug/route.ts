import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponseDebug } from '@/lib/debug-openai'

export async function POST(req: NextRequest) {
  try {
    console.log('🔧 Debug API route called')
    
    const body = await req.json()
    console.log('📝 Request body:', JSON.stringify(body, null, 2))
    
    // Simple test message
    const testMessages = [
      {
        role: 'user',
        content: 'Hello, can you help me with math?'
      }
    ]
    
    console.log('🧪 Testing with simple message...')
    const aiResponse = await generateAIResponseDebug(testMessages)
    console.log('✅ Got AI response:', aiResponse)

    return NextResponse.json({ 
      content: aiResponse,
      debug: {
        originalBody: body,
        testMessages: testMessages,
        apiKeyExists: !!process.env.GEMINI_API_KEY,
        apiKeyLength: process.env.GEMINI_API_KEY?.length || 0
      }
    })

  } catch (err: unknown) {
    console.error('❌ Debug API Error:', err)
    const details = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    return NextResponse.json(
      { 
        error: 'Debug API failed',
        details,
        stack
      },
      { status: 500 }
    )
  }
}