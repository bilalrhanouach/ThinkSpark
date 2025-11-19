import { GoogleGenerativeAI } from '@google/generative-ai'
import type { OpenAIMessage } from '@/types'

const GEMINI_KEY = process.env.GEMINI_API_KEY
const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null as any

// Try multiple models with fallback and simple backoff on overload/quota
const MODEL_CANDIDATES = [
  'models/gemini-2.0-flash-exp', // fast experimental
  'models/gemini-2.5-flash',     // fast (may overload)
]

async function generateWithFallback(prompt: string | (string | any)[]) {
  let lastError: any
  const isArray = Array.isArray(prompt)

  for (let i = 0; i < MODEL_CANDIDATES.length; i++) {
    const modelName = MODEL_CANDIDATES[i]
    try {
      if (!genAI) {
        throw new Error('Missing GEMINI_API_KEY. Please set it in .env.local and restart the server.')
      }
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = isArray ? await model.generateContent(prompt as any) : await model.generateContent(prompt as string)
      const response = await result.response
      const text = response.text()
      if (text) return text
    } catch (err: any) {
      lastError = err
      const message = String(err?.message || '')
      // Backoff on transient errors
      if (message.includes('503') || message.includes('overloaded') || message.includes('quota') || message.includes('429')) {
        // brief wait before next model
        await new Promise(r => setTimeout(r, 600))
        continue
      }
      // Non-retryable, break
      break
    }
  }
  throw lastError || new Error('Failed to generate with all models')
}

export const SYSTEM_PROMPT = `You are ThinkSpark, a Socratic AI Tutor.

**YOUR PRIME DIRECTIVE:** You must NEVER provide the final answer or the full solution to a problem. If you do, you fail.

**PROTOCOL:**
1. **Analyze:** Read the user's text or image. Solve the problem internally.
2. **Identify the Gap:** Find the very first step the user needs to take.
3. **Question:** Ask a short, clear question to guide the user to that first step.
4. **Tone:** Friendly, encouraging, concise. Act like a patient older sibling.
5. **Math Formatting:** Use LaTeX syntax for all math expressions (wrapped in double dollar signs $$ for block or single $ for inline).

**EXAMPLE INTERACTION:**
User: 'What is 2x + 5 = 15?'
BAD Response: 'Subtract 5 from both sides to get 2x=10, then divide by 2. The answer is 5.'
GOOD Response: 'Let's break this down. To get x by itself, what is the first number we need to move away from the left side?'

**WHEN USER IS STUCK:**
If explicitly told the user is stuck, provide a slightly more obvious hint, but still do not reveal the answer.

Remember: Your goal is to help students LEARN by thinking, not to give them answers to copy.`

export async function generateAIResponse(messages: OpenAIMessage[]): Promise<string> {
  try {
    // Convert messages to Gemini format
    const geminiMessages = messages.map(msg => {
      if (typeof msg.content === 'string') {
        return `${msg.role}: ${msg.content}`
      }
      // Handle content arrays (for images)
      const textParts = msg.content.filter(part => part.type === 'text').map(part => part.text).join(' ')
      return `${msg.role}: ${textParts}`
    }).join('\n')

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${geminiMessages}\n\nAssistant:`

    const text = await generateWithFallback(prompt)
    return text || "I'm sorry, I couldn't generate a response. Please try again."
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate AI response')
  }
}

export async function generateAIResponseWithImage(
  textContent: string,
  imageBase64: string,
  previousMessages: OpenAIMessage[] = []
): Promise<string> {
  try {
    // Convert previous messages to text format
    const conversationHistory = previousMessages.map(msg => {
      if (typeof msg.content === 'string') {
        return `${msg.role}: ${msg.content}`
      }
      const textParts = msg.content.filter(part => part.type === 'text').map(part => part.text).join(' ')
      return `${msg.role}: ${textParts}`
    }).join('\n')

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversationHistory}\n\nUser: ${textContent}\n\nPlease analyze the image and respond according to your role as ThinkSpark.`

    // Convert base64 image to the format Gemini expects
    const imageData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
    
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: 'image/jpeg'
      }
    }

    const text = await generateWithFallback([prompt, imagePart])
    return text || "I'm sorry, I couldn't analyze the image. Please try again."
  } catch (error) {
    console.error('Gemini API error with image:', error)
    throw new Error('Failed to analyze image')
  }
}