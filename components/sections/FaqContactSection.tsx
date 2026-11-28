"use client";

import { useRef } from "react";
import gsap from "gsap";
import { personalInfo, faqData } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";
import { GoogleMeetIcon, MailIcon } from "@/components/ui/Icons";
import { Accordion } from "@/components/ui/Accordion";
import { Zap } from "lucide-react";
import { riseWords, useScrollAnimation } from "@/lib/useScrollAnimation";

export function FaqContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimation(sectionRef, () => {
    riseWords(".contact-title, .faq-title");
    gsap.from(".contact-after > :not(.contact-title)", {
      y: 34,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-title", start: "top 78%" },
    });
    // questions swing in from the right, one under the other
    gsap.from(".faq-item", {
      x: 110,
      rotate: 4,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".faq-title", start: "top 80%" },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto max-w-7xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column — Contact CTA (Glides in from Left) */}
        <div className="contact-after lg:col-span-5">
          <h2 className="contact-title display-2 lg:text-[2.75rem] text-[var(--text-primary)]">
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
            <Zap className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>Typically responds within 2-4 hours.</span>
          </div>
        </div>

        {/* Right Column — FAQ Accordion with Stable Clamped Height */}
        <div className="lg:col-span-7 min-h-[740px] sm:min-h-[700px] flex flex-col justify-start">
          <h3 className="faq-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-8 sm:mb-10">
            Frequently Asked Questions
          </h3>

          <Accordion items={faqData} />
        </div>
      </div>
    </section>
  );
}
