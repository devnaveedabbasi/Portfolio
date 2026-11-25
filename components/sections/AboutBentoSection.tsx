"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
            className="text-[var(--text-primary)] transition-[stroke-dashoffset] duration-1000 ease-out"
            fill="transparent"
          />
        </svg>

        <span className="absolute font-semibold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
          {count}%
        </span>
      </div>

      <span className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

// ================= Main Bento Section =================
export function AboutBentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header subtle lift and fade
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Bento cards staggered entrance on scroll
      const cards = gridRef.current?.querySelectorAll(".bento-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bento-about"
      className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-10 sm:pb-14 overflow-hidden"
    >
      {/* Centered Section Header — Balanced, refined typography */}
      <div ref={headerRef} className="mx-auto max-w-3xl text-center">
        <div className="inline-block">
          <Badge variant="status" className="px-4 py-1.5 text-xs font-semibold">
            About me
          </Badge>
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl leading-[1.15]">
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
        ref={gridRef}
        className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
        {/* ================= Row 1 ================= */}

        {/* Card 1: Profile & Bio (Left, 7 Cols) */}
        <div className="bento-card group relative lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle light sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

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
        <div className="bento-card group relative lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle light sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

          {/* Stacked Pills — Clean & Soft Matching Reference */}
          <div className="space-y-2.5">
            {[
              { icon: "🔍", text: "Understanding your business first" },
              { icon: "🎯", text: "Aligning on strategy and goals" },
              { icon: "🎨", text: "Concepts to pixel-perfect execution" },
              { icon: "📦", text: "Final assets, ready to launch" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.015] hover:border-black/30 dark:hover:border-white/30 cursor-default"
              >
                <span className="text-base">{item.icon}</span>
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle light sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

          {/* Tool Chips Grid — Soft, Balanced Pills */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {["🎨 Figma", "📝 Notion", "⚡ Framer"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-black/30 dark:hover:border-white/30 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["▲ Next.js", "TS TypeScript", "🐘 Postgres"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-black/30 dark:hover:border-white/30 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["☁️ AWS", "🐳 Docker", "🐙 GitHub"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-black/30 dark:hover:border-white/30 cursor-default"
                >
                  {t}
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle light sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

          {/* Principles Stack — Soft, Elegant Pills */}
          <div className="space-y-2.5">
            {[
              { icon: <span className="text-neutral-400 font-bold">○</span>, text: "Clarity over complexity" },
              { icon: <span className="text-neutral-400 font-bold">✓</span>, text: "Strategy over trends" },
              { icon: <span className="text-base">🤝</span>, text: "Partnerships over one-off" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.015] hover:border-black/30 dark:hover:border-white/30 cursor-default"
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle light sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

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
