"use client";

// A scroll-pinned project showcase.
//
// The section is tall; inside it a sticky stage stays on screen while you
// scroll. Every STEP_VH of scroll hands the stage to the next project: the
// cover is revealed with a clip-path wipe, the title slides up out of a mask,
// the counter rolls. Nothing hijacks the wheel - the page scrolls natively and
// carries on normally after the last project.
//
// The only state is `active`, derived from scroll position.
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface WorksShowcaseItem {
  title: string;
  image: string;
  href: string;
  /** e.g. "Web App" */
  type?: string;
  /** e.g. "3 months" */
  timeline?: string;
  description?: string;
  tags?: string[];
  liveUrl?: string;
}

export interface WorksShowcaseProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksShowcaseItem[];
  /** Small eyebrow above the counter. */
  label?: string;
  /** Text of the pill that appears on the cover on hover. */
  action?: string;
  accentColor?: string;
}

/** Scroll distance (in vh) that one project occupies. */
const STEP_VH = 85;
const EASE = "cubic-bezier(0.77, 0, 0.18, 1)";
const REVEAL_MS = 900;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const pad = (n: number) => String(n).padStart(2, "0");

export function WorksShowcase({
  items,
  label = "Selected Work",
  action = "View project",
  accentColor = "#a855f7",
  className,
  style,
  ...props
}: WorksShowcaseProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  // Scroll position -> active index. One rAF-throttled passive listener.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || !count) return;
    let raf = 0;

    const read = () => {
      raf = 0;
      const step = (window.innerHeight * STEP_VH) / 100;
      const scrolled = -el.getBoundingClientRect().top;
      const next = clamp(Math.round(scrolled / step), 0, last);
      setActive((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count, last]);

  const goTo = React.useCallback(
    (index: number) => {
      const el = rootRef.current;
      if (!el) return;
      const step = (window.innerHeight * STEP_VH) / 100;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + clamp(index, 0, last) * step,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [last, reduced],
  );

  if (!count) return null;

  const t = (ms: number, delay = 0) =>
    reduced ? "none" : `${ms}ms ${EASE} ${delay}ms`;

  /** Fade + rise for secondary text. Items before the active one leave
      upward, items after it wait below. */
  const rise = (i: number, delay: number): React.CSSProperties => {
    const on = i === active;
    const off = i > active ? 22 : -22;
    return {
      opacity: on ? 1 : 0,
      transform: `translateY(${on ? 0 : off}px)`,
      transition: reduced
        ? "none"
        : `opacity 600ms ease ${on ? delay : 0}ms, transform 700ms ${EASE} ${
            on ? delay : 0
          }ms`,
    };
  };

  return (
    <section
      ref={rootRef}
      aria-label={label}
      className={cn("relative w-full bg-[#0a0a0a] text-white", className)}
      style={
        {
          "--showcase-accent": accentColor,
          height: `calc(100vh + ${last * STEP_VH}vh)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Accent glow that drifts as the project changes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[20%]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--showcase-accent) 20%, transparent), transparent 55%)",
            transform: `translateX(${active % 2 ? 10 : -10}%) translateY(${
              active % 3 === 0 ? -4 : 4
            }%)`,
            transition: reduced ? "none" : `transform 1400ms ${EASE}`,
          }}
        />

        <div className="relative z-[1] flex h-full flex-col gap-4 px-5 pb-5 pt-24 lg:flex-row lg:items-stretch lg:gap-10 lg:px-12 lg:pb-10 lg:pt-28">
          {/* Cover */}
          <div className="relative order-1 h-[40svh] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:h-[44svh] lg:order-2 lg:h-auto lg:flex-[1.8]">
            {items.map((item, i) => {
              const on = i === active;
              const clip =
                i === active
                  ? "inset(0% 0% 0% 0%)"
                  : i > active
                    ? "inset(100% 0% 0% 0%)"
                    : "inset(0% 0% 100% 0%)";
              return (
                <Link
                  key={`${item.href}-${i}`}
                  href={item.href}
                  tabIndex={on ? 0 : -1}
                  aria-hidden={!on}
                  aria-label={`Open ${item.title}`}
                  className={cn(
                    "group absolute inset-0 block outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--showcase-accent)]",
                    !on && "pointer-events-none",
                  )}
                  style={{
                    clipPath: clip,
                    transition: reduced ? "none" : `clip-path ${REVEAL_MS}ms ${EASE}`,
                    zIndex: on ? 2 : 1,
                  }}
                >
                  <img
                    src={item.image}
                    alt={on ? item.title : ""}
                    draggable={false}
                    decoding="async"
                    className="size-full object-cover"
                    style={{
                      transform: `translateY(${
                        on ? 0 : i > active ? 8 : -8
                      }%) scale(${on ? 1 : 1.18})`,
                      transition: reduced ? "none" : `transform 1400ms ${EASE}`,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                  <span className="pointer-events-none absolute bottom-4 right-4 flex translate-y-1 items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {action}
                    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                      <path
                        d="M3 9 9 3M4 3h5v5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Text */}
          <div className="order-2 flex min-h-0 flex-1 flex-col lg:order-1 lg:flex-[0.95] lg:justify-center">
            <div className="mb-3 flex items-center gap-3 lg:mb-8">
              <span
                className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: "var(--showcase-accent)" }}
              >
                {label}
              </span>
              <span className="h-px w-10 bg-white/20" />
              <div
                className="flex items-baseline gap-1.5 font-medium tabular-nums"
                aria-hidden="true"
              >
                <span className="block h-[1.4em] overflow-hidden text-sm leading-[1.4em] text-white">
                  <span
                    className="block"
                    style={{
                      transform: `translateY(${-active * 1.4}em)`,
                      transition: reduced ? "none" : `transform 700ms ${EASE}`,
                    }}
                  >
                    {items.map((_, i) => (
                      <span key={i} className="block h-[1.4em]">
                        {pad(i + 1)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-sm text-white/35">/ {pad(count)}</span>
              </div>
            </div>

            <div className="grid">
              {items.map((item, i) => {
                const on = i === active;
                return (
                  <div
                    key={`${item.href}-${i}`}
                    aria-hidden={!on}
                    className={cn(
                      "col-start-1 row-start-1 flex flex-col justify-start lg:justify-center",
                      !on && "pointer-events-none",
                    )}
                  >
                    {(item.type || item.timeline) && (
                      <p
                        className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50 lg:mb-4 lg:text-sm"
                        style={rise(i, 80)}
                      >
                        {[item.type, item.timeline].filter(Boolean).join("  ·  ")}
                      </p>
                    )}

                    {/* Mask: the title slides up out of a clipped line. */}
                    <div className="overflow-hidden pb-[0.12em]">
                      <h2
                        className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl"
                        style={{
                          transform: `translateY(${
                            on ? 0 : i > active ? 110 : -110
                          }%)`,
                          transition: t(REVEAL_MS - 100, on ? 120 : 0),
                        }}
                      >
                        {item.title}
                      </h2>
                    </div>

                    {item.description && (
                      <p
                        className="mt-3 line-clamp-3 max-w-md text-sm leading-relaxed text-stone-300/85 lg:mt-5 lg:text-base"
                        style={rise(i, 220)}
                      >
                        {item.description}
                      </p>
                    )}

                    {item.tags && item.tags.length > 0 && (
                      <ul
                        className="mt-4 flex flex-wrap gap-1.5 lg:mt-6 lg:gap-2"
                        style={rise(i, 300)}
                      >
                        {item.tags.slice(0, 5).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.68rem] text-white/75 lg:text-xs"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      className="mt-5 flex items-center gap-3 lg:mt-8"
                      style={rise(i, 380)}
                    >
                      <Link
                        href={item.href}
                        tabIndex={on ? 0 : -1}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black outline-none transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:text-sm"
                        style={{ background: "var(--showcase-accent)" }}
                      >
                        {action}
                        <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={on ? 0 : -1}
                          className="text-xs uppercase tracking-wider text-white/60 underline-offset-4 outline-none transition hover:text-white hover:underline focus-visible:underline lg:text-sm"
                        >
                          Live site
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile progress dots */}
            <div className="mt-auto flex justify-center gap-2 pt-4 lg:hidden">
              {items.map((item, i) => (
                <button
                  key={`${item.href}-dot-${i}`}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  aria-current={i === active}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 22 : 6,
                    background:
                      i === active
                        ? "var(--showcase-accent)"
                        : "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop index rail */}
          <nav
            aria-label={`${label} index`}
            className="order-3 hidden w-44 shrink-0 flex-col justify-center lg:flex xl:w-52"
          >
            <div className="relative border-l border-white/10 pl-5">
              <span
                aria-hidden="true"
                className="absolute -left-px top-0 w-px"
                style={{
                  height: `${count > 1 ? (active / last) * 100 : 100}%`,
                  background: "var(--showcase-accent)",
                  transition: reduced ? "none" : `height 700ms ${EASE}`,
                }}
              />
              <ol className="flex flex-col gap-2.5">
                {items.map((item, i) => (
                  <li key={`${item.href}-idx-${i}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                      className={cn(
                        "w-full cursor-pointer truncate text-left text-sm outline-none transition-all duration-500 hover:text-white focus-visible:text-white",
                        i === active
                          ? "translate-x-1 font-medium"
                          : "text-white/40",
                      )}
                      style={
                        i === active
                          ? { color: "var(--showcase-accent)" }
                          : undefined
                      }
                    >
                      <span className="mr-2 text-[0.65rem] tabular-nums opacity-60">
                        {pad(i + 1)}
                      </span>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>

        <p className="sr-only" aria-live="polite">
          {items[active]?.title}
        </p>
      </div>
    </section>
  );
}

export default WorksShowcase;