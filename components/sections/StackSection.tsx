"use client";

import { Badge } from "@/components/ui/Badge";

export function StackSection() {
  return (
    <section id="stack" className="relative mx-auto max-w-7xl px-6  sm:py-36 overflow-hidden">
      {/* Soft Ambient Colorful Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-70 dark:opacity-30"
      >
        <div className="h-[550px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(120,119,255,0.14),_rgba(255,182,193,0.12),_transparent_70%)] blur-3xl" />
      </div>

      {/* Centered Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block">
          <Badge variant="status" className="px-4 py-1.5 text-xs font-semibold">
            My Stack
          </Badge>
        </div>

        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl leading-[1.12]">
          The technologies I use to <br />
          <span>build scalable web apps.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
          A production-hardened engineering toolkit focused on developer velocity,
          bulletproof reliability, and lightning-fast user experiences.
        </p>
      </div>

      {/* 3 Architecture Cards with Connecting Curved Arrows */}
      <div className="relative mt-16 sm:mt-24">
        {/* Top Connecting Curved Arrow (Card 1 -> Card 2) */}
        <svg
          aria-hidden="true"
          className="hidden lg:block absolute -top-10 left-[31%] z-20 w-28 h-14 pointer-events-none text-[#2d3748] dark:text-neutral-400"
          viewBox="0 0 100 50"
          fill="none"
        >
          <path
            d="M10 40 C 35 5, 75 5, 92 24"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M84 24 L 93 25 L 92 16"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Bottom Connecting Curved Arrow (Card 2 -> Card 3) */}
        <svg
          aria-hidden="true"
          className="hidden lg:block absolute -bottom-10 left-[64%] z-20 w-28 h-14 pointer-events-none text-[#2d3748] dark:text-neutral-400"
          viewBox="0 0 100 50"
          fill="none"
        >
          <path
            d="M8 12 C 25 45, 65 45, 92 22"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M83 23 L 93 21 L 91 31"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* 3 Cards Grid — Expanded & Taller */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10 md:grid-cols-3 items-stretch">
          {/* ================= Card 1: Frontend ================= */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-white dark:bg-[#121215] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:shadow-2xl md:-rotate-1 hover:rotate-0 min-h-[560px]">
            <div>
              {/* Header: Number & Title */}
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-5xl sm:text-6xl tracking-tight text-neutral-300 dark:text-neutral-700 select-none">
                  01
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  UI & Client
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Frontend
              </h3>

              {/* Rich Multi-Row Logos Grid */}
              <div className="my-6 space-y-3">
                {/* Row 1 */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* React */}
                  <span title="React" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.5" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(120 12 12)" />
                      <circle cx="12" cy="12" r="2" fill="#00D8FF" />
                    </svg>
                  </span>

                  {/* Next.js */}
                  <span title="Next.js" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center p-1 shadow-sm">
                      <svg className="h-full w-full" viewBox="0 0 180 180" fill="none">
                        <circle cx="90" cy="90" r="90" fill="black" />
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                        <rect x="115" y="54" width="12" height="72" fill="white" />
                      </svg>
                    </div>
                  </span>

                  {/* TypeScript */}
                  <span title="TypeScript" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="h-7 w-7 rounded-md bg-[#3178C6] flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-sm">
                      TS
                    </div>
                  </span>

                  {/* Tailwind CSS */}
                  <span title="Tailwind CSS" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#06B6D4">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
                    </svg>
                  </span>

                  {/* Redux */}
                  <span title="Redux" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="#764ABC" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" fill="#764ABC" />
                      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
                      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
                    </svg>
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    HTML5 / CSS3
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Framer Motion
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Zustand
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Shadcn UI
                  </span>
                </div>
              </div>

              {/* Rich Paragraph Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Crafting scalable, accessible, and high-performance client applications.
                Bridging meticulous design fidelity with fluid reactive state, Server
                Components, and sub-second load times across every device.
              </p>
            </div>

            {/* Core Capability Badges */}
            <div className="mt-6 border-t border-[var(--border-subtle)] pt-5 space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Next.js 15 Server Actions & App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Tailwind CSS, Radix UI & Micro-Interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Sub-Second Page Loads & 99+ Core Web Vitals</span>
              </div>
            </div>
          </div>

          {/* ================= Card 2: Backend ================= */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-white dark:bg-[#121215] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:shadow-2xl md:rotate-1 hover:rotate-0 min-h-[560px]">
            <div>
              {/* Header: Number & Title */}
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-5xl sm:text-6xl tracking-tight text-neutral-300 dark:text-neutral-700 select-none">
                  02
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  Server & Data
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Backend
              </h3>

              {/* Rich Multi-Row Logos Grid */}
              <div className="my-6 space-y-3">
                {/* Row 1 */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Node.js */}
                  <span title="Node.js" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#5FA04E">
                      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
                      <path d="M12 22V12" stroke="#333333" strokeWidth="1" />
                      <path d="M20.5 7L12 12 3.5 7" stroke="#333333" strokeWidth="1" />
                    </svg>
                  </span>

                  {/* Express */}
                  <span title="Express" className="flex items-center justify-center px-2 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <span className="font-mono font-black italic text-xs text-neutral-800 dark:text-neutral-200">
                      Express
                    </span>
                  </span>

                  {/* Python */}
                  <span title="Python" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24">
                      <path fill="#387EB8" d="M11.9 2c-3.1 0-5 1.5-5 3.5v2.6h5.2v.9H4.9C2.9 9 2 11.2 2 13.3s1.2 4.1 3.5 4.1h2.1v-2.8c0-2 1.8-3.7 3.8-3.7h5.1c1.8 0 3.3-1.5 3.3-3.3V5.5c0-2-1.9-3.5-5-3.5h-.9zm-2.4 2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
                      <path fill="#FFE052" d="M12.1 22c3.1 0 5-1.5 5-3.5v-2.6h-5.2v-.9h7.2c2 0 2.9-2.2 2.9-4.3s-1.2-4.1-3.5-4.1h-2.1v2.8c0 2-1.8 3.7-3.8 3.7H7.5c-1.8 0-3.3 1.5-3.3 3.3v2.1c0 2 1.9 3.5 5 3.5h2.9zm2.4-2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
                    </svg>
                  </span>

                  {/* Django */}
                  <span title="Django" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="h-7 px-1.5 rounded bg-[#092E20] flex items-center justify-center text-[#44B78B] font-bold text-[10px] tracking-tight shadow-sm">
                      django
                    </div>
                  </span>

                  {/* PostgreSQL */}
                  <span title="PostgreSQL" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2">
                      <path d="M4 6c0-2 3-4 8-4s8 2 8 4-3 4-8 4-8-2-8-4z" fill="#336791" fillOpacity="0.2" />
                      <path d="M4 6v6c0 2 3 4 8 4s8-2 8-4V6" />
                      <path d="M4 12v6c0 2 3 4 8 4s8-2 8-4v-6" />
                    </svg>
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Nest.js
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Prisma ORM
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Redis Cache
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    REST & GraphQL
                  </span>
                </div>
              </div>

              {/* Rich Paragraph Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Architecting secure, resilient, and event-driven server systems capable
                of handling high concurrency. Focused on low latency, rigorous schema
                validation, caching strategies, and reliable transactional integrity.
              </p>
            </div>

            {/* Core Capability Badges */}
            <div className="mt-6 border-t border-[var(--border-subtle)] pt-5 space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>High-Concurrency REST & GraphQL Endpoints</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>PostgreSQL Indexing, Relational Schemas & Prisma</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Redis In-Memory Caching & Real-Time WebSockets</span>
              </div>
            </div>
          </div>

          {/* ================= Card 3: DevOps & Tools ================= */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-white dark:bg-[#121215] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:shadow-2xl md:-rotate-0.5 hover:rotate-0 min-h-[560px]">
            <div>
              {/* Header: Number & Title */}
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-5xl sm:text-6xl tracking-tight text-neutral-300 dark:text-neutral-700 select-none">
                  03
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  Cloud & Infra
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                DevOps & Tools
              </h3>

              {/* Rich Multi-Row Logos Grid */}
              <div className="my-6 space-y-3">
                {/* Row 1 */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Docker */}
                  <span title="Docker" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#2496ED">
                      <rect x="3" y="10" width="3" height="3" rx="0.5" />
                      <rect x="7" y="10" width="3" height="3" rx="0.5" />
                      <rect x="11" y="10" width="3" height="3" rx="0.5" />
                      <rect x="7" y="6" width="3" height="3" rx="0.5" />
                      <rect x="11" y="6" width="3" height="3" rx="0.5" />
                      <rect x="15" y="10" width="3" height="3" rx="0.5" />
                      <path d="M2 14c1 2 4 4 10 4s9-2 10-4v-1H2v1z" />
                    </svg>
                  </span>

                  {/* AWS */}
                  <span title="AWS" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="flex flex-col items-center justify-center px-1">
                      <span className="font-black text-xs text-[#232F3E] dark:text-neutral-100 leading-none">
                        aws
                      </span>
                      <svg className="w-5 h-1.5 mt-0.5" viewBox="0 0 24 8" fill="none">
                        <path d="M2 2C7 6 17 6 22 2" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </span>

                  {/* Git */}
                  <span title="Git" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="h-7 w-7 rounded-lg bg-[#F05032] flex items-center justify-center shadow-sm">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <circle cx="8" cy="8" r="2.5" />
                        <circle cx="8" cy="16" r="2.5" />
                        <circle cx="16" cy="12" r="2.5" />
                        <path d="M8 10.5v3M8 13.5l5.5-2" />
                      </svg>
                    </div>
                  </span>

                  {/* GitHub */}
                  <span title="GitHub" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </span>

                  {/* Vercel */}
                  <span title="Vercel" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center p-1 shadow-sm">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L24 22H0L12 2Z" />
                      </svg>
                    </div>
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Kubernetes
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    GitHub Actions CI/CD
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Linux / Bash
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Cloudflare Edge
                  </span>
                </div>
              </div>

              {/* Rich Paragraph Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Streamlining deployment pipelines from local development to global cloud
                infrastructures. Automating CI/CD workflows, container orchestration,
                and server monitoring for 99.9% fault-tolerant uptime.
              </p>
            </div>

            {/* Core Capability Badges */}
            <div className="mt-6 border-t border-[var(--border-subtle)] pt-5 space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Containerized Microservices with Docker & K8s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Scalable AWS Infrastructure (EC2, S3, RDS, Lambda)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Automated CI/CD GitHub Actions & Vercel Edge Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
