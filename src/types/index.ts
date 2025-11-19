// Message Type
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string; // Optional base64 string
  timestamp: number;
};

// Chat Session State
export type ChatSession = {
  messages: Message[];
  isTyping: boolean; // For loading states
};

// OpenAI API Types
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id?: string;
          title?: string;
          messages: Message[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          title?: string;
          messages: Message[];
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          title?: string;
          messages?: Message[];
        };
      };
    };
  };
}