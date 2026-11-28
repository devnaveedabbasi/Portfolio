"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  Cloud,
  Container,
  Database,
  Eye,
  FileCode2,
  Frame,
  GitBranch,
  Handshake,
  NotebookText,
  Package,
  Palette,
  PenTool,
  Search,
  Target,
  Triangle,
} from "lucide-react";

// ================= Animated Score Dial (Bulletproof with rAF & Observer) =================
function ScoreDial({
  targetPercentage,
  label,
}: {
  targetPercentage: number;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = inView
    ? circumference - (targetPercentage / 100) * circumference
    : circumference;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // smooth easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * targetPercentage));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [inView, targetPercentage]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div className="relative flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 64 64">
          {/* Background Ring Track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            className="text-neutral-200 dark:text-neutral-800"
            fill="transparent"
          />
          {/* Progress Ring with Smooth CSS Transition */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="text-brand transition-[stroke-dashoffset] duration-1000 ease-out"
            fill="transparent"
          />
        </svg>

        <span className="absolute font-semibold tabular-nums text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
          {count}%
        </span>
      </div>

      <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

// ================= Main Bento Section =================
export function AboutBentoSection() {

  return (
    <section
      id="bento-about"
      className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-10 sm:pb-14 overflow-hidden"
    >
      {/* Centered Section Header — Balanced, refined typography */}
      <div className="mx-auto max-w-3xl text-center">

        <h2 className="display-2 text-[var(--text-primary)]">
          The engineer <br />
          <span>behind the work.</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
          6+ years of turning complex ideas into high-performance web products
          and scalable architectures. Based in Hyderabad, working globally.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div
        className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
        {/* ================= Row 1 ================= */}

        {/* Card 1: Profile & Bio (Left, 7 Cols) */}
        <div className="bento-card group relative lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-9 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1 overflow-hidden">

          <div>
            {/* Header: Avatar Circle + Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
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

            {/* Bio Paragraph — Soft, readable, clean */}
            <p className="mt-7 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
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
        <div className="bento-card group relative lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1 overflow-hidden">

          {/* Stacked Pills — Clean & Soft Matching Reference */}
          <div className="space-y-2.5">
            {[
              { icon: <Search className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Understanding your business first" },
              { icon: <Target className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Aligning on strategy and goals" },
              { icon: <Palette className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Concepts to pixel-perfect execution" },
              { icon: <Package className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Final assets, ready to launch" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.015] hover:border-brand/40 cursor-default"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)]">
              How I work
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
              Strategy first, then design. Every project starts with understanding your business goals and user needs.
            </p>
          </div>
        </div>

        {/* ================= Row 2 ================= */}

        {/* Card 3: Tools I Use Daily (Left, 4 Cols) */}
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1 overflow-hidden">

          {/* Tool Chips Grid — Soft, Balanced Pills */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "Figma", Icon: PenTool },
                { name: "Notion", Icon: NotebookText },
                { name: "Framer", Icon: Frame },
              ].map(({ name, Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-brand/40 cursor-default"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "Next.js", Icon: Triangle },
                { name: "TypeScript", Icon: FileCode2 },
                { name: "Postgres", Icon: Database },
              ].map(({ name, Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-brand/40 cursor-default"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "AWS", Icon: Cloud },
                { name: "Docker", Icon: Container },
                { name: "GitHub", Icon: GitBranch },
              ].map(({ name, Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-brand/40 cursor-default"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)]">
              Tools I use daily
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
              The tools I use daily to bring your ideas to life.
            </p>
          </div>
        </div>

        {/* Card 4: What I Stand For (Middle, 4 Cols) */}
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1 overflow-hidden">

          {/* Principles Stack — Soft, Elegant Pills */}
          <div className="space-y-2.5">
            {[
              { icon: <Eye className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Clarity over complexity" },
              { icon: <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Strategy over trends" },
              { icon: <Handshake className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Partnerships over one-off" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.015] hover:border-brand/40 cursor-default"
              >
                {p.icon}
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-8">
            <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)]">
              What I stand for
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
              Great design solves problems first, looks beautiful second.
            </p>
          </div>
        </div>

        {/* Card 5: SEO Ready & Fast Performance (Right, 4 Cols) */}
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1 overflow-hidden">

          {/* Top Info */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)]">
              SEO ready &amp; fast performance
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
              Optimized for search rankings and blazing-fast speed.
            </p>
          </div>

          {/* 3 Circular Animated Score Dials */}
          <div className="mt-8 flex items-center justify-around gap-2 pt-2">
            <ScoreDial targetPercentage={99} label="Speed" />
            <ScoreDial targetPercentage={100} label="SEO" />
            <ScoreDial targetPercentage={98} label="Access" />
          </div>
        </div>
      </div>
    </section>
  );
}
