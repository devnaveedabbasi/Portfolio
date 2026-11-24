import * as React from "react";

export interface TechBrand {
  name: string;
  icon: React.ReactNode;
}

export const defaultTechBrands: TechBrand[] = [
  {
    name: "Taskgen",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.5 4a1.5 1.5 0 0 1 3 0v6.5H20a1.5 1.5 0 0 1 0 3h-6.5V20a1.5 1.5 0 0 1-3 0v-6.5H4a1.5 1.5 0 0 1 0-3h6.5V4z" />
      </svg>
    ),
  },
  {
    name: "Trackly",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2L5 13.5h6L9.5 22 19 10.5h-6.5L14 2z" />
      </svg>
    ),
  },
  {
    name: "Finte",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 3C11.5 3.5 4 11 4 20.5 13.5 20 21 12.5 21 3z" />
      </svg>
    ),
  },
  {
    name: "Proofly",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.665 21.978C16.808 23.255 14.502 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.584-1.574 6.801-4.067 9.001L9.006 7.2H6.93v11.6h1.74v-8.835l9.995 12.013zM15.333 7.2h1.74v7.467h-1.74V7.2z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.15" />
        <path d="M4 8h8v2.5H9.5V18H6.5v-7.5H4V8zm10.5 4.5c.8 0 1.5.2 2 .5l-.5 2c-.5-.3-1-.5-1.5-.5-.6 0-1 .2-1 .6 0 .4.3.6 1.2.9 1.4.5 2.1 1.2 2.1 2.4 0 1.6-1.2 2.6-3 2.6-1 0-1.9-.3-2.6-.7l.6-2c.6.4 1.4.7 2 .7.7 0 1.1-.3 1.1-.7 0-.4-.4-.6-1.2-.9-1.5-.5-2.1-1.3-2.1-2.4 0-1.5 1.1-2.5 3-2.5z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
        <path d="M12 22V12" />
        <path d="M20.5 7L12 12 3.5 7" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6c0-2 3-4 8-4s8 2 8 4-3 4-8 4-8-2-8-4z" />
        <path d="M4 6v6c0 2 3 4 8 4s8-2 8-4V6" />
        <path d="M4 12v6c0 2 3 4 8 4s8-2 8-4v-6" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="10" width="3" height="3" />
        <rect x="7" y="10" width="3" height="3" />
        <rect x="11" y="10" width="3" height="3" />
        <rect x="7" y="6" width="3" height="3" />
        <rect x="11" y="6" width="3" height="3" />
        <rect x="15" y="10" width="3" height="3" />
        <path d="M2 14c1 2 4 4 10 4s9-2 10-4v-1H2v1z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
];

export interface TechMarqueeProps {
  brands?: TechBrand[];
  className?: string;
}

export function TechMarquee({
  brands = defaultTechBrands,
  className = "",
}: TechMarqueeProps) {
  // Multiply items to ensure continuous infinite scrolling
  const fullTrack = [...brands, ...brands, ...brands];

  return (
    <div
      className={`relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto overflow-hidden py-3 select-none ${className}`}
    >
      {/* Left Soft Fade Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 sm:w-28 bg-gradient-to-r from-[var(--bg-page)] to-transparent"
      />

      {/* Right Soft Fade Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 sm:w-28 bg-gradient-to-l from-[var(--bg-page)] to-transparent"
      />

      {/* Scrolling Logomarks Track */}
      <div className="flex select-none">
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 whitespace-nowrap">
          {fullTrack.map((brand, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2.5 text-neutral-400 dark:text-neutral-500 opacity-75 transition-all duration-200 hover:opacity-100 hover:text-[var(--text-primary)]"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center transition-transform group-hover:scale-110">
                {brand.icon}
              </span>
              <span className="text-sm sm:text-base font-bold tracking-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
