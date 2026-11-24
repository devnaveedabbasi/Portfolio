"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ribbonItems = [
  "FULL STACK DEVELOPER",
  "FOUNDER OF ILMCODE",
  "AGENTIC AI ENGINEER",
  "TECH KEYNOTE SPEAKER",
  "NEXT.JS & CLOUD ARCHITECT",
  "OPEN SOURCE CONTRIBUTOR",
  "HIGH PERFORMANCE SYSTEMS",
];

export function TickerRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      // Moves smoothly with scroll scrub; stops when scrolling stops
      gsap.to(trackRef.current, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Repeat items so there is a long, continuous track
  const fullTrack = [
    ...ribbonItems,
    ...ribbonItems,
    ...ribbonItems,
    ...ribbonItems,
  ];

  return (
    <div
      ref={containerRef}
      className="relative my-8 sm:my-14 w-full overflow-hidden py-6 sm:py-10 select-none pointer-events-none"
    >
      {/* Rotated ribbon strip spanning beyond viewport edges */}
      <div className="w-[125vw] -ml-[12.5vw] -rotate-2 sm:-rotate-[2.2deg] transform-gpu bg-black text-white py-4 sm:py-4.5 shadow-2xl border-y border-neutral-900">
        <div
          ref={trackRef}
          className="flex items-center gap-8 sm:gap-10 whitespace-nowrap will-change-transform text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-100"
        >
          {fullTrack.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10 shrink-0">
              <span className="tracking-[0.16em]">{text}</span>
              <span className="text-neutral-500 font-bold text-base leading-none">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
