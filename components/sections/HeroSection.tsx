"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";
import { SparkleIcon, ChatIcon } from "@/components/ui/Icons";
import { TechMarquee } from "@/components/ui/TechMarquee";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const heroItems = containerRef.current?.querySelectorAll(".hero-anim-item");
      if (heroItems && heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24"
    >
      {/* Availability Status Pill (Matching Reference) */}
      <div className="hero-anim-item -mt-8">
        <Badge variant="status" dot>
          {personalInfo.tagline}
        </Badge>
      </div>

      {/* Main Headline */}
      <h1 className="hero-anim-item mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl leading-[1.08]">
        Engineering web apps <br className="hidden sm:inline" />
        <span>that scale and perform.</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-anim-item mt-6 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
        Full Stack Engineer architecting resilient backends, fluid user interfaces,
        and high-throughput database systems.
      </p>

      {/* Dual CTA Buttons with Curtain Slide-up Effect */}
      <div className="hero-anim-item mt-10 flex flex-wrap items-center justify-center gap-4">
        <CurtainButton
          text="Explore Works ↗"
          variant="default"
          size="lg"
          href="#works"
          icon={<SparkleIcon />}
        />

        <CurtainButton
          text="Get in Touch ↗"
          variant="outline"
          size="lg"
          href="#contact"
          icon={<ChatIcon />}
        />
      </div>

      {/* Centered Floating Tech Marquee (Contained & Soft-Faded) */}
      <div className="hero-anim-item w-full">
        <TechMarquee className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
