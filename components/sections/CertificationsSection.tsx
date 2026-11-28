"use client";

import { useState, useEffect } from "react";
import {
  CertificateItem,
  row1Certificates,
  row2Certificates,
} from "@/constant/data";

function CertificateCard({
  item,
  onSelect,
}: {
  item: CertificateItem;
  onSelect: (item: CertificateItem) => void;
}) {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`group relative flex w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-xl sm:rounded-2xl border ${
        item.highlighted
          ? "border-brand/60 shadow-card ring-2 ring-brand/15"
          : "border-[var(--border-subtle)] shadow-card"
      } bg-[var(--bg-card)] p-2 sm:p-2.5 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:z-30 hover:shadow-lift hover:border-brand select-none overflow-hidden cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >

      <div className="relative flex h-[180px] sm:h-[220px] md:h-[245px] w-full overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
        {item.image ? (
          <>
            <img
              src={encodeURI(item.image)}
              alt={item.title || "Certificate Preview"}
              className="h-full w-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
              width={380}
              height={245}
              loading="lazy"
            />

            {/* Subtle Gradient & Information Overlay on Card Hover */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end">
              <span className="text-xs sm:text-sm font-extrabold text-white truncate drop-shadow-md">
                {item.title}
              </span>
              <div className="mt-0.5 flex items-center justify-between text-xs font-medium text-neutral-300">
                <span className="truncate">{item.issuer}</span>
                <span className="shrink-0 tabular-nums text-[11px] text-white/90 bg-white/20 px-1.5 py-0.5 rounded ml-2">
                  View ↗
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 border-dashed border-neutral-300/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-4 text-center">
            <span className="tabular-nums text-xs font-black tracking-wider text-neutral-700 dark:text-neutral-300">
              Certificate Image
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Multiply items for smooth, continuous, infinite loop
  const fullRow1 = [
    ...row1Certificates,
    ...row1Certificates,
    ...row1Certificates,
  ];
  const fullRow2 = [
    ...row2Certificates,
    ...row2Certificates,
    ...row2Certificates,
  ];

  return (
    <section
      id="certifications"
      className="relative py-16 sm:py-24 overflow-hidden bg-[var(--bg-page)] border-t border-[var(--border-subtle)]"
    >
      {/* Centered Section Header */}
      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="display-2 text-[var(--text-primary)]">
          Certifications
        </h2>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
          Click any certificate to preview it.
        </p>
      </div>

      {/* ================= Dual Infinite Marquee ================= */}
      <div className="relative mt-10 sm:mt-14 w-full overflow-hidden select-none">
        {/* Left & Right Seamless Gradient Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-20" />

        {/* ================= Row 1: Marquee Moving LEFT ================= */}
        <div className="flex w-max animate-marquee-left gap-[var(--marquee-gap)] py-2.5 [--marquee-gap:1rem] sm:[--marquee-gap:1.25rem]">
          {fullRow1.map((item, idx) => (
            <CertificateCard
              key={`cert-row1-${item.id}-${idx}`}
              item={item}
              onSelect={(cert) => setSelectedCert(cert)}
            />
          ))}
        </div>

        {/* ================= Row 2: Marquee Moving RIGHT ================= */}
        <div className="flex w-max animate-marquee-right gap-[var(--marquee-gap)] py-2.5 mt-2 sm:mt-3 [--marquee-gap:1rem] sm:[--marquee-gap:1.25rem]">
          {fullRow2.map((item, idx) => (
            <CertificateCard
              key={`cert-row2-${item.id}-${idx}`}
              item={item}
              onSelect={(cert) => setSelectedCert(cert)}
            />
          ))}
        </div>
      </div>

      {/* ================= Lightbox Modal for Full View ================= */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overscroll-contain bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[var(--bg-card)] border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title and Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {selectedCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Issued by {selectedCert.issuer}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            {/* Certificate High-Res Image View */}
            <div className="mt-4 flex items-center justify-center overflow-hidden rounded-xl bg-neutral-100 dark:bg-black/50 max-h-[75vh]">
              <img
                src={encodeURI(selectedCert.image)}
                alt={selectedCert.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
