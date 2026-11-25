"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
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
          ? "border-black dark:border-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.15)] ring-2 ring-black/20 dark:ring-white/30"
          : "border-[var(--border-subtle)] shadow-[0_6px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
      } bg-white dark:bg-[#121215] p-2 sm:p-2.5 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:z-30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:border-black dark:hover:border-white select-none overflow-hidden cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      {/* Dynamic Light Sweep Glint Effect on Card Hover */}
      <div className="pointer-events-none absolute inset-0 z-20 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent" />

      <div className="relative flex h-[180px] sm:h-[220px] md:h-[245px] w-full overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
        {item.image ? (
          <>
            <img
              src={encodeURI(item.image)}
              alt={item.title || "Certificate Preview"}
              className="h-full w-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle Gradient & Information Overlay on Card Hover */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end">
              <span className="text-xs sm:text-sm font-extrabold text-white truncate drop-shadow-md">
                {item.title}
              </span>
              <div className="mt-0.5 flex items-center justify-between text-[11px] font-medium text-neutral-300">
                <span className="truncate">{item.issuer}</span>
                <span className="shrink-0 font-mono text-[10px] text-white/90 bg-white/20 px-1.5 py-0.5 rounded ml-2">
                  View ↗
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 border-dashed border-neutral-300/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-4 text-center">
            <span className="font-mono text-xs font-black tracking-wider text-neutral-700 dark:text-neutral-300">
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
        <div className="inline-block">
          <Badge variant="status" className="px-4 py-1.5 text-xs font-semibold">
            ✦ CERTIFICATIONS
          </Badge>
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl leading-[1.15]">
          Verified Expertise & <br />
          <span>Professional Credentials.</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
          Industry-recognized certifications, verified technical accreditations, and
          software engineering specializations. Click any certificate to preview.
        </p>
      </div>

      {/* ================= Dual Infinite Marquee ================= */}
      <div className="relative mt-10 sm:mt-14 w-full overflow-hidden select-none">
        {/* Left & Right Seamless Gradient Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-20" />

        {/* ================= Row 1: Marquee Moving LEFT ================= */}
        <div className="flex w-max animate-marquee-left gap-4 sm:gap-5 py-2.5">
          {fullRow1.map((item, idx) => (
            <CertificateCard
              key={`cert-row1-${item.id}-${idx}`}
              item={item}
              onSelect={(cert) => setSelectedCert(cert)}
            />
          ))}
        </div>

        {/* ================= Row 2: Marquee Moving RIGHT ================= */}
        <div className="flex w-max animate-marquee-right gap-4 sm:gap-5 py-2.5 mt-2 sm:mt-3">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-[#121215] border border-neutral-300 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
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
