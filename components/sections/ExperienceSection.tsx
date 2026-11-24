"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface DetailedExperience {
  id: string;
  date: string;
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

interface ExperienceRowProps {
  exp: DetailedExperience;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ExperienceRow({
  exp,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: ExperienceRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;
    const content = contentRef.current;
    const icon = iconRef.current;
    const revealItems = content.querySelectorAll(".exp-reveal-item");

    // Cancel in-flight animations to ensure instant responsiveness without race conditions
    gsap.killTweensOf(content);
    gsap.killTweensOf(icon);
    gsap.killTweensOf(revealItems);

    if (isOpen) {
      // 1. Smoothly expand height to natural auto
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        onUpdate: () => ScrollTrigger.refresh(),
        onComplete: () => ScrollTrigger.refresh(),
      });

      // 2. Rotate the expand indicator (+ to ×)
      gsap.to(icon, {
        rotation: 45,
        duration: 0.35,
        ease: "power3.out",
      });

      // 3. Stagger reveal internal deliverables & tags
      gsap.fromTo(
        revealItems,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.05,
        }
      );
    } else {
      // 1. Smoothly collapse height to 0
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onUpdate: () => ScrollTrigger.refresh(),
        onComplete: () => ScrollTrigger.refresh(),
      });

      // 2. Rotate icon back to 0
      gsap.to(icon, {
        rotation: 0,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onToggle}
      className={`exp-card-item group relative flex flex-col p-6 sm:p-8 cursor-pointer rounded-2xl transition-colors duration-250 border ${
        isOpen
          ? "bg-neutral-100/80 dark:bg-[#121215] border-neutral-300 dark:border-neutral-700/80 shadow-sm"
          : "bg-transparent border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
      }`}
    >
      {/* Header Row: Title, Company, Tech Scope, Date, Indicator */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        {/* Title & Company */}
        <div className="sm:col-span-5 flex items-center gap-3">
          {/* Subtle active status dot (Strict Monochrome) */}
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-200 shrink-0 ${
              isOpen
                ? "bg-black dark:bg-white"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          />
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl tracking-tight transition-colors group-hover:text-black dark:group-hover:text-white">
              {exp.title}
            </h3>
            <div className="text-sm font-semibold text-[var(--text-secondary)] mt-0.5">
              {exp.company} ·{" "}
              <span className="font-normal text-[var(--text-muted)]">
                {exp.type} ({exp.location})
              </span>
            </div>
          </div>
        </div>

        {/* Tech Scope */}
        <div className="sm:col-span-4">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
            {exp.scope}
          </span>
        </div>

        {/* Date & Expanding Trigger Button */}
        <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3">
          <Badge
            variant="outline"
            className="font-mono text-xs px-3 py-1 text-[var(--text-primary)] border-[var(--border-subtle)] group-hover:border-black dark:group-hover:border-white transition-colors"
          >
            {exp.date}
          </Badge>

          {/* GSAP-driven Animated Indicator Icon */}
          <div
            ref={iconRef}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] transition-colors duration-200 ${
              isOpen
                ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                : "group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>
      </div>

      {/* GSAP-Driven Expanding Dropdown Container */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] space-y-4">
          {/* Role Overview */}
          <p className="exp-reveal-item text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            {exp.overview}
          </p>

          {/* Key Contributions & Bullet Points */}
          <div className="space-y-2.5 pt-1">
            <div className="exp-reveal-item text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Key Responsibilities & Deliverables:
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {exp.bullets.map((bullet, bIdx) => (
                <div
                  key={bIdx}
                  className="exp-reveal-item flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black mt-0.5 shadow-sm">
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

          {/* Technology Badges Chips */}
          <div className="exp-reveal-item flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-[var(--text-muted)] mr-1">
              Core Stack:
            </span>
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".exp-card-item");

    // Stagger reveal all experience items when scrolling into viewport
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        pillText="EXPERIENCE & TRACK RECORD"
        title="Where I've contributed & delivered"
        description="A timeline of high-impact engineering across startups, client products, and technical teams. Hover or click any role to view detailed contributions."
      />

      {/* Interactive Experience GSAP Accordion List */}
      <div
        ref={listRef}
        className="mt-14 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]"
      >
        {detailedExperiences.map((exp, index) => {
          const isOpen = lockedIndex === index || hoveredIndex === index;

          return (
            <ExperienceRow
              key={exp.id}
              exp={exp}
              isOpen={isOpen}
              onToggle={() => setLockedIndex(lockedIndex === index ? null : index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </div>
    </section>
  );
}
