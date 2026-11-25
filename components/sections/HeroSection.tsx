"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";
import { TechMarquee } from "@/components/ui/TechMarquee";

// Clean Google Meet SVG Icon
function GoogleMeetIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d="M15 8.5L19.5 5V19L15 15.5V8.5Z" fill="#00832D" />
      <path d="M3 6.5C3 5.12 4.12 4 5.5 4H13C14.38 4 15.5 5.12 15.5 6.5V8.5H3V6.5Z" fill="#0066DA" />
      <path d="M3 15.5H15.5V17.5C15.5 18.88 14.38 20 13 20H5.5C4.12 20 3 18.88 3 17.5V15.5Z" fill="#E53935" />
      <path d="M3 8.5H15.5V15.5H3V8.5Z" fill="#FFBA00" />
    </svg>
  );
}

// Clean Telegram Paper Plane SVG Icon
function TelegramIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10.5" fill="#229ED9" />
      <path
        d="M7.2 12.1L16.4 8.2C16.8 8 17.2 8.3 17.1 8.7L15.6 15.8C15.5 16.3 15.2 16.4 14.8 16.2L12.4 14.4L11.3 15.5C11.2 15.6 11 15.8 10.7 15.8L10.9 13.4L15.2 9.5C15.4 9.3 15.1 9.2 14.9 9.4L9.6 12.7L7.3 12.1Z"
        fill="white"
      />
    </svg>
  );
}

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

      {/* Dual CTA Buttons with Curtain Slide-up Effect & Reference Icons */}
      <div className="hero-anim-item mt-10 flex flex-wrap items-center justify-center gap-4">
        <CurtainButton
          text="Book a free call"
          variant="default"
          size="lg"
          href={personalInfo.bookingUrl}
          target="_blank"
          icon={<GoogleMeetIcon />}
        />

        <CurtainButton
          text="Let's chat"
          variant="outline"
          size="lg"
          href={`mailto:${personalInfo.email}`}
          icon={<TelegramIcon />}
        />
      </div>

      {/* Centered Floating Tech Marquee (Contained & Soft-Faded) */}
      <div className="hero-anim-item w-full">
        <TechMarquee className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
