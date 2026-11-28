"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface AccordionItemData {
  question: string;
  answer: string;
}

interface AccordionRowProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionRow({ item, isOpen, onToggle }: AccordionRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;
    const content = contentRef.current;
    const icon = iconRef.current;

    // Handle initial mount without visual layout jump
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (isOpen) {
        gsap.set(content, { height: "auto", opacity: 1 });
        gsap.set(icon, { rotation: 45 });
      } else {
        gsap.set(content, { height: 0, opacity: 0 });
        gsap.set(icon, { rotation: 0 });
      }
      return;
    }

    gsap.killTweensOf([content, icon]);

    if (isOpen) {
      // Animate smoothly to scrollHeight, then lock to "auto"
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: content.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(content, { height: "auto" });
          },
        }
      );

      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Close smoothly from current pixel height down to 0 (zero jank)
      const currentHeight = content.offsetHeight || content.scrollHeight;
      gsap.fromTo(
        content,
        { height: currentHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );

      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-item overflow-hidden rounded-2xl border transition-colors duration-200 ${
        isOpen
          ? "bg-[var(--bg-card)] border-brand/45 shadow-card"
          : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-brand/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-7 py-5.5 sm:py-6 text-left text-base sm:text-lg font-bold text-[var(--text-primary)] cursor-pointer group select-none"
        aria-expanded={isOpen}
      >
        <span className="transition-colors group-hover:text-brand">
          {item.question}
        </span>
        <div
          ref={iconRef}
          className={`ml-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] transition-colors duration-200 ${
            isOpen
              ? "bg-primary text-primary-foreground border-transparent"
              : "group-hover:border-brand group-hover:text-brand"
          }`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="border-t border-[var(--border-subtle)] px-7 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4 sm:space-y-5 min-h-[640px] sm:min-h-[600px] flex flex-col justify-start">
      {items.map((item, index) => (
        <AccordionRow
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
