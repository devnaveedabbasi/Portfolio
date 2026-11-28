"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";
import { SparkleIcon, ChatIcon } from "@/components/ui/Icons";
import { TechMarquee } from "@/components/ui/TechMarquee";

const ROTATING = ["scale.", "perform.", "stay fast."];

// how far from the pointer (px) a letter still reacts
const REACH = 190;

/** Text split into letters so each one can enter and react on its own. */
function Letters({ text, offset, enter = false }: { text: string; offset?: number; enter?: boolean }) {
  let index = offset ?? 0;

  return (
    <>
      {text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, c) => (
              <span
                key={c}
                className={`hero-char inline-block ${enter ? "hero-char-in" : ""}`}
                style={enter ? { animationDelay: `${index++ * 28}ms` } : undefined}
              >
                <span className="hero-lift inline-block">{char}</span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </>
  );
}

export function HeroTypeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. the last line keeps swapping its word, letter by letter
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const chars = words.map((word) => word.querySelectorAll(".hero-char"));
      gsap.set(chars.slice(1).flatMap((list) => Array.from(list)), { yPercent: 130 });
      gsap.set(words, { opacity: 1 });

      const swap = gsap.timeline({ repeat: -1, delay: 1.2 });
      words.forEach((_, i) => {
        const next = (i + 1) % words.length;
        swap
          .to(chars[i], { yPercent: -130, stagger: 0.025, duration: 0.45, ease: "power3.in" }, "+=1.8")
          .fromTo(
            chars[next],
            { yPercent: 130 },
            { yPercent: 0, stagger: 0.035, duration: 0.7, ease: "expo.out", immediateRender: false },
            "-=0.15"
          );
      });

      // 2. scrolling away pulls the lines apart
      const trigger = { trigger: section, start: "top top+=73", end: "bottom top", scrub: 0.6 };
      gsap.to(".hero-line-1", { xPercent: -14, ease: "none", scrollTrigger: trigger });
      gsap.to(".hero-line-2", { xPercent: 14, ease: "none", scrollTrigger: trigger });
      gsap.to(".hero-line-3", { scale: 1.12, ease: "none", scrollTrigger: trigger });
    });

    // 3. letters near the pointer rise and change colour, with a soft light behind
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-lift");
      let frame = 0;
      let x = 0;
      let y = 0;

      const paint = () => {
        frame = 0;
        // read every position first, then write, to avoid layout thrashing
        const strengths = letters.map((letter) => {
          const box = letter.parentElement!.getBoundingClientRect();
          const distance = Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2));
          return Math.max(0, 1 - distance / REACH);
        });

        letters.forEach((letter, i) => {
          const s = strengths[i] ** 2;
          const accent = letter.closest(".hero-word") ? "var(--text-primary)" : "var(--brand)";
          letter.style.transform = `translateY(${-0.12 * s}em) scale(${1 + 0.1 * s})`;
          letter.style.color = s ? `color-mix(in srgb, ${accent} ${Math.round(s * 100)}%, currentcolor)` : "";
        });
      };

      const move = (event: PointerEvent) => {
        x = event.clientX;
        y = event.clientY;
        const box = section.getBoundingClientRect();
        glowRef.current?.style.setProperty("transform", `translate(${x - box.left}px, ${y - box.top}px)`);
        glowRef.current?.style.setProperty("opacity", "1");
        if (!frame) frame = requestAnimationFrame(paint);
      };

      const leave = () => {
        x = y = -9999;
        glowRef.current?.style.setProperty("opacity", "0");
        if (!frame) frame = requestAnimationFrame(paint);
      };

      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", leave);

      return () => {
        cancelAnimationFrame(frame);
        section.removeEventListener("pointermove", move);
        section.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-73px)] w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-page)] px-5 pb-10 pt-14 text-center sm:px-6"
    >
      {/* pointer light: a zero-size anchor moved to the pointer, with the circle centred on it */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0 transition-opacity duration-500"
      >
        <div className="h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--brand-rgb)/0.2),transparent_65%)]" />
      </div>

      <div className="hero-rise">
        <Badge variant="status" dot>
          {personalInfo.tagline}
        </Badge>
      </div>

      <h1
        aria-label="Engineering web apps that scale and perform."
        className="mt-6 w-full select-none font-display text-[clamp(2.75rem,min(10.5vw,14svh),10rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--text-primary)]"
      >
        <span aria-hidden="true" className="hero-line-1 block">
          <Letters text="Engineering" enter />
        </span>
        <span aria-hidden="true" className="hero-line-2 block">
          <Letters text="web apps that" offset={8} enter />
        </span>
        <span aria-hidden="true" className="hero-line-3 block">
          <span className="line-reveal">
            <span style={{ animationDelay: "620ms" }}>
              {/* all words share one grid cell, so the line never changes height. The grid
                  sits one level down because .line-reveal forces its child to display block */}
              <span className="grid py-[0.1em] text-brand">
                {ROTATING.map((word, i) => (
                  <span
                    key={word}
                    className={`hero-word col-start-1 row-start-1 ${i ? "opacity-0" : ""}`}
                  >
                    <Letters text={word} />
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
      </h1>

      <p
        className="hero-rise mt-5 max-w-xl text-base text-[var(--text-secondary)] sm:text-lg"
        style={{ animationDelay: "700ms" }}
      >
        Full Stack Engineer architecting resilient backends, fluid user interfaces, and
        high-throughput database systems.
      </p>

      <div
        className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: "820ms" }}
      >
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

      <div className="hero-rise w-full" style={{ animationDelay: "940ms" }}>
        <TechMarquee className="mt-10" />
      </div>
    </section>
  );
}
