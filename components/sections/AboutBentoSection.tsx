"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

// Score Dial Component for Lighthouse stats
function ScoreDial({
  percentage,
  label,
}: {
  percentage: number;
  label: string;
}) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 64 64">
          {/* Background Ring Track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-neutral-200 dark:text-neutral-800"
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-[var(--text-primary)] transition-all duration-1000 ease-out"
            fill="transparent"
          />
        </svg>
        <span className="absolute font-black text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
          {percentage}%
        </span>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

export function AboutBentoSection() {
  return (
    <section id="bento-about" className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-8 sm:pb-12">
      {/* Centered Section Header — Matching Figma Exactly */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block">
          <Badge variant="status" className="px-4 py-1.5 text-xs font-semibold">
            About me
          </Badge>
        </div>

        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl leading-[1.1]">
          The engineer <br />
          <span>behind the work.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
          6+ years of turning complex ideas into high-performance web products
          and scalable architectures. Based in Hyderabad, working globally.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ================= Row 1 ================= */}

        {/* Card 1: Profile & Bio (Left, 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-9 shadow-sm hover:shadow-md transition-shadow">
          <div>
            {/* Header: Avatar Circle + Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] shadow-sm">
                <Image
                  src="/assets/img/NaveedAbbasi.jpg"
                  alt="Naveed Abbasi"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <span className="inline-flex items-center gap-1.5">
                <span className="text-[var(--text-primary)] font-bold">•</span>
                <span>10+ Projects</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span className="text-[var(--text-primary)] font-bold">•</span>
                <span>6+ years of experience</span>
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              Naveed is a passionate Full Stack Developer who architects robust
              backend APIs and high-performance frontend interfaces. He
              specializes in creating seamless digital solutions using Next.js,
              TypeScript, and Node.js. Based in Hyderabad, Pakistan, he helps
              startups and scale-ups build reliable digital products with a
              focus on clean architecture and code quality.
            </p>
          </div>
        </div>

        {/* Card 2: How I Work (Right, 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Stacked Pills */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-base">🔍</span>
              <span>Understanding your business first</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-base">🎯</span>
              <span>Aligning on strategy and goals</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-base">🎨</span>
              <span>Concepts to pixel-perfect execution</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-base">📦</span>
              <span>Final assets, ready to launch</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              How I work
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Strategy first, then design. Every project starts with understanding your business goals and user needs.
            </p>
          </div>
        </div>

        {/* ================= Row 2 ================= */}

        {/* Card 3: Tools I Use Daily (Left, 4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Tool Chips Grid */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                🎨 Figma
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                📝 Notion
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                ⚡ Framer
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                ▲ Next.js
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                🟦 TS TypeScript
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                🐘 Postgres
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                ☁️ AWS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                🐳 Docker
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                🐙 GitHub
              </span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              Tools I use daily
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              The tools I use daily to bring your ideas to life.
            </p>
          </div>
        </div>

        {/* Card 4: What I Stand For (Middle, 4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Principles Stack */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-neutral-400 font-bold">○</span>
              <span>Clarity over complexity</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-neutral-400 font-bold">✓</span>
              <span>Strategy over trends</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
              <span className="text-base">🤝</span>
              <span>Partnerships over one-off</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              What I stand for
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Great design solves problems first, looks beautiful second.
            </p>
          </div>
        </div>

        {/* Card 5: SEO Ready & Fast Performance (Right, 4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Top Info */}
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              SEO ready & fast performance
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Optimized for search rankings and blazing-fast speed.
            </p>
          </div>

          {/* 3 Circular Score Dials (Lighthouse Style) */}
          <div className="mt-8 flex items-center justify-around gap-2 pt-2">
            <ScoreDial percentage={99} label="Speed" />
            <ScoreDial percentage={100} label="SEO" />
            <ScoreDial percentage={98} label="Access" />
          </div>
        </div>
      </div>
    </section>
  );
}
