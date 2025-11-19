# ThinkSpark - AI Tutor MVP

An educational web app that helps students solve homework problems using the Socratic method. ThinkSpark never provides direct answers but guides students through questions to help them discover solutions themselves.

## Features

- 🧠 **Socratic Method AI Tutoring** - Guides students with questions instead of giving answers
- 📱 **Mobile Responsive PWA** - Works seamlessly on desktop and mobile devices
- 📸 **Image Upload Support** - Students can upload photos of homework problems
- 💬 **Real-time Chat Interface** - Intuitive conversation flow with math equation rendering
- 🎉 **Success Celebrations** - Confetti animations when students solve problems
- 💡 **Hint System** - "Give me a hint" button for when students get stuck
- 🔄 **Persistent Sessions** - Chat history saved in localStorage
- ✨ **LaTeX Math Rendering** - Beautiful mathematical equation display

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Provider**: OpenAI API (GPT-4o)
- **Math Rendering**: KaTeX with react-markdown
- **State Management**: React hooks
- **Persistence**: LocalStorage (MVP) + Supabase (future)

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key
- Supabase project (optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd ThinkSpark
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.local` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## How It Works

1. **Student Input**: Students type homework questions or upload images
2. **AI Analysis**: GPT-4o analyzes the problem internally 
3. **Socratic Response**: AI responds with guiding questions, never direct answers
4. **Learning Loop**: Student attempts answers, AI validates and guides next steps
5. **Success**: When solved, celebration animation plays

## Core Principles

- **Never give direct answers** - Always guide with questions
- **Encourage thinking** - Help students discover solutions themselves  
- **Be patient and supportive** - Like a helpful older sibling
- **Use proper math formatting** - LaTeX for clear equations

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx
│   ├── ChatInput.tsx
│   └── MessageBubble.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── globals.css         # Global styles
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Optional |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Optional |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Optional |

## Contributing

This is an MVP version focusing on core functionality. Future enhancements may include:

- User authentication
- Session persistence in Supabase
- Subject-specific tutoring modes
- Progress tracking
- Teacher dashboard

## License

MIT License - see LICENSE file for details.