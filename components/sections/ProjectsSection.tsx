"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurtainButton } from "@/components/ui/curtain-button";
import { projectsData, Project } from "@/constant/data";
import { riseWords, useScrollAnimation } from "@/lib/useScrollAnimation";

// 4 Featured Projects for the Homepage Staggered Grid
const col1Projects = [projectsData[0], projectsData[3]]; // Aurelia, Lumen
const col2Projects = [projectsData[1], projectsData[4]]; // IlmCode, Chronos

// Reusable Project Card with Mirelle-style Curtain Unveil & Parallax Scale
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card group flex flex-col">
      {/* 
        Mirelle-Style Curtain Reveal Frame:
        - Outer box acts as the clipping curtain mask
        - Inner media scales from 1.25 -> 1.0 with scroll scrub
      */}
      <Link href={`/projects/${project.id}`} data-cursor="view" className="block overflow-hidden rounded-3xl">
        <div className="project-curtain-mask relative w-full aspect-[4/3] rounded-3xl bg-[var(--bg-card)] border border-neutral-800/80 p-2 sm:p-2.5 shadow-2xl overflow-hidden transition-colors duration-500 group-hover:border-neutral-700">
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[var(--bg-card-subtle)]">
            {/* Inner Media Element with GSAP Parallax Scrub & Hover Scale */}
            <div className="project-inner-media relative w-full h-full will-change-transform transition-transform duration-700 ease-out group-hover:scale-105">
              {/* Architectural Image Placeholder with Clean Camera & Dimension Tag */}
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-800/80 bg-[var(--bg-card)] p-6 text-center transition-all duration-300 group-hover:border-neutral-700 group-hover:bg-[var(--bg-card-subtle)]">
                {/* L-bracket corner marks */}
                <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-neutral-700 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-neutral-700 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-neutral-700 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-neutral-700 group-hover:border-neutral-500 transition-colors" />

                {/* Central Media / Image Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800/90 text-neutral-400 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>

                {/* Prominent Exact Dimension Badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-1.5 shadow-lg transition-transform group-hover:scale-105">
                  <span className="h-2 w-2 rounded-full bg-neutral-800 animate-pulse" />
                  <span className="font-mono text-xs font-black tracking-wider">
                    {project.recommendedSize}
                  </span>
                </div>

                {/* Label */}
                <span className="mt-2 text-xs font-bold text-neutral-300 tracking-wide">
                  {project.title} Preview
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  Click to view full case study
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Metadata Info Below Card */}
      <div className="project-meta mt-6 sm:mt-8 flex flex-col text-white">
        {/* Category & Year */}
        <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        {/* Project Title */}
        <Link href={`/projects/${project.id}`} className="group/title">
          <h4 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover/title:text-neutral-300 transition-colors">
            {project.title}
          </h4>
        </Link>

        {/* Description */}
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-neutral-400 max-w-lg">
          {project.description}
        </p>

        {/* Action Pill Button with Curtain Effect */}
        <div className="mt-5">
          <CurtainButton
            text="View Case Study ↗"
            variant="outline"
            size="sm"
            href={`/projects/${project.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Mirelle-Style Curtain Reveal (Clip-Path & Vertical Glide)
      const curtainMasks = gsap.utils.toArray<HTMLElement>(".project-curtain-mask");
      curtainMasks.forEach((mask) => {
        gsap.fromTo(
          mask,
          {
            clipPath: "inset(0% 0% 55% 0% round 24px)",
            y: 60,
            opacity: 0.4,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mask,
              start: "top 92%",
              end: "top 45%",
              scrub: 1.1,
            },
          }
        );
      });

      // 2. Mirelle-Style Inner Media Parallax Scrub (Scale 1.22 -> 1.0 & Y-Drift)
      const innerMedias = gsap.utils.toArray<HTMLElement>(".project-inner-media");
      innerMedias.forEach((media) => {
        gsap.fromTo(
          media,
          {
            scale: 1.22,
            yPercent: -8,
          },
          {
            scale: 1.0,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: media.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // 3. Staggered Column 2 Differential Parallax for Desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (!col2Ref.current || !sectionRef.current) return;

        gsap.to(col2Ref.current, {
          y: -110,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useScrollAnimation(sectionRef, () => {
    riseWords(".works-title");
    gsap.from(".works-cta", {
      scale: 0,
      rotate: -25,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: { trigger: ".works-cta", start: "top 90%" },
    });
    // the details under each preview arrive line by line
    gsap.utils.toArray<HTMLElement>(".project-meta").forEach((meta) => {
      gsap.from(meta.children, {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: meta, start: "top 92%" },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      id="works"
      className="dark band relative bg-[var(--bg-page)] text-white py-24 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-neutral-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= Header Row ================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-16 sm:pb-24 border-b border-neutral-900">
          <div>

            {/* Massive Bold Heading */}
            <h2 className="works-title display-1 text-white">
              Selected projects
            </h2>
          </div>

          {/* Top Right Grid Marks & View All Work Pill Button */}
          <div className="flex items-center gap-8 self-start md:self-auto">
            {/* Grid Plus Marks */}
            <div className="hidden lg:flex items-center gap-12 text-neutral-600 tabular-nums text-sm select-none">
              <span>+</span>
              <span>+</span>
            </div>

            {/* Pill CTA Button with Curtain Effect */}
            <div className="works-cta">
              <CurtainButton
                text="View All Work"
                variant="default"
                size="lg"
                href="/projects"
                icon={<span className="text-base font-bold">↗</span>}
              />
            </div>
          </div>
        </div>

        {/* ================= Staggered 2-Column Parallax Grid ================= */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-18 lg:gap-24">
          {/* ================= COLUMN 1 (Left Column) ================= */}
          <div ref={col1Ref} className="flex flex-col gap-18 sm:gap-24">
            {col1Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* ================= COLUMN 2 (Right Column — Staggered & Offset Down) ================= */}
          <div
            ref={col2Ref}
            className="flex flex-col gap-18 sm:gap-24 md:mt-32 lg:mt-40"
          >
            {col2Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
