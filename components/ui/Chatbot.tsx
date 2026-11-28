"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, projectsData } from "@/constant/data";
import { Briefcase, Calendar, Rocket, Sparkles, Zap } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  actionLinks?: { label: string; href: string; isExternal?: boolean }[];
  badges?: string[];
}

const INITIAL_GREETING: ChatMessage = {
  id: "greeting",
  sender: "bot",
  text: `Hello! I'm Naveed's Portfolio AI Assistant.\n\nI have complete knowledge of his 6+ years of full-stack engineering experience, 40+ delivered web systems, architecture methodologies, and current hiring availability. How can I help you today?`,
  time: "Just now",
  actionLinks: [
    { label: "View All Projects →", href: "/projects" },
    { label: "Schedule a Call ↗", href: personalInfo.bookingUrl, isExternal: true },
  ],
};

const COMMAND_ACTIONS = [
  {
    icon: Zap,
    title: "Tech Stack & Architecture",
    query: "What is your complete technical stack and architecture specialty?",
  },
  {
    icon: Rocket,
    title: "Explore Featured Projects",
    query: "Tell me about your best projects and case studies.",
  },
  {
    icon: Briefcase,
    title: "Availability & Hire",
    query: "Are you available for full-time or contract hire?",
  },
  {
    icon: Calendar,
    title: "Book a Strategy Call",
    query: "How can I book a call or interview with Naveed?",
  },
];

// Extensible bot response engine — designed for easy drop-in replacement with an LLM API in future
function getBotReply(query: string): {
  text: string;
  actionLinks?: { label: string; href: string; isExternal?: boolean }[];
  badges?: string[];
} {
  const q = query.toLowerCase().trim();

  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("skill") ||
    q.includes("language") ||
    q.includes("tool")
  ) {
    return {
      text: `Naveed is a specialized Full Stack Software Engineer focused on high-throughput, modern web architectures:\n\n• **Frontend & UI:** Next.js 15 (Turbopack, Server Actions), React 19, TypeScript, Tailwind CSS, GSAP, Radix UI.\n• **Backend & APIs:** Node.js, Express, Nest.js, RESTful APIs, WebSockets, GraphQL.\n• **Databases & Cloud:** PostgreSQL, Prisma ORM, MongoDB, TimescaleDB, Redis Caching, Docker, AWS (S3, EC2, Lambda).\n• **Performance:** Lighthouse 100/100, Sub-10ms UI execution, and zero-runtime CSS.`,
      badges: ["Next.js 15", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
      actionLinks: [
        { label: "Inspect Tech Stack Section →", href: "/#stack" },
        { label: "Browse Works →", href: "/projects" },
      ],
    };
  }

  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("case")
  ) {
    return {
      text: `Naveed has delivered 40+ production web applications. Highlights include:\n\n1. **Aurelia:** High-frequency algorithmic trading platform with sub-10ms UI & 250k req/s WebSockets.\n2. **IlmCode:** Interactive developer e-learning sandbox serving 50,000+ active students.\n3. **Northwind:** 40+ accessible headless components with zero-runtime CSS tokens.\n4. **Chronos:** IoT telemetry hub tracking 10,000+ connected devices with TimescaleDB.\n5. **Lumen Studio:** Generative WebGL & Three.js 60fps creative portfolio engine.\n6. **Nexus AI:** Autonomous multi-agent LLM workflow orchestrator with vector search.`,
      actionLinks: [
        { label: "Open Full Projects Archive (6 Case Studies) →", href: "/projects" },
        { label: "View Aurelia Case Study →", href: "/projects/aurelia" },
        { label: "View IlmCode Case Study →", href: "/projects/ilmcode" },
      ],
    };
  }

  if (
    q.includes("hire") ||
    q.includes("availab") ||
    q.includes("job") ||
    q.includes("freelance") ||
    q.includes("contract") ||
    q.includes("rate") ||
    q.includes("salary")
  ) {
    return {
      text: `Naveed is **${personalInfo.availability}**!\n\nHe is currently evaluating:\n• Full-time senior engineering opportunities (Remote / Worldwide)\n• High-impact contract architecture & MVP development\n• Enterprise advisory & technical consulting.\n\nHe responds promptly to prospective clients and hiring managers.`,
      actionLinks: [
        { label: "Schedule 1-on-1 Call (Cal.com) ↗", href: personalInfo.bookingUrl, isExternal: true },
        { label: "Send Email Directly ↗", href: `mailto:${personalInfo.email}`, isExternal: true },
      ],
    };
  }

  if (
    q.includes("call") ||
    q.includes("book") ||
    q.includes("meet") ||
    q.includes("schedule") ||
    q.includes("talk")
  ) {
    return {
      text: `You can directly book a 15-minute or 30-minute Google Meet session with Naveed via Cal.com.\n\nSelect your preferred time zone and pick a slot that fits your schedule:`,
      actionLinks: [
        { label: "Book Meeting on Cal.com ↗", href: personalInfo.bookingUrl, isExternal: true },
        { label: "Email: " + personalInfo.email, href: `mailto:${personalInfo.email}`, isExternal: true },
      ],
    };
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("location")
  ) {
    return {
      text: `Naveed's contact details:\n• **Email:** ${personalInfo.email}\n• **Phone:** ${personalInfo.phone}\n• **Location:** ${personalInfo.location} (${personalInfo.timezone})\n• **Booking:** ${personalInfo.bookingUrl}`,
      actionLinks: [
        { label: "Email Naveed ↗", href: `mailto:${personalInfo.email}`, isExternal: true },
        { label: "Cal.com Scheduler ↗", href: personalInfo.bookingUrl, isExternal: true },
      ],
    };
  }

  if (
    q.includes("who") ||
    q.includes("about") ||
    q.includes("naveed") ||
    q.includes("experience") ||
    q.includes("bio")
  ) {
    return {
      text: `Naveed Abbasi is a Full Stack Developer & Software Engineer with **${personalInfo.experienceYears} of industry experience** and **${personalInfo.projectsDelivered} delivered solutions**.\n\nHe specializes in bridging elegant, fluid client-side interfaces (Next.js, React, Tailwind) with rock-solid, distributed cloud backends (Node.js, PostgreSQL, Docker, AWS).`,
      actionLinks: [
        { label: "Read Detailed Bio on Homepage →", href: "/#about" },
        { label: "View Experience Timeline →", href: "/#experience" },
      ],
    };
  }

  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("hey") ||
    q.includes("salam") ||
    q.includes("aoa")
  ) {
    return {
      text: `Hello there! 👋 Glad to connect with you.\n\nI can provide instant details on Naveed's engineering work, tech stack, featured case studies, or schedule a direct introductory call with him. What would you like to explore?`,
      actionLinks: [
        { label: "Explore Tech Stack →", href: "/#stack" },
        { label: "View All Projects →", href: "/projects" },
      ],
    };
  }

  return {
    text: `Thanks for your question! Naveed is a Full Stack Engineer dedicated to building high-performance web products, scalable architectures, and accessible user interfaces.\n\nFeel free to explore his tech stack, read through the featured case studies, or schedule an introductory strategy call!`,
    actionLinks: [
      { label: "Browse All Case Studies →", href: "/projects" },
      { label: "Schedule a Call ↗", href: personalInfo.bookingUrl, isExternal: true },
    ],
  };
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Realistic typing delay (600ms)
    // NOTE: In the future, simply replace this with an API fetch:
    // const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) })
    setTimeout(() => {
      const reply = getBotReply(text);
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionLinks: reply.actionLinks,
        badges: reply.badges,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  return (
    <>
      {/* ================= Ultra-Premium Floating Action Button ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {/* Luxury Dynamic Capsule Trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Assistant" : "Open Naveed AI Assistant"}
          className={`group relative flex items-center gap-3 rounded-full border border-white/20 dark:border-white/15 bg-black/90 dark:bg-neutral-950/95 px-4 py-3 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-white/40 active:scale-95 cursor-pointer ${
            isOpen ? "ring-2 ring-white/30" : ""
          }`}
        >
          {/* Glowing Status Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
          </span>

          {/* Shimmering Label */}
          <span className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-white select-none">
            <Sparkles className="h-3.5 w-3.5 text-[#8cc8fa]" aria-hidden="true" />
            <span>{isOpen ? "Close Assistant" : "Ask Naveed AI"}</span>
          </span>

          {/* Mini Action Icon / Toggle */}
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:rotate-12">
            {isOpen ? (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* ================= Ultra-Premium Chatbot Window Modal ================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Naveed AI Intelligence Assistant"
          className="fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-50 flex w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] flex-col rounded-[28px] border border-white/20 dark:border-white/10 bg-neutral-950/95 dark:bg-neutral-950/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Subtle Top Inner Sheen Line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* ================= Header ================= */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              {/* High-res Avatar with Emerald Beacon */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-900 shadow-md ring-2 ring-emerald-500/20">
                <Image
                  src="/assets/img/NaveedAbbasi.jpg"
                  alt={personalInfo.name}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-neutral-950 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              </div>

              {/* Bot Identity */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    Naveed AI
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] tabular-nums font-bold tracking-wider text-[#8cc8fa]">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" /> PRO
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Portfolio Agent · Instant Answers
                </p>
              </div>
            </div>

            {/* Window Controls: Reset & Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetChat}
                title="Restart Chat Session"
                aria-label="Restart chat session"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Window"
                aria-label="Close chat window"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ================= Message Stream ================= */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 text-sm scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Bubble Container */}
                <div
                  className={`relative max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-md transition-all ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-br-xs"
                      : "bg-neutral-900/90 border border-white/10 text-neutral-200 rounded-bl-xs"
                  }`}
                >
                  {/* **bold** segments render as emphasis instead of literal asterisks */}
                  {msg.text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                    i % 2 ? (
                      <strong key={i} className="font-bold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}

                  {/* Technical Badges Matrix (if returned) */}
                  {msg.badges && msg.badges.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {msg.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 tabular-nums text-[11px] font-semibold text-neutral-300"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Action Links (Direct navigation) */}
                  {msg.actionLinks && msg.actionLinks.length > 0 && (
                    <div className="mt-3.5 space-y-1.5 pt-2 border-t border-white/10">
                      {msg.actionLinks.map((link, lIdx) => (
                        <div key={lIdx}>
                          {link.isExternal ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 transition-colors"
                            >
                              <span>{link.label}</span>
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-colors"
                            >
                              <span>{link.label}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Meta details below message: time & copy action */}
                <div className="mt-1 flex items-center gap-2 px-1 text-[11px] text-neutral-400">
                  <span>{msg.time}</span>
                  {msg.sender === "bot" && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity cursor-pointer"
                    >
                      {copiedId === msg.id ? "✓ Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Futuristic Thinking / Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-xs border border-white/10 bg-neutral-900/90 px-4 py-3 w-fit shadow-md">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#8cc8fa]" aria-hidden="true" />
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce" />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span className="text-xs tabular-nums text-neutral-400">
                  Thinking…
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ================= Command Suggestions Matrix ================= */}
          <div className="border-t border-white/10 px-4 py-2.5 bg-black/40">
            <div className="grid grid-cols-2 gap-1.5">
              {COMMAND_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.query)}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2 text-left hover:border-white/30 hover:bg-white/[0.08] transition-all active:scale-98 cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <action.icon className="h-3.5 w-3.5 shrink-0 text-[#8cc8fa]" aria-hidden="true" />
                    <span className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">
                      {action.title}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================= Luxury Input Command Bar ================= */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3 bg-black/70"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, stack, hire…"
                aria-label="Message"
                name="message"
                autoComplete="off"
                className="w-full rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:bg-white/[0.1] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                inputValue.trim() && !isTyping
                  ? "bg-white text-black hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                  : "bg-white/10 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Footer Subtext */}
          <div className="border-t border-white/5 py-1.5 text-center text-[11px] tabular-nums text-neutral-400 bg-black/90">
            ↵ Enter to send · Ready for LLM API integration
          </div>
        </div>
      )}
    </>
  );
}
