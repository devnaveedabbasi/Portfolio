"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { personalInfo, socialLinks } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";
import { ColorFillPhoto } from "@/components/ui/ColorFillPhoto";

const FACTS = [
  { label: "Based in", value: personalInfo.location },
  { label: "Experience", value: "2 years" },
  { label: "Role", value: "Full Stack Developer" },
  { label: "Timezone", value: personalInfo.timezone },
];

/** A tool name that fills in the accent colour while the rest fills in ink. */
function Tool({ children }: { children: string }) {
  return <span className="font-bold text-brand">{children}</span>;
}

export function AboutProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const github = socialLinks.find((link) => link.name === "GitHub");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia(section);

    // Everything is fully visible without JavaScript or with reduced motion.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. heading words rise out of a mask
      const title = SplitText.create(".about-title", { type: "words", mask: "words" });
      gsap.from(title.words, {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      });

      // 2. the copy fills with colour word by word as the page scrolls
      const copy = SplitText.create(".about-fill", { type: "words", aria: "none" });
      gsap.fromTo(
        copy.words,
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top 82%",
            end: "bottom 48%",
            scrub: 0.4,
          },
        }
      );

      // 3. fact rows: the rule draws, then the text slides up
      gsap
        .timeline({ scrollTrigger: { trigger: ".about-facts", start: "top 88%" } })
        .from(".about-rule", { scaleX: 0, duration: 0.9, stagger: 0.08, ease: "power3.inOut" })
        .from(".about-fact", { y: 18, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.7");

      return () => {
        title.revert();
        copy.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
        <div className="lg:col-span-5">
          <ColorFillPhoto />
        </div>

        <div className="lg:col-span-7">
          <h2 className="about-title display-2 text-[var(--text-primary)]">
            Hi, I am {personalInfo.name}
          </h2>

          <div className="about-copy">
            <p className="about-fill mt-6 max-w-2xl text-xl leading-relaxed text-[var(--text-primary)] sm:text-2xl">
              I am a full stack developer with <Tool>2 years</Tool> of experience. Most of my work
              is in <Tool>Node.js</Tool>, <Tool>Next.js</Tool> and <Tool>TypeScript</Tool>, with{" "}
              <Tool>MongoDB</Tool> or <Tool>PostgreSQL</Tool> and <Tool>Prisma</Tool> behind them.
            </p>
            <p className="about-fill mt-5 max-w-2xl text-xl leading-relaxed text-[var(--text-primary)] sm:text-2xl">
              I build both sides of a web app: the screens people use, the APIs behind them and the
              database that holds it together.
            </p>
          </div>

          <dl className="about-facts mt-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
            {FACTS.map((fact) => (
              <div key={fact.label} className="relative py-4">
                <span
                  aria-hidden="true"
                  className="about-rule absolute inset-x-0 top-0 h-px origin-left bg-[var(--border-default)]"
                />
                <div className="about-fact flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-[var(--text-muted)]">{fact.label}</dt>
                  <dd className="text-right text-base font-bold text-[var(--text-primary)]">
                    {fact.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CurtainButton text="Get in Touch ↗" size="lg" href="/#contact" />
            {github && (
              <CurtainButton
                text="GitHub ↗"
                variant="outline"
                size="lg"
                href={github.href}
                target="_blank"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
