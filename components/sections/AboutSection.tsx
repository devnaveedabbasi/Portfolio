"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left Column slides in smoothly from Left on scroll
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Right Column slides in smoothly from Right on scroll
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
      id="about"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32 overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Left Column — Bio & Stats (Glides in from Left) */}
        <div ref={leftColRef} className="lg:col-span-7">
          <Badge variant="default">ABOUT ME</Badge>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Hi, I am <span>{personalInfo.name}</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            A software engineer dedicated to building scalable web applications with
            meticulous attention to performance, architecture, and user experience.
            I bridge the gap between complex backend systems and fluid client-side interfaces.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Over the past 6+ years, I&apos;ve collaborated with teams and clients worldwide to
            turn ambitious technical ideas into robust, production-grade applications that
            serve thousands of active users.
          </p>

          {/* Stat Cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-6 transition-transform duration-300 hover:scale-[1.02]">
              <div className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl">
                {personalInfo.experienceYears}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Engineering Experience
              </div>
            </Card>

            <Card className="p-6 transition-transform duration-300 hover:scale-[1.02]">
              <div className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl">
                {personalInfo.projectsDelivered}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Projects Delivered
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column — Professional Portrait (Glides in from Right) */}
        <div ref={rightColRef} className="lg:col-span-5 flex justify-center">
          <div className="group relative w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
            <Image
              src="/assets/img/NaveedAbbasi.jpg"
              alt={personalInfo.name}
              fill
              priority
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Bottom Subtle Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Floating Info Overlays */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white mb-3">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span>Available for projects</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {personalInfo.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-300 font-medium">
                Full Stack Software Engineer · {personalInfo.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
