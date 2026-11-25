"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface DetailedExperience {
  id: string;
  date: string;
  yearShort: string;
  title: string;
  company: string;
  type: string;
  location: string;
  scope: string;
  overview: string;
  bullets: string[];
  skills: string[];
}

export const detailedExperiences: DetailedExperience[] = [
  {
    id: "tribicx",
    date: "2025 — Present",
    yearShort: "2025 — Present",
    title: "Full Stack Developer",
    company: "Tribicx",
    type: "Full-time",
    location: "Remote / Global",
    scope: "Next.js 15 · Nest.js · PostgreSQL · Prisma · AWS",
    overview:
      "Architecting enterprise-grade full-stack systems, engineering high-concurrency backend services, and shipping lightning-fast client interfaces across distributed production environments.",
    bullets: [
      "Architected event-driven microservices and high-throughput RESTful endpoints with Nest.js & PostgreSQL, reducing average response latency by 35%.",
      "Spearheaded Next.js 15 App Router migration using React Server Components and streaming SSR, achieving sub-second first-contentful paint.",
      "Configured automated CI/CD GitHub Actions pipelines, Dockerized application containers, and managed AWS S3/CloudFront asset distribution.",
    ],
    skills: ["Next.js 15", "Nest.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Docker", "AWS"],
  },
  {
    id: "verior",
    date: "2025",
    yearShort: "2025",
    title: "Full Stack Developer",
    company: "Verior",
    type: "Full-time",
    location: "Islamabad, Pakistan",
    scope: "React.js · Next.js · Node.js · Firebase · REST APIs",
    overview:
      "Built client-facing web applications, turning complex Figma design systems into pixel-perfect responsive code with full-stack Node.js and real-time database synchronizations.",
    bullets: [
      "Translated multi-breakpoint Figma component libraries into modular, accessible React components utilizing Tailwind CSS and Radix primitives.",
      "Implemented Firebase real-time database hooks, secure JWT authentication flows, and automated notification services.",
      "Developed high-velocity Node.js endpoints with schema validation, query caching, and resilient error-handling middleware.",
    ],
    skills: ["React.js", "Next.js", "Node.js", "Firebase", "Zustand", "Tailwind CSS", "Figma-to-Code"],
  },
  {
    id: "digital-elliptical",
    date: "2024 — 2025",
    yearShort: "2024 — 2025",
    title: "React Developer",
    company: "Digital Elliptical",
    type: "Onsite",
    location: "Hyderabad, Pakistan",
    scope: "React.js · Tailwind CSS · Redux Toolkit · Design Systems",
    overview:
      "Focused on engineering responsive web applications, modular UI components, robust global state management, and fluid user interactions across diverse client portals.",
    bullets: [
      "Constructed a reusable design token library with 35+ themeable UI components, ensuring consistent accessibility standards across the board.",
      "Streamlined asynchronous global state across complex analytical tables using Redux Toolkit and React Query caching.",
      "Optimized Core Web Vitals, achieving 95+ Google Lighthouse scores across production builds through code-splitting and asset minification.",
    ],
    skills: ["React.js", "Redux Toolkit", "JavaScript (ES6+)", "Tailwind CSS", "REST APIs", "Lighthouse 95+"],
  },
  {
    id: "youngdev",
    date: "2024",
    yearShort: "2024",
    title: "Frontend Developer",
    company: "YoungDevIntern",
    type: "Internship",
    location: "Remote",
    scope: "HTML5 / CSS3 · Modern JavaScript · Responsive Architecture",
    overview:
      "Engineered clean and interactive client interfaces, mastering semantic web standards, modern CSS layouts, and asynchronous REST API integrations.",
    bullets: [
      "Engineered mobile-first, cross-browser responsive layouts strictly conforming to semantic HTML5 and modern CSS Flexbox/Grid patterns.",
      "Consumed third-party RESTful API endpoints and implemented dynamic client-side filtering, form validations, and asynchronous error boundaries.",
      "Collaborated in an agile sprint environment utilizing Git branching strategies, pull requests, and peer code reviews.",
    ],
    skills: ["HTML5 / CSS3", "JavaScript", "REST APIs", "DOM Manipulation", "Git & GitHub"],
  },
];

export function ExperienceSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!stageRef.current || !cardsContainerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".exp-pinned-card");
    const totalCards = cards.length;

    const ctx = gsap.context(() => {
      // Master "Pinned Panels with Overscroll" Timeline
      // Linear ease: "none" + scrub: 0.5 for butter-smooth Lenis-driven momentum
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 12%",
          end: () => `+=${(totalCards - 1) * 750}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const rawIndex = Math.round(self.progress * (totalCards - 1));
            const clamped = Math.min(totalCards - 1, Math.max(0, rawIndex));
            if (clamped !== activeIndexRef.current) {
              activeIndexRef.current = clamped;
              setActiveIndex(clamped);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // Animate each subsequent panel over the previous one with pure linear scrub
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Incoming panel wipes/slides up from below smoothly
        tl.fromTo(
          card,
          { yPercent: 100, opacity: 1 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            duration: 1,
          }
        );

        // Previous panel recedes slightly with depth scaling (NO expensive blur filter!)
        tl.to(
          cards[i - 1],
          {
            scale: 0.94,
            opacity: 0.35,
            yPercent: -4,
            ease: "none",
            duration: 1,
          },
          "<" // Synchronous with incoming card
        );
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  // Quick navigation when clicking timeline nodes or pills
  const scrollToPanel = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const total = detailedExperiences.length;
    const progress = index / (total - 1);
    const targetScroll = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        pillText="EXPERIENCE & TRACK RECORD"
        title="Where I've contributed & delivered"
        description="A timeline of high-impact engineering across startups, client products, and technical teams. Scroll down to browse through each pinned experience."
      />

      {/* Main Pinned Stage Container */}
      <div ref={stageRef} className="mt-12 sm:mt-16 w-full">
        {/* Mobile Horizontal Timeline Nav (< lg) */}
        <div className="lg:hidden flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-5 overflow-x-auto gap-2">
          {detailedExperiences.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => scrollToPanel(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors duration-200 cursor-pointer ${
                activeIndex === idx
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-900 text-[var(--text-secondary)] border border-[var(--border-subtle)]"
              }`}
            >
              {exp.yearShort} · {exp.company}
            </button>
          ))}
        </div>

        {/* 2-Column Layout: Left Side Timeline + Right Pinned Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= Left Side Timeline (Desktop) ================= */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between py-4 pr-6 h-[580px] sm:h-[560px] md:h-[580px] border-r border-[var(--border-subtle)]">
            {/* Top Label */}
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Timeline Flow
                </span>
              </div>
              <h3 className="mt-2 text-xl font-black tracking-tight text-[var(--text-primary)]">
                Career Progression
              </h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Scroll to explore each chapter or click a year.
              </p>
            </div>

            {/* Vertical Connecting Line & Milestone Nodes */}
            <div className="relative my-auto flex flex-col justify-between h-[360px] py-2">
              {/* Background Connecting Track Line */}
              <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-neutral-200 dark:bg-neutral-800" />

              {/* Active Progress Filling Line */}
              <div
                className="absolute left-[13px] top-3 w-0.5 bg-black dark:bg-white transition-[height] duration-200 ease-out origin-top"
                style={{
                  height: `${(activeIndex / (detailedExperiences.length - 1)) * 96}%`,
                }}
              />

              {/* 4 Experience Milestones */}
              {detailedExperiences.map((exp, idx) => {
                const isActive = activeIndex === idx;
                const isPast = activeIndex >= idx;

                return (
                  <button
                    key={exp.id}
                    onClick={() => scrollToPanel(idx)}
                    className="group relative flex items-center gap-4 text-left cursor-pointer transition-colors duration-200"
                  >
                    {/* Node Circle Dot */}
                    <div
                      className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-black bg-white dark:border-white dark:bg-black scale-110 shadow-md ring-2 ring-black/10 dark:ring-white/10"
                          : isPast
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900 group-hover:border-neutral-400"
                      }`}
                    >
                      {isActive ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                      ) : isPast ? (
                        <span className="h-2 w-2 rounded-full bg-white dark:bg-black" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      )}
                    </div>

                    {/* Timeline Text: Year & Company */}
                    <div>
                      <div
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? "text-black dark:text-white"
                            : "text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {exp.yearShort}
                      </div>
                      <div
                        className={`text-sm font-extrabold tracking-tight transition-colors ${
                          isActive
                            ? "text-black dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {exp.company}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                        {exp.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Step Indicator */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Active Position
              </span>
              <span className="font-mono font-black text-black dark:text-white">
                0{activeIndex + 1} / 0{detailedExperiences.length}
              </span>
            </div>
          </div>

          {/* ================= Right Side Pinned Cards Deck ================= */}
          <div className="lg:col-span-8">
            <div
              ref={cardsContainerRef}
              className="relative w-full h-[580px] sm:h-[560px] md:h-[580px]"
            >
              {detailedExperiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="exp-pinned-card transform-gpu will-change-transform absolute inset-0 w-full h-full rounded-3xl border border-[var(--border-subtle)] bg-white dark:bg-[#121215] p-6 sm:p-9 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
                  style={{ zIndex: index + 10 }}
                >
                  {/* Card Header & Content */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5 sm:pb-6">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-300 dark:text-neutral-700 select-none">
                          0{index + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                              {exp.title}
                            </h3>
                            <span className="h-2 w-2 rounded-full bg-black dark:bg-white shrink-0" />
                          </div>
                          <div className="text-sm font-semibold text-[var(--text-secondary)] mt-0.5">
                            {exp.company} ·{" "}
                            <span className="font-normal text-[var(--text-muted)]">
                              {exp.type} ({exp.location})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="font-mono text-xs px-3.5 py-1.5 border-[var(--border-subtle)] text-[var(--text-primary)] font-bold"
                        >
                          {exp.date}
                        </Badge>
                        <span className="hidden sm:inline-block rounded-full bg-neutral-100 dark:bg-neutral-900 border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                          {exp.scope.split("·")[0]?.trim()}
                        </span>
                      </div>
                    </div>

                    {/* Tech Scope Ribbon */}
                    <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                      <span className="text-xs uppercase tracking-wider font-bold text-[var(--text-muted)]">
                        Tech Scope:
                      </span>
                      <span>{exp.scope}</span>
                    </div>

                    {/* Overview Paragraph */}
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                      {exp.overview}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    <div className="mt-5 sm:mt-6 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Key Responsibilities & Deliverables:
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black mt-0.5 shadow-sm text-xs">
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span className="leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Stack Chips Footer */}
                  <div className="pt-5 mt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text-muted)] mr-1">
                      Core Stack:
                    </span>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-black dark:hover:border-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
