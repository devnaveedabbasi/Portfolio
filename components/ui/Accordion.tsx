"use client";

import { useState } from "react";

export interface AccordionItemData {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all hover:border-[var(--border-default)]"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-bold text-[var(--text-primary)]"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)] transition-transform">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-[var(--border-subtle)] px-6 pb-6 pt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
