"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { riseWords, useScrollAnimation } from "@/lib/useScrollAnimation";

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

// Rail geometry in px: the main line sits at x=7, each role's branch at x=31.
const FORK = "M7 0 C7 24 31 20 31 44";
const MERGE = "M31 0 C31 24 7 20 7 44";

function BranchCurve({ d, className }: { d: string; className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute left-0 h-11 w-11 text-brand ${className}`}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path d={d} stroke="currentColor" strokeWidth="2" className="git-curve" />
    </svg>
  );
}

export function ExperienceSection() {
  const graphRef = useRef<HTMLOListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimation(sectionRef, () => {
    riseWords("#experience-heading h2");

    gsap.utils.toArray<HTMLElement>(".git-row").forEach((row) => {
      const q = gsap.utils.selector(row);
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 74%" } })
        .from(q("header > *"), { x: -44, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" })
        .from(q("h3, h3 + p"), { y: 32, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, 0.1)
        .from(q(".exp-point"), { x: 40, opacity: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, "-=0.3")
        .from(q(".exp-skill"), { scale: 0, opacity: 0, duration: 0.4, stagger: 0.05, ease: "back.out(2)" }, "-=0.2");
    });
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
    if (!graphRef.current) return;

    // The graph is fully drawn by default; motion only replays the drawing on scroll.
    const mm = gsap.matchMedia(graphRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".git-main",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: graphRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".git-row").forEach((row) => {
        const [fork, merge] = row.querySelectorAll(".git-curve");

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: row, start: "top 75%", end: "bottom 75%", scrub: 0.4 },
          })
          .fromTo(fork, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.12 })
          .fromTo(row.querySelector(".git-node"), { scale: 0 }, { scale: 1, duration: 0.08 })
          .fromTo(row.querySelector(".git-branch"), { scaleY: 0 }, { scaleY: 1, duration: 0.68 })
          .fromTo(merge, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.12 });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="mx-auto max-w-7xl overflow-x-clip px-6 py-24 sm:py-32">
      <div id="experience-heading">
        <SectionHeader title="Where I've worked" description="Newest first." />
      </div>

      <ol ref={graphRef} className="relative mt-12 sm:mt-16">
        {/* main line */}
        <li aria-hidden="true" className="absolute bottom-0 left-[6px] top-0 w-0.5">
          <div className="h-full w-full bg-[var(--border-default)]" />
          <div className="git-main absolute inset-0 origin-top bg-brand" />
        </li>

        {detailedExperiences.map((exp) => {
          const isCurrent = exp.date.includes("Present");

          return (
            <li key={exp.id} className="git-row grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 sm:gap-x-8">
              <div className="relative" aria-hidden="true">
                <BranchCurve d={FORK} className="top-0" />
                <div className="git-branch absolute bottom-11 left-[30px] top-11 w-0.5 origin-top bg-brand" />
                <div
                  className={`git-node absolute left-[23px] top-10 h-4 w-4 rounded-full border-[3px] border-brand ${
                    isCurrent ? "bg-brand ring-4 ring-brand/20" : "bg-[var(--bg-page)]"
                  }`}
                />
                <BranchCurve d={MERGE} className="bottom-0" />
              </div>

              <article className="grid gap-4 pb-16 pt-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
                <header>
                  <div className="font-display text-xl font-semibold tabular-nums text-[var(--text-primary)]">
                    {exp.date}
                  </div>
                  <div className="mt-1 text-base font-bold text-brand">{exp.company}</div>
                  <div className="mt-1 text-sm text-[var(--text-muted)]">
                    {exp.type}, {exp.location}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="rounded-md border border-[var(--border-default)] px-2 py-0.5 text-[var(--text-secondary)]">
                      {exp.id}
                    </span>
                    {isCurrent && (
                      <span className="rounded-md bg-primary px-2 py-0.5 font-medium text-primary-foreground">
                        HEAD
                      </span>
                    )}
                  </div>
                </header>

                <div className="max-w-2xl">
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                    {exp.overview}
                  </p>
                  <ul className="mt-5 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[var(--text-primary)] marker:text-brand sm:text-[15px]">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="exp-point">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                    {exp.skills.map((skill) => (
                      <li
                        key={skill}
                        className="exp-skill rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
