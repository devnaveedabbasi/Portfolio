"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Track 1 Items (Core Full Stack & Architecture — Moving Left)
const ribbon1Items = [
  "FULL STACK SOFTWARE ENGINEER",
  "NEXT.JS 15 & REACT 19 ARCHITECT",
  "NODE.JS & TYPESCRIPT SPECIALIST",
  "DISTRIBUTED BACKEND SYSTEMS",
  "POSTGRESQL & PRISMA ORM",
  "FOUNDER OF ILMCODE",
  "REST & GRAPHQL APIS",
  "HIGH PERFORMANCE ARCHITECTURE",
];

// Track 2 Items (Cloud, DevOps, Real-Time & AI — Moving Right)
const ribbon2Items = [
  "AGENTIC AI & LLM WORKFLOWS",
  "AWS CLOUD & DOCKER CONTAINERS",
  "REDIS CACHING & WEBSOCKETS",
  "LIGHTHOUSE 100 & SUB-SECOND SPEED",
  "CLEAN CODE & DESIGN PATTERNS",
  "CI/CD AUTOMATION PIPELINES",
  "TECH KEYNOTE SPEAKER",
  "OPEN SOURCE CONTRIBUTOR",
];

export function TickerRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!track1Ref.current || !track2Ref.current || !containerRef.current) return;

      // Ribbon 1: Moves smoothly to the LEFT with scroll scrub
      gsap.to(track1Ref.current, {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Ribbon 2: Moves smoothly to the RIGHT with scroll scrub
      gsap.fromTo(
        track2Ref.current,
        { xPercent: -22 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Multiply items for continuous infinite track
  const fullTrack1 = [
    ...ribbon1Items,
    ...ribbon1Items,
    ...ribbon1Items,
    ...ribbon1Items,
  ];

  const fullTrack2 = [
    ...ribbon2Items,
    ...ribbon2Items,
    ...ribbon2Items,
    ...ribbon2Items,
  ];

  return (
    <div
      ref={containerRef}
      className="relative my-12 sm:my-16 w-full overflow-x-clip select-none pointer-events-none h-[calc(17.2vw+4.5rem)] [--cross-y:calc(8.6vw+2.25rem)] md:h-[calc(9.2vw+5rem)] md:[--cross-y:calc(4.6vw+2.5rem)] lg:h-[calc(7vw+5rem)] lg:[--cross-y:calc(3.5vw+2.5rem)]"
    >
      {/*
        An even X: both ribbons rotate around the middle of the screen (the ribbon starts
        at -20vw, so that is 70vw inside it) by equal and opposite angles, which leaves the
        same gap on both sides. Narrow screens need steeper angles to keep that gap.
      */}
      {/* Dark ribbon (in front): top left to bottom right, scrolls to the RIGHT */}
      <div className="absolute left-[-20vw] top-[var(--cross-y)] z-10 w-[140vw] -translate-y-1/2 origin-[70vw_50%] rotate-[9.75deg] md:rotate-[5.2deg] lg:rotate-[4deg] transform-gpu bg-[var(--ribbon-bg)] text-neutral-100 py-3.5 sm:py-4 shadow-sm border-y border-neutral-900">
        <div
          ref={track2Ref}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform font-display text-sm sm:text-base font-bold uppercase tracking-wide text-neutral-200"
        >
          {fullTrack2.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12 shrink-0">
              <span className="tracking-[0.1em]">{text}</span>
              <span className="text-white/55 font-bold text-base leading-none">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blue ribbon (behind): bottom left to upper right, scrolls to the LEFT */}
      <div className="absolute left-[-20vw] top-[var(--cross-y)] w-[140vw] -translate-y-1/2 origin-[70vw_50%] -rotate-[9.75deg] md:-rotate-[5.2deg] lg:-rotate-[4deg] transform-gpu bg-[var(--ribbon-accent)] text-white py-3.5 sm:py-4 shadow-sm border-y border-white/10">
        <div
          ref={track1Ref}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform font-display text-sm sm:text-base font-bold uppercase tracking-wide text-white"
        >
          {fullTrack1.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12 shrink-0">
              <span className="tracking-[0.1em]">{text}</span>
              <span className="text-white/55 font-bold text-base leading-none">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
