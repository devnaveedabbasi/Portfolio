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
      className="relative my-12 sm:my-16 w-full overflow-hidden py-4 select-none pointer-events-none space-y-3 sm:space-y-4"
    >
      {/* Ribbon 1: Tilted Left (-2.2deg), Scrolls to the LEFT */}
      <div className="w-[140vw] -ml-[20vw] -rotate-2 sm:-rotate-[2.2deg] transform-gpu bg-black text-white py-3.5 sm:py-4 shadow-sm border-y border-neutral-900">
        <div
          ref={track1Ref}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-100"
        >
          {fullTrack1.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12 shrink-0">
              <span className="tracking-[0.18em]">{text}</span>
              <span className="text-neutral-500 font-bold text-base leading-none">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ribbon 2: Tilted Counter-Angle (+1.6deg), Scrolls to the RIGHT */}
      <div className="w-[140vw] -ml-[20vw] rotate-1 sm:rotate-[1.6deg] transform-gpu bg-black text-neutral-100 py-3.5 sm:py-4 shadow-sm border-y border-neutral-900">
        <div
          ref={track2Ref}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-200"
        >
          {fullTrack2.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12 shrink-0">
              <span className="tracking-[0.18em]">{text}</span>
              <span className="text-neutral-500 font-bold text-base leading-none">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
