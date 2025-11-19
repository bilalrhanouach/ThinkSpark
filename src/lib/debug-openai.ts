import { generateAIResponse } from './openai'
import type { OpenAIMessage } from '@/types'

// Simple debug wrapper to reuse the main generation pipeline
export async function generateAIResponseDebug(messages: OpenAIMessage[] | any[]): Promise<string> {
  // If messages are not strictly typed, pass through to main generator
  return generateAIResponse(messages as OpenAIMessage[])
}
