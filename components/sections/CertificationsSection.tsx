"use client";

import { Badge } from "@/components/ui/Badge";

export interface CertificateItem {
  id: string;
  image?: string;
  highlighted?: boolean;
}

// Row 1 Certificates (Marquee Moving LEFT)
const row1Certificates: CertificateItem[] = [
  { id: "cert-1" },
  { id: "cert-2" },
  { id: "cert-3" },
  { id: "cert-4" },
  { id: "cert-5" },
  { id: "cert-6" },
];

// Row 2 Certificates (Marquee Moving RIGHT)
const row2Certificates: CertificateItem[] = [
  { id: "cert-7" },
  { id: "cert-8" },
  { id: "cert-9", highlighted: true }, // Highlighted center card matching reference image
  { id: "cert-10" },
  { id: "cert-11" },
  { id: "cert-12" },
];

function CertificateCard({ item }: { item: CertificateItem }) {
  return (
    <div
      className={`group relative flex w-[270px] sm:w-[330px] md:w-[370px] shrink-0 rounded-xl sm:rounded-2xl border ${
        item.highlighted
          ? "border-amber-400/90 dark:border-amber-500/80 shadow-[0_10px_30px_rgba(245,158,11,0.2)] dark:shadow-[0_10px_30px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40"
          : "border-[var(--border-subtle)] shadow-[0_6px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
      } bg-white dark:bg-[#121215] p-2 sm:p-2.5 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:z-30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:border-neutral-800 dark:hover:border-neutral-300 select-none overflow-hidden`}
    >
      {/* Dynamic Light Sweep Glint Effect on Card Hover */}
      <div className="pointer-events-none absolute inset-0 z-20 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent" />

      <div className="relative flex h-[175px] sm:h-[215px] md:h-[240px] w-full overflow-hidden rounded-lg sm:rounded-xl">
        {item.image ? (
          <img
            src={item.image}
            alt="Certificate Preview"
            className="h-full w-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          /* Pure Visual Placeholder with Required Dimensions Only */
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 border-dashed border-neutral-300/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-4 text-center transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 group-hover:bg-neutral-100/80 dark:group-hover:bg-neutral-900/80">
            {/* Subtle corner document accents */}
            <div className="absolute top-2.5 left-2.5 h-2 w-2 border-t-2 border-l-2 border-neutral-300 dark:border-neutral-700 transition-colors group-hover:border-neutral-500 dark:group-hover:border-neutral-400" />
            <div className="absolute top-2.5 right-2.5 h-2 w-2 border-t-2 border-r-2 border-neutral-300 dark:border-neutral-700 transition-colors group-hover:border-neutral-500 dark:group-hover:border-neutral-400" />
            <div className="absolute bottom-2.5 left-2.5 h-2 w-2 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-700 transition-colors group-hover:border-neutral-500 dark:group-hover:border-neutral-400" />
            <div className="absolute bottom-2.5 right-2.5 h-2 w-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 transition-colors group-hover:border-neutral-500 dark:group-hover:border-neutral-400" />

            {/* Certificate Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>

            {/* Prominent Exact Dimension Badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-black/20 dark:group-hover:ring-white/30">
              <svg
                className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="font-mono text-xs font-black tracking-wider">
                600 × 400 px
              </span>
            </div>

            <span className="mt-1.5 text-[10px] font-medium text-neutral-400 dark:text-neutral-500 transition-colors group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
              Certificate Image
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function CertificationsSection() {
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
    <section id="certifications" className="relative py-16 sm:py-24 overflow-hidden bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
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
          software engineering specializations.
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
            <CertificateCard key={`cert-row1-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* ================= Row 2: Marquee Moving RIGHT ================= */}
        <div className="flex w-max animate-marquee-right gap-4 sm:gap-5 py-2.5 mt-2 sm:mt-3">
          {fullRow2.map((item, idx) => (
            <CertificateCard key={`cert-row2-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
