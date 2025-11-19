# PRD: ThinkSpark (MVP Version)

## 1. Project Overview
**Product Name:** ThinkSpark
**Type:** Educational Web App (Mobile Responsive / PWA)
**Core Value Proposition:** An AI tutor that helps students solve homework problems using the Socratic method. It **never** provides the final answer directly; instead, it asks guiding questions to help the user arrive at the solution themselves.
**Target Audience:** Students (Middle/High School) needing help with Math, Science, and Humanities.

## 2. Tech Stack (Strict Requirement)
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui (specifically: Card, Button, Input, ScrollArea, Avatar)
* **Icons:** Lucide React
* **AI Provider:** OpenAI API (Model: `gpt-4o`) - *Chosen for best vision analysis capabilities.*
* **Markdown/Math Rendering:** `react-markdown`, `rehype-katex`, `remark-math` (Crucial for rendering math equations properly).
* **State Management:** React Context or simple `useState` for the MVP.
* **Persistence:** LocalStorage (to keep it simple for v1).

## 3. Core User Flow
1.  **Landing:** Simple, clean welcome screen. Input field to "Paste a problem" or "Upload a photo."
2.  **The Session:** User enters a problem.
3.  **Analysis:** AI analyzes the problem silently.
4.  **The Interaction:** AI responds with a *guiding question* or a *hint*, not the answer.
5.  **The Loop:** User attempts to answer the AI's question. AI validates and moves to the next logical step.
6.  **Success:** When the user solves it, the AI celebrates (e.g., confetti animation).

## 4. Functional Requirements

### 4.1. The Chat Interface
* **Layout:** Standard chat UI. User messages on the right (blue/primary), AI messages on the left (gray/muted).
* **Input Area:** Text input field + "Paperclip" icon for image uploads.
* **Rendering:** The chat bubble must render Markdown and LaTeX.
    * *Example:* If AI sends `$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$`, it must render as a proper math formula.

### 4.2. Image Processing (Vision)
* User allows camera access or file upload.
* Image is converted to base64 and sent to OpenAI `gpt-4o` with the system prompt.

### 4.3. The "Stuck" Button
* A sticky action button near the input field labeled "Give me a hint."
* **Logic:** If clicked, injects a hidden system message: *"The user is stuck. Provide a slightly more obvious hint, but still do not reveal the answer."*

## 5. The "Brain" (System Prompt & Logic)
*This is the most critical section for the AI Agent.*

**System Prompt Configuration:**
> "You are ThinkSpark, a Socratic AI Tutor.
>
> **YOUR PRIME DIRECTIVE:** You must NEVER provide the final answer or the full solution to a problem. If you do, you fail.
>
> **PROTOCOL:**
> 1. **Analyze:** Read the user's text or image. Solve the problem internally.
> 2. **Identify the Gap:** Find the very first step the user needs to take.
> 3. **Question:** Ask a short, clear question to guide the user to that first step.
> 4. **Tone:** Friendly, encouraging, concise. Act like a patient older sibling.
> 5. **Math Formatting:** Use LaTeX syntax for all math expressions (wrapped in double dollar signs $$ for block or single $ for inline).
>
> **EXAMPLE INTERACTION:**
> User: 'What is 2x + 5 = 15?'
> BAD Response: 'Subtract 5 from both sides to get 2x=10, then divide by 2. The answer is 5.'
> GOOD Response: 'Let's break this down. To get x by itself, what is the first number we need to move away from the left side?'"

## 6. Data Structure (TypeScript Interfaces)

```typescript
// Message Type
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string; // Optional base64 string
  timestamp: number;
};

// Chat Session State
type ChatSession = {
  messages: Message[];
  isTyping: boolean; // For loading states
};
```