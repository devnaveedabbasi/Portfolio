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
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/** The idea each principle rejects: a line is drawn through it. */
function Struck({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="bento-struck-word">{children}</span>
      <span
        aria-hidden="true"
        className="bento-strike absolute left-0 top-1/2 h-0.5 w-full origin-left rounded-full bg-brand"
      />
    </span>
  );
}

/** A tool name in the bio that gets a marker stroke behind it. */
function Marked({ children }: { children: string }) {
  return (
    <span className="bento-mark rounded bg-[linear-gradient(var(--brand-soft),var(--brand-soft))] bg-[length:100%_100%] bg-no-repeat font-bold text-[var(--text-primary)]">
      {children}
    </span>
  );
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText, Draggable);
    const mm = gsap.matchMedia(section);

    // Without JavaScript or with reduced motion every card is simply there.
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 1024px)",
      },
      (context) => {
        const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;

        const title = SplitText.create(".bento-title", { type: "words", mask: "words" });
        gsap.from(title.words, {
          yPercent: 110,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bento-title", start: "top 85%" },
        });

        // 1. the cards fly in from around the grid and assemble as the page scrolls
        const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
        if (wide) {
          const from = [
            { x: -220, y: 60, rotate: -9 },
            { x: 220, y: 60, rotate: 9 },
            { x: -180, y: 200, rotate: -7 },
            { x: 0, y: 260, rotate: 0 },
            { x: 180, y: 200, rotate: 7 },
          ];
          const assemble = gsap.timeline({
            scrollTrigger: { trigger: ".bento-grid", start: "top 95%", end: "top 30%", scrub: 0.6 },
          });
          cards.forEach((card, i) => {
            assemble.from(card, { ...from[i], opacity: 0, ease: "power2.out", duration: 1 }, i * 0.08);
          });
        } else {
          cards.forEach((card) => {
            gsap.from(card, {
              y: 70,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%" },
            });
          });
        }

        // 2. marker strokes sweep behind the tool names
        gsap.from(".bento-mark", {
          backgroundSize: "0% 100%",
          duration: 0.7,
          stagger: 0.25,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".bento-bio", start: "top 70%" },
        });

        // 3. the working steps light up one after another, then start again
        const steps = gsap.utils.toArray<HTMLElement>(".bento-step");
        const cycle = gsap.timeline({
          repeat: -1,
          scrollTrigger: { trigger: ".bento-steps", start: "top 75%", toggleActions: "play pause resume pause" },
        });
        steps.forEach((step) => {
          cycle.call(() => step.setAttribute("data-on", "true")).to({}, { duration: 0.9 });
        });
        cycle.to({}, { duration: 1.2 });
        cycle.call(() => steps.forEach((step) => step.setAttribute("data-on", "false"))).to({}, { duration: 0.4 });

        // 4. the tools drop into their card and bounce
        gsap.from(".bento-chip", {
          y: -220,
          rotate: () => gsap.utils.random(-50, 50),
          opacity: 0,
          duration: 1.1,
          stagger: { each: 0.08, from: "random" },
          ease: "bounce.out",
          scrollTrigger: { trigger: ".bento-tools", start: "top 65%" },
        });

        // 5. the rejected ideas get struck through
        gsap
          .timeline({ scrollTrigger: { trigger: ".bento-principles", start: "top 70%" } })
          .from(".bento-strike", { scaleX: 0, duration: 0.5, stagger: 0.35, ease: "power3.inOut" }, 0.4)
          .to(".bento-struck-word", { opacity: 0.45, duration: 0.4, stagger: 0.35 }, 0.7);

        return () => {
          title.revert();
          steps.forEach((step) => step.setAttribute("data-on", "false"));
        };
      }
    );

    // The tool chips can be picked up; they spring back when released (mouse only).
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const chips = gsap.utils.toArray<HTMLElement>(".bento-chip").flatMap((chip) =>
        Draggable.create(chip, {
          type: "x,y",
          // kept inside its own card, which clips anything beyond its edge
          bounds: chip.closest<HTMLElement>(".bento-card"),
          zIndexBoost: true,
          onDragEnd() {
            gsap.to(this.target, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
          },
        })
      );
      return () => chips.forEach((chip) => chip.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bento-about"
      className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-10 sm:pb-14 overflow-hidden"
    >
      {/* Centered Section Header — Balanced, refined typography */}
      <div className="mx-auto max-w-3xl text-center">

        <h2 className="bento-title display-2 text-[var(--text-primary)]">
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
        className="bento-grid mt-12 sm:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
        {/* ================= Row 1 ================= */}

        {/* Card 1: Profile & Bio (Left, 7 Cols) */}
        <div className="bento-card group relative lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-9 shadow-card hover:border-brand/50 hover:shadow-lift transition-[box-shadow,border-color] duration-300 overflow-hidden">

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
            <p className="bento-bio mt-7 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
              Naveed is a passionate Full Stack Developer who architects robust
              backend APIs and high-performance frontend interfaces. He
              specializes in creating seamless digital solutions using <Marked>Next.js</Marked>,{" "}
              <Marked>TypeScript</Marked>, and <Marked>Node.js</Marked>. Based in Hyderabad, Pakistan, he helps
              startups and scale-ups build reliable digital products with a
              focus on clean architecture and code quality.
            </p>
          </div>
        </div>

        {/* Card 2: How I Work (Right, 5 Cols) */}
        <div className="bento-card group relative lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:border-brand/50 hover:shadow-lift transition-[box-shadow,border-color] duration-300 overflow-hidden">

          {/* Stacked Pills — Clean & Soft Matching Reference */}
          <div className="bento-steps space-y-2.5">
            {[
              { icon: <Search className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Understanding your business first" },
              { icon: <Target className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Aligning on strategy and goals" },
              { icon: <Palette className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Concepts to pixel-perfect execution" },
              { icon: <Package className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: "Final assets, ready to launch" },
            ].map((item, idx) => (
              <div
                key={idx}
                data-on="false"
                className="bento-step flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors duration-500 hover:border-brand/40 cursor-default data-[on=true]:border-brand data-[on=true]:bg-primary data-[on=true]:text-primary-foreground [&[data-on=true]_svg]:text-primary-foreground"
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:border-brand/50 hover:shadow-lift transition-[box-shadow,border-color] duration-300 overflow-hidden">

          {/* Tool Chips Grid — Soft, Balanced Pills */}
          <div className="bento-tools space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "Figma", Icon: PenTool },
                { name: "Notion", Icon: NotebookText },
                { name: "Framer", Icon: Frame },
              ].map(({ name, Icon }) => (
                <span
                  key={name}
                  className="bento-chip inline-flex select-none items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-brand cursor-grab active:cursor-grabbing"
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
                  className="bento-chip inline-flex select-none items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-brand cursor-grab active:cursor-grabbing"
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
                  className="bento-chip inline-flex select-none items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-brand cursor-grab active:cursor-grabbing"
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:border-brand/50 hover:shadow-lift transition-[box-shadow,border-color] duration-300 overflow-hidden">

          {/* Principles Stack — Soft, Elegant Pills */}
          <div className="bento-principles space-y-2.5">
            {[
              { icon: <Eye className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: <>Clarity over <Struck>complexity</Struck></> },
              { icon: <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: <>Strategy over <Struck>trends</Struck></> },
              { icon: <Handshake className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />, text: <>Partnerships over <Struck>one-off</Struck></> },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-brand/40 cursor-default"
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
        <div className="bento-card group relative lg:col-span-4 flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-card hover:border-brand/50 hover:shadow-lift transition-[box-shadow,border-color] duration-300 overflow-hidden">

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
