"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Runs GSAP work scoped to one section, and undoes it on unmount. Nothing runs for
 * visitors who ask for reduced motion, so content must be visible without it.
 */
export function useScrollAnimation(scope: RefObject<Element | null>, setup: () => void) {
  useEffect(() => {
    if (!scope.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia(scope.current);
    mm.add("(prefers-reduced-motion: no-preference)", () => setup());

    return () => mm.revert();
    // the animation is set up once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Heading words rise out of a mask when the heading comes into view. */
export function riseWords(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((heading) => {
    const split = SplitText.create(heading, { type: "words", mask: "words" });
    gsap.from(split.words, {
      yPercent: 115,
      stagger: 0.07,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: heading, start: "top 92%" },
    });
  });
}
