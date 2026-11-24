"use client";

import { Badge } from "@/components/ui/Badge";

export function StackSection() {
  return (
    <section id="stack" className="relative mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-24 sm:pb-32 overflow-hidden">
      {/* Soft Ambient Subtle Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20"
      >
        <div className="h-[450px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),_transparent_70%)] blur-3xl" />
      </div>

      {/* Centered Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block">
          <Badge variant="status" className="px-4 py-1.5 text-xs font-semibold">
            My Stack
          </Badge>
        </div>

        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl leading-[1.12]">
          The technologies I use to <br />
          <span>build scalable web apps.</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
          A production-hardened engineering toolkit focused on developer velocity,
          bulletproof reliability, and lightning-fast user experiences.
        </p>
      </div>

      {/* 3 Architecture Cards with Connecting Curved Arrows */}
      <div className="relative mt-12 sm:mt-18">
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
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Next.js 15 Server Actions & App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Tailwind CSS, Radix UI & Micro-Interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
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
                {/* Row 1: Graphic Logos */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Node.js */}
                  <span title="Node.js" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#5FA04E">
                      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
                      <path d="M12 22V12" stroke="#333333" strokeWidth="1" />
                      <path d="M20.5 7L12 12 3.5 7" stroke="#333333" strokeWidth="1" />
                    </svg>
                  </span>

                  {/* NestJS */}
                  <span title="Nest.js" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#E0234E">
                      <path d="M14.131.047c-.173 0-.334.037-.483.087.316.21.49.49.576.806.007.043.019.074.025.117a.681.681 0 0 1 .013.112c.024.545-.143.614-.26.936-.18.415-.13.861.086 1.22a.74.74 0 0 0 .074.137c-.235-1.568 1.073-1.803 1.314-2.293.019-.428-.334-.713-.613-.911a1.37 1.37 0 0 0-.732-.21zM16.102.4c-.024.143-.006.106-.012.18-.006.05-.006.112-.012.161-.013.05-.025.1-.044.149-.012.05-.03.1-.05.149l-.067.142c-.02.025-.031.05-.05.075l-.037.055a2.152 2.152 0 0 1-.093.124c-.037.038-.068.081-.112.112v.006c-.037.031-.074.068-.118.1-.13.099-.278.173-.415.266-.043.03-.087.056-.124.093a.906.906 0 0 0-.118.099c-.043.037-.074.074-.111.118-.031.037-.068.08-.093.124a1.582 1.582 0 0 0-.087.13c-.025.05-.043.093-.068.142-.019.05-.037.093-.05.143a2.007 2.007 0 0 0-.043.155c-.006.025-.006.056-.012.08-.007.025-.007.05-.013.075 0 .05-.006.105-.006.155 0 .037 0 .074.006.111 0 .05.006.1.019.155.006.05.018.1.03.15.02.049.032.098.05.148.013.03.031.062.044.087l-1.426-.552c-.241-.068-.477-.13-.719-.186l-.39-.093c-.372-.074-.75-.13-1.128-.167-.013 0-.019-.006-.031-.006A11.082 11.082 0 0 0 8.9 2.855c-.378.025-.756.074-1.134.136a12.45 12.45 0 0 0-.837.174l-.279.074c-.092.037-.18.08-.266.118l-.205.093c-.012.006-.024.006-.03.012-.063.031-.118.056-.174.087a2.738 2.738 0 0 0-.236.118c-.043.018-.086.043-.124.062a.559.559 0 0 1-.055.03c-.056.032-.112.063-.162.094a1.56 1.56 0 0 0-.148.093c-.044.03-.087.055-.124.086-.006.007-.013.007-.019.013-.037.025-.08.056-.118.087l-.012.012-.093.074c-.012.007-.025.019-.037.025-.031.025-.062.056-.093.08-.006.013-.019.02-.025.025-.037.038-.074.069-.111.106-.007 0-.007.006-.013.012a1.742 1.742 0 0 0-.111.106c-.007.006-.007.012-.013.012a1.454 1.454 0 0 0-.093.1c-.012.012-.03.024-.043.036a1.374 1.374 0 0 1-.106.112c-.006.012-.018.019-.024.03-.05.05-.093.1-.143.15l-.018.018c-.1.106-.205.211-.317.304-.111.1-.229.192-.347.273a3.777 3.777 0 0 1-.762.421c-.13.056-.267.106-.403.149-.26.056-.527.161-.756.18-.05 0-.105.012-.155.018l-.155.037-.149.056c-.05.019-.099.044-.148.068-.044.031-.093.056-.137.087a1.011 1.011 0 0 0-.124.106c-.043.03-.087.074-.124.111-.037.043-.074.08-.105.124-.031.05-.068.093-.093.143a1.092 1.092 0 0 0-.087.142c-.025.056-.05.106-.068.161-.019.05-.037.106-.056.161-.012.05-.025.1-.03.15 0 .005-.007.012-.007.018-.012.056-.012.13-.019.167C.006 7.95 0 7.986 0 8.03a.657.657 0 0 0 .074.31v.006c.019.037.044.075.069.112.024.037.05.074.08.111.031.031.068.069.106.1a.906.906 0 0 0 .117.099c.149.13.186.173.378.272.031.019.062.031.1.05.006 0 .012.006.018.006 0 .013 0 .019.006.031a1.272 1.272 0 0 0 .08.298c.02.037.032.074.05.111.007.013.013.025.02.031.024.05.049.093.073.137l.093.13c.031.037.069.08.106.118.037.037.074.068.118.105 0 0 .006.006.012.006.037.031.074.062.112.087a.986.986 0 0 0 .136.08c.043.025.093.05.142.069a.73.73 0 0 0 .124.043c.007.006.013.006.025.012.025.007.056.013.08.019-.018.335-.024.65.026.762.055.124.328-.254.6-.688-.036.428-.061.93 0 1.079.069.155.44-.329.763-.862 4.395-1.016 8.405 2.02 8.826 6.31-.08-.67-.905-1.041-1.283-.948-.186.458-.502 1.047-1.01 1.413.043-.41.025-.83-.062-1.24a4.009 4.009 0 0 1-.769 1.562c-.588.043-1.177-.242-1.487-.67-.025-.018-.031-.055-.05-.08-.018-.043-.037-.087-.05-.13a.515.515 0 0 1-.037-.13c-.006-.044-.006-.087-.006-.137v-.093a.992.992 0 0 1 .031-.13c.013-.043.025-.086.044-.13.024-.043.043-.087.074-.13.105-.298.105-.54-.087-.682a.706.706 0 0 0-.118-.062c-.024-.006-.055-.018-.08-.025l-.05-.018a.847.847 0 0 0-.13-.031.472.472 0 0 0-.13-.019 1.01 1.01 0 0 0-.136-.012c-.031 0-.062.006-.093.006a.484.484 0 0 0-.137.019c-.043.006-.086.012-.13.024a1.068 1.068 0 0 0-.13.044c-.043.018-.08.037-.124.056-.037.018-.074.043-.118.062-1.444.942-.582 3.148.403 3.787-.372.068-.75.148-.855.229l-.013.012c.267.161.546.298.837.416.397.13.818.247 1.004.297v.006a5.996 5.996 0 0 0 1.562.112c2.746-.192 4.996-2.281 5.405-5.033l.037.161c.019.112.043.23.056.347v.006c.012.056.018.112.025.162v.024c.006.056.012.112.012.162.006.068.012.136.012.204v.1c0 .03.007.067.007.098 0 .038-.007.075-.007.112v.087c0 .043-.006.08-.006.124 0 .025 0 .05-.006.08 0 .044-.006.087-.006.137-.006.018-.006.037-.006.055l-.02.143c0 .019 0 .037-.005.056-.007.062-.019.118-.025.18v.012l-.037.174v.018l-.037.167c0 .007-.007.02-.007.025a1.663 1.663 0 0 1-.043.168v.018c-.019.062-.037.118-.05.174-.006.006-.006.012-.006.012l-.056.186c-.024.062-.043.118-.068.18-.025.062-.043.124-.068.18-.025.062-.05.117-.074.18h-.007c-.024.055-.05.117-.08.173a.302.302 0 0 1-.019.043c-.006.006-.006.013-.012.019a5.867 5.867 0 0 1-1.742 2.082c-.05.031-.099.069-.149.106-.012.012-.03.018-.043.03a2.603 2.603 0 0 1-.136.094l.018.037h.007l.26-.037h.006c.161-.025.322-.056.483-.087.044-.006.093-.019.137-.031l.087-.019c.043-.006.086-.018.13-.024.037-.013.074-.02.111-.031.62-.15 1.221-.354 1.798-.595a9.926 9.926 0 0 1-3.85 3.142c.714-.05 1.426-.167 2.114-.366a9.903 9.903 0 0 0 5.857-4.68 9.893 9.893 0 0 1-1.667 3.986 9.758 9.758 0 0 0 1.655-1.376 9.824 9.824 0 0 0 2.61-5.268c.21.98.272 1.99.18 2.987 4.474-6.241.371-12.712-1.346-14.416-.006-.013-.012-.019-.012-.031-.006.006-.006.006-.006.012 0-.006 0-.006-.007-.012 0 .074-.006.148-.012.223a8.34 8.34 0 0 1-.062.415c-.03.136-.068.273-.105.41-.044.13-.093.266-.15.396a5.322 5.322 0 0 1-.185.378 4.735 4.735 0 0 1-.477.688c-.093.111-.192.21-.292.31a3.994 3.994 0 0 1-.18.155l-.142.124a3.459 3.459 0 0 1-.347.241 4.295 4.295 0 0 1-.366.211c-.13.062-.26.118-.39.174a4.364 4.364 0 0 1-.818.223c-.143.025-.285.037-.422.05a4.914 4.914 0 0 1-.297.012 4.66 4.66 0 0 1-.422-.025 3.137 3.137 0 0 1-.421-.062 3.136 3.136 0 0 1-.415-.105h-.007c.137-.013.273-.025.41-.05a4.493 4.493 0 0 0 .818-.223c.136-.05.266-.112.39-.174.13-.062.248-.13.372-.204.118-.08.235-.161.347-.248.112-.087.217-.18.316-.279.105-.093.198-.198.291-.304.093-.111.18-.223.26-.334.013-.019.026-.044.038-.062.062-.1.124-.199.18-.298a4.272 4.272 0 0 0 .334-.775c.044-.13.075-.266.106-.403.025-.142.05-.278.062-.415.012-.142.025-.285.025-.421 0-.1-.007-.199-.013-.298a6.726 6.726 0 0 0-.05-.415 4.493 4.493 0 0 0-.092-.415c-.044-.13-.087-.267-.137-.397-.05-.13-.111-.26-.173-.384-.069-.124-.137-.248-.211-.366a6.843 6.843 0 0 0-.248-.34c-.093-.106-.186-.212-.285-.317a3.878 3.878 0 0 0-.161-.155c-.28-.217-.57-.421-.862-.607a1.154 1.154 0 0 0-.124-.062 2.415 2.415 0 0 0-.589-.26Z" />
                    </svg>
                  </span>

                  {/* Supabase */}
                  <span title="Supabase" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#3ECF8E">
                      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
                    </svg>
                  </span>

                  {/* Firebase */}
                  <span title="Firebase" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#FFCA28">
                      <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
                    </svg>
                  </span>

                  {/* Prisma */}
                  <span title="Prisma ORM" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 fill-[#2D3748] dark:fill-neutral-200" viewBox="0 0 24 24">
                      <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
                    </svg>
                  </span>

                  {/* PostgreSQL */}
                  <span title="PostgreSQL" className="flex items-center justify-center p-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--border-subtle)] hover:scale-110 transition-transform">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#336791">
                      <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
                    </svg>
                  </span>
                </div>

                {/* Row 2: Tech Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Nest.js
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Prisma ORM
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Supabase
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    Firebase
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
                of handling high concurrency. Specializing in Node.js, Nest.js,
                PostgreSQL, Supabase, Firebase, and real-time database synchronizations.
              </p>
            </div>

            {/* Core Capability Badges */}
            <div className="mt-6 border-t border-[var(--border-subtle)] pt-5 space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Node.js & Nest.js High-Concurrency Architectures</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>PostgreSQL, Prisma ORM & Supabase Database Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Firebase Auth, Redis In-Memory & Real-Time WebSockets</span>
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
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Containerized Microservices with Docker & K8s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Scalable AWS Infrastructure (EC2, S3, RDS, Lambda)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span>Automated CI/CD GitHub Actions & Vercel Edge Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
