"use client";

import { useState } from "react";
import { Camera, Send, Bot, Lightbulb, Calculator, Compass } from "lucide-react";
import dynamic from "next/dynamic";
const ShaderBackground = dynamic(() => import("@/components/ShaderBackground").then(m => m.ShaderBackground), { ssr: false });

function FeatureCard({
  title,
  description,
  icon: Icon,
  className = "",
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={[
        "group relative rounded-3xl border border-gray-200 bg-white/80 shadow-sm p-8",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-200/60",
        // faint textured/radial background
        "bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(79,70,229,0.06),transparent_60%)]",
        "backdrop-blur-sm",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
          <Icon className="h-5 w-5 text-gray-900" strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
      </div>
      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Navigate to chat page (future: pass initial query via state or storage)
    window.location.href = "/chat";
  }

  return (
    <main className="relative min-h-[100svh] bg-white text-gray-900">
      {/* Dynamic shader background */}
      <ShaderBackground />

      {/* Subtle global background - radial + optional noise */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(600px_300px_at_50%_-80px,rgba(79,70,229,0.06),transparent_60%)]",
          "bg-noise", // if defined in globals.css
        ].join(" ")}
      />

      {/* Content wrapper above background */}
      <div className="relative z-10">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-12 w-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center mb-6">
              <Bot className="h-5 w-5 text-gray-900" strokeWidth={1.75} />
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Welcome to ThinkSpark!</h1>

            <p className="mt-5 text-xl font-medium text-gray-600 leading-relaxed">
              I’m your AI tutor—ask questions, upload photos, and get guided hints that build your problem‑solving skills without giving away the answer.
            </p>

            {/* Combined input bar (search-like) */}
            <form
              onSubmit={onSubmit}
              className={[
                "mt-8 mx-auto max-w-2xl",
                "rounded-full border border-gray-200 bg-white/90 shadow-sm",
                "focus-within:ring-2 focus-within:ring-indigo-600",
                "transition-all",
              ].join(" ")}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  type="button"
                  className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
                  title="Upload a photo"
                  onClick={() => alert('Open file picker (to be implemented)')}
                >
                  <Camera className="h-4 w-4 text-gray-900" strokeWidth={1.75} />
                </button>

                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none placeholder:text-gray-400 text-base"
                  placeholder="Ask a homework question or describe your problem..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <button
                  type="submit"
                  className={[
                    "shrink-0 inline-flex items-center gap-2",
                    "rounded-full bg-indigo-600 px-4 py-2 text-white",
                    "hover:bg-indigo-600/90 transition",
                  ].join(" ")}
                >
                  <span className="text-sm font-medium">Ask</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* App Mockup Section */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Experience ThinkSpark
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our AI tutor guides you through problems step by step, building your understanding naturally.
            </p>
          </div>
          
          {/* 3D Mockup Container */}
          <div className="flex justify-center">
            <div 
              className="relative"
              style={{ 
                perspective: '1000px',
                perspectiveOrigin: 'center center'
              }}
            >
              <div
                className="relative w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl border border-gray-300 overflow-hidden transition-transform duration-500 hover:scale-105"
                style={{
                  transform: 'rotateX(5deg) rotateY(-10deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Phone Frame */}
                <div className="absolute inset-2 bg-white rounded-2xl shadow-inner overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-50 flex items-center justify-between px-4 text-xs text-gray-600">
                    <span>9:41</span>
                    <span>100%</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full bg-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">ThinkSpark</h3>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-gray-800">What's 2x + 5 = 15?</p>
                      </div>
                      <div className="bg-indigo-600 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                        <p className="text-sm">Let's break this down. To get x by itself, what's the first number we need to move away from the left side?</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-gray-800">The 5?</p>
                      </div>
                      <div className="bg-indigo-600 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                        <p className="text-sm">Exactly! How would you move the 5 to the other side?</p>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center gap-2">
                        <input 
                          className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
                          placeholder="Type your answer..."
                          readOnly
                        />
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <Send className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large highlight card (spans 2 columns on md+) */}
            <FeatureCard
              className="md:col-span-2"
              title="Guided Learning"
              description="Get Socratic hints and structured nudges instead of instant answers—build your understanding step by step."
              icon={Lightbulb}
            />

            <FeatureCard
              title="Math & Science"
              description="Understands formulas, steps, and diagrams—explain your reasoning and we’ll bridge the gaps together."
              icon={Calculator}
            />

            <FeatureCard
              title="Hints"
              description="Request gentle hints when you’re stuck. No spoilers—just enough guidance to get you moving."
              icon={Compass}
            />

            <FeatureCard
              title="Confidence"
              description="Strengthen problem‑solving habits over time. Build intuition and mastery, not just answers."
              icon={Bot}
            />
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
