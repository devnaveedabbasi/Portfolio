"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, faqData } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";
import { GoogleMeetIcon, MailIcon } from "@/components/ui/Icons";
import { Accordion } from "@/components/ui/Accordion";

export function FaqContactSection() {
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
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
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
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
            },
          }
        );

        // Stagger reveal individual FAQ accordion items
        const faqItems = rightColRef.current.querySelectorAll(".faq-item");
        if (faqItems.length > 0) {
          gsap.fromTo(
            faqItems,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.65,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto max-w-7xl px-6 pt-28 pb-40 sm:pt-36 sm:pb-48 lg:pt-40 lg:pb-56 min-h-[1550px] sm:min-h-[1480px] lg:min-h-[1050px] xl:min-h-[1100px] overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column — Contact CTA (Glides in from Left) */}
        <div ref={leftColRef} className="lg:col-span-5">
          <Badge variant="default">CONTACT</Badge>

          <h2 className="mt-7 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl leading-[1.08]">
            Have a project in mind? <br />
            Let&apos;s make it real.
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            Whether you&apos;re starting from scratch, scaling existing infrastructure, or needing a
            dedicated technical partner, I&apos;m always open to discussing new opportunities.
          </p>

          {/* Action Dual Curtain Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CurtainButton
              text="Schedule a Call ↗"
              variant="default"
              size="lg"
              href={personalInfo.bookingUrl}
              target="_blank"
              icon={<GoogleMeetIcon />}
            />

            <CurtainButton
              text="Send an Email ↗"
              variant="outline"
              size="lg"
              href={`mailto:${personalInfo.email}`}
              icon={<MailIcon />}
            />
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--text-muted)]">
            <span>⚡</span>
            <span>Typically responds within 2-4 hours.</span>
          </div>
        </div>

        {/* Right Column — FAQ Accordion with Stable Clamped Height */}
        <div ref={rightColRef} className="lg:col-span-7 min-h-[740px] sm:min-h-[700px] flex flex-col justify-start">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mb-8 sm:mb-10">
            Frequently Asked Questions
          </h3>

          <Accordion items={faqData} />
        </div>
      </div>
    </section>
  );
}
