"use client";

// Project detail page: hero, quick facts, problem/solution/result, a scroll
// pinned feature walkthrough, mockup gallery with lightbox, challenges,
// testimonial, next project and a closing CTA.
//
// Every optional field (client, results, challenges, testimonial...) hides its
// section when missing, so half-filled projects never show empty blocks.
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type {
  NextProjectData,
  ProjectDetailData,
  ProjectGalleryItem,
} from "@/component/project-detail";

export interface ProjectDetailProps {
  project: ProjectDetailData;
  next?: NextProjectData;
  accentColor?: string;
  contactHref?: string;
  className?: string;
}

const EASE = "cubic-bezier(0.77, 0, 0.18, 1)";
const STEP_VH = 70;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const pad = (n: number) => String(n).padStart(2, "0");

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(q.matches);
    read();
    q.addEventListener("change", read);
    return () => q.removeEventListener("change", read);
  }, []);
  return reduced;
}

/** Fades and lifts its children in the first time they scroll into view. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = shown || reduced;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(28px)",
        transition: reduced
          ? "none"
          : `opacity 700ms ease ${delay}ms, transform 900ms ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function BrowserFrame({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#252525] bg-[#111] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-[#252525] bg-[#161616] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-4 flex-1 max-w-56 rounded-full bg-white/5" />
      </div>
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className={cn("block w-full object-cover", imgClassName)}
      />
    </div>
  );
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2.2rem] border border-[#2a2a2a] bg-[#111] p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
      <div className="relative overflow-hidden rounded-[1.7rem] bg-black">
        <span className="absolute left-1/2 top-2 z-[1] h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          className="block aspect-[9/19] w-full object-cover"
        />
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 text-xs font-semibold uppercase tracking-[0.28em]"
      style={{ color: "var(--detail-accent)" }}
    >
      {children}
    </p>
  );
}

const ArrowIcon = () => (
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
);

/** Scroll-pinned walkthrough on desktop; plain stacked list below lg. */
function FeatureWalkthrough({
  features,
}: {
  features: NonNullable<ProjectDetailData["features"]>;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const count = features.length;
  const last = Math.max(count - 1, 0);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || count < 2) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const step = (window.innerHeight * STEP_VH) / 100;
      const next = clamp(Math.round(-el.getBoundingClientRect().top / step), 0, last);
      setActive((p) => (p === next ? p : next));
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

  const goTo = (i: number) => {
    const el = rootRef.current;
    if (!el) return;
    const step = (window.innerHeight * STEP_VH) / 100;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + i * step,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <>
      {/* Desktop: pinned */}
      <div
        ref={rootRef}
        className="relative hidden lg:block"
        style={{ height: `calc(100vh + ${last * STEP_VH}vh)` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.8fr_1.4fr] items-center gap-14 px-12 pt-16">
            <div>
              <Eyebrow>Features</Eyebrow>
              <ol className="flex flex-col gap-1">
                {features.map((f, i) => {
                  const on = i === active;
                  return (
                    <li key={f.title}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on}
                        className="group block w-full cursor-pointer text-left outline-none"
                      >
                        <span
                          className={cn(
                            "flex items-baseline gap-3 text-2xl font-semibold tracking-tight transition-all duration-500 xl:text-3xl",
                            on ? "translate-x-1 text-white" : "text-white/30 group-hover:text-white/60",
                          )}
                        >
                          <span
                            className="text-xs font-medium tabular-nums"
                            style={on ? { color: "var(--detail-accent)" } : undefined}
                          >
                            {pad(i + 1)}
                          </span>
                          {f.title}
                        </span>
                        <span
                          className="grid transition-[grid-template-rows,opacity] duration-700"
                          style={{
                            gridTemplateRows: on ? "1fr" : "0fr",
                            opacity: on ? 1 : 0,
                          }}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-sm pb-4 pl-8 pt-2 text-sm leading-relaxed text-stone-300/80">
                              {f.description}
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-0 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--detail-accent) 22%, transparent), transparent 65%)",
                }}
              />
              <div className="relative overflow-hidden rounded-xl border border-[#252525] bg-[#111] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-1.5 border-b border-[#252525] bg-[#161616] px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </div>
                <div className="relative aspect-[1400/880]">
                  {features.map((f, i) => {
                    const on = i === active;
                    return (
                      <img
                        key={f.title}
                        src={f.image}
                        alt={on ? f.title : ""}
                        draggable={false}
                        decoding="async"
                        className="absolute inset-0 size-full object-cover"
                        style={{
                          clipPath: on
                            ? "inset(0 0 0 0)"
                            : i > active
                              ? "inset(100% 0 0 0)"
                              : "inset(0 0 100% 0)",
                          transform: `scale(${on ? 1 : 1.1})`,
                          transition: reduced
                            ? "none"
                            : `clip-path 900ms ${EASE}, transform 1300ms ${EASE}`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 lg:hidden">
        <div>
          <Eyebrow>Features</Eyebrow>
        </div>
        {features.map((f, i) => (
          <Reveal key={f.title}>
            <BrowserFrame src={f.image} alt={f.title} />
            <h3 className="mt-5 flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: "var(--detail-accent)" }}
              >
                {pad(i + 1)}
              </span>
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-300/80">
              {f.description}
            </p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: ProjectGalleryItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      else if (e.key === "ArrowLeft")
        onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onChange]);

  const item = items[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? "Mockup preview"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white transition hover:bg-white/20"
      >
        Close
      </button>
      <img
        src={item.src}
        alt={item.caption ?? ""}
        className="max-h-[85vh] max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      {item.caption && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
          {item.caption} · {pad(index + 1)} / {pad(items.length)}
        </p>
      )}
    </div>
  );
}

export function ProjectDetail({
  project,
  next,
  accentColor = "#a855f7",
  contactHref = "/contact",
  className,
}: ProjectDetailProps) {
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.teamSize },
    { label: "Type", value: project.projectType },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <main
      className={cn("relative bg-[#0a0a0a] text-white", className)}
      style={{ "--detail-accent": accentColor } as React.CSSProperties}
    >
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-12 md:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[70rem] max-w-none -translate-x-1/2 -translate-y-1/3 opacity-80"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--detail-accent) 22%, transparent), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
            >
              <span aria-hidden="true">←</span> All projects
            </Link>
            <Eyebrow>
              {project.projectType} · {project.timeline}
            </Eyebrow>
            <h1 className="max-w-4xl text-balance font-Poppins text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-stone-300/85 sm:text-lg">
              {project.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:brightness-110"
                  style={{ background: "var(--detail-accent)" }}
                >
                  Live site <ArrowIcon />
                </a>
              )}
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-14">
            <BrowserFrame
              src={project.heroImage}
              alt={`${project.title} main screen`}
              imgClassName="aspect-[16/10]"
            />
          </Reveal>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-y border-[#252525] bg-[#0d0d0d] px-5 py-8 md:px-12">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
        {project.tags.length > 0 && (
          <ul className="mx-auto mt-7 flex max-w-7xl flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Problem / Solution / Results */}
      {(project.problem || project.solution || (project.results && project.results.length > 0)) && (
      <section className="px-5 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
          {project.problem && (
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
                {project.problem}
              </p>
            </Reveal>
          )}
          {project.solution && (
            <Reveal delay={120}>
              <Eyebrow>The solution</Eyebrow>
              <p className="text-base leading-relaxed text-stone-300/85 sm:text-lg">
                {project.solution}
              </p>
            </Reveal>
          )}
        </div>

        {project.results && project.results.length > 0 && (
          <Reveal className="mx-auto mt-20 grid max-w-7xl gap-4 sm:grid-cols-3">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-[#252525] bg-[#0f0f0f] p-7"
              >
                <p
                  className="text-5xl font-semibold tracking-tight sm:text-6xl"
                  style={{ color: "var(--detail-accent)" }}
                >
                  {r.value}
                </p>
                <p className="mt-3 text-sm text-white/60">{r.label}</p>
              </div>
            ))}
          </Reveal>
        )}
      </section>
      )}

      {/* Features walkthrough */}
      {project.features && project.features.length > 0 && (
        <section id="features" className="scroll-mt-0 pb-10 lg:pb-0">
          <FeatureWalkthrough features={project.features} />
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-5 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Mockups</Eyebrow>
              <h2 className="mb-12 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                A closer look.
              </h2>
            </Reveal>
            <div className="grid auto-rows-auto grid-cols-2 items-center gap-5 md:grid-cols-6">
              {project.gallery.map((g, i) => (
                <Reveal
                  key={`${g.src}-${i}`}
                  delay={(i % 3) * 90}
                  className={cn(
                    g.kind === "desktop"
                      ? "col-span-2 md:col-span-4"
                      : "col-span-1 md:col-span-2",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`Open ${g.caption ?? "mockup"}`}
                    className="group block w-full cursor-zoom-in text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--detail-accent)]"
                  >
                    <div className="transition duration-500 group-hover:-translate-y-1">
                      {g.kind === "desktop" ? (
                        <BrowserFrame
                          src={g.src}
                          alt={g.caption ?? `Mockup ${i + 1}`}
                          imgClassName="aspect-[16/10]"
                        />
                      ) : (
                        <PhoneFrame src={g.src} alt={g.caption ?? `Mockup ${i + 1}`} />
                      )}
                    </div>
                    {g.caption && (
                      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/40">
                        {g.caption}
                      </p>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="border-t border-[#252525] px-5 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Under the hood</Eyebrow>
              <h2 className="mb-12 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Challenges, solved.
              </h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {project.challenges.map((c, i) => (
                <Reveal key={c.title} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-[#252525] bg-[#0f0f0f] p-7 transition duration-500 hover:border-white/20">
                    <span
                      className="text-xs font-medium tabular-nums"
                      style={{ color: "var(--detail-accent)" }}
                    >
                      {pad(i + 1)}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300/80">
                      {c.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="px-5 pb-24 md:px-12 md:pb-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
              “{project.testimonial.quote}”
            </p>
            <p className="mt-8 text-sm text-white">
              {project.testimonial.author}
              {project.testimonial.role && (
                <span className="text-white/45"> · {project.testimonial.role}</span>
              )}
            </p>
          </Reveal>
        </section>
      )}

      {/* Next project */}
      {next && (
        <section className="px-5 pb-8 md:px-12">
          <Link
            href={next.href}
            className="group relative mx-auto block max-w-7xl overflow-hidden rounded-3xl border border-[#252525] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--detail-accent)]"
          >
            <img
              src={next.image}
              alt=""
              draggable={false}
              className="aspect-[16/7] min-h-64 w-full object-cover transition duration-1000 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
              <span>
                <span className="block text-xs uppercase tracking-[0.28em] text-white/55">
                  Next project
                </span>
                <span className="mt-2 block text-3xl font-semibold tracking-tight sm:text-5xl">
                  {next.title}
                </span>
              </span>
              <span
                className="grid size-12 shrink-0 place-items-center rounded-full text-black transition duration-500 group-hover:rotate-45 md:size-14"
                style={{ background: "var(--detail-accent)" }}
              >
                <ArrowIcon />
              </span>
            </span>
          </Link>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 py-24 text-center md:px-12 md:py-32">
        <Reveal>
          <Eyebrow>Your turn</Eyebrow>
          <h2 className="mx-auto max-w-3xl text-balance font-Poppins text-4xl font-semibold tracking-tight sm:text-6xl">
            Want something like this built?
          </h2>
          <Link
            href={contactHref}
            className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black transition hover:brightness-110"
            style={{ background: "var(--detail-accent)" }}
          >
            Let&apos;s talk <ArrowIcon />
          </Link>
        </Reveal>
      </section>

      {lightbox !== null && (
        <Lightbox
          items={project.gallery ?? []}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={setLightbox}
        />
      )}
    </main>
  );
}

export default ProjectDetail;