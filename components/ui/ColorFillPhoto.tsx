"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/constant/data";

const PHOTO = "/assets/img/NaveedAbbasi.jpg";
const FRAME =
  "relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-card";
const SIZES = "(max-width: 1024px) 100vw, 420px";

/** Black and white photo, with colour filling in from the top as the page scrolls. */
export function ColorFillPhoto() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(frameRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".photo-colour",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={frameRef} className={FRAME}>
      <Image src={PHOTO} alt={personalInfo.name} fill sizes={SIZES} className="object-cover object-top grayscale" />
      <div className="photo-colour absolute inset-0" aria-hidden="true">
        <Image src={PHOTO} alt="" fill sizes={SIZES} className="object-cover object-top" />
      </div>
    </div>
  );
}
