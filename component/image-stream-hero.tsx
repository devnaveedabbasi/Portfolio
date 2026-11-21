"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type CorridorPath = {
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  birthHeight?: number;
  exitHeight?: number;
  railBirth?: number;
  railExit?: number;
  fan?: number;
  turnBirth?: number;
  turnExit?: number;
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 28,
  cardHeight: 16,
  cardRadius: 0.55,
  birthHeight: 2.4,
  exitHeight: 38,
  railBirth: -10,
  railExit: 46,
  fan: 3.2,
  turnBirth: 5,
  turnExit: 24,
  stops: 24,
};

function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  technologies?: string[];
  projectType?: string;
  timeline?: string;
  liveUrl?: string;
  href?: string;
  id?: string;
};

export type ImageStreamHeroProps = {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  accentColor?: string;
  previewOnHover?: boolean;
  onImageClick?: (image: StreamImage) => void;
  children?: React.ReactNode;
  className?: string;
};

type CardMeta = {
  key: string;
  image: StreamImage;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  accentColor = "#a855f7",
  previewOnHover = true,
  onImageClick,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${uid}`;
  const left = `ish-l-${uid}`;
  const cardClass = `ish-c-${uid}`;
  const railsClass = `ish-rails-${uid}`;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<StreamImage | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const hoverOpenTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHoverKey = React.useRef<string | null>(null);

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const cardMetas = React.useMemo(() => {
    const metas: Array<CardMeta & { rail: string; index: number }> = [];
    [right, left].forEach((rail) => {
      for (let i = 0; i < cards; i++) {
        const image = images[i % Math.max(images.length, 1)];
        if (!image) continue;
        metas.push({ key: `${rail}-${i}`, image, rail, index: i });
      }
    });
    return metas;
  }, [right, left, cards, images]);

  const metaByKey = React.useMemo(() => {
    const map = new Map<string, StreamImage>();
    cardMetas.forEach((m) => map.set(m.key, m.image));
    return map;
  }, [cardMetas]);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!preview) {
      setVisible(false);
      return;
    }
    setPaused(true);
    const raf = requestAnimationFrame(() => setVisible(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
    };
  }, [preview]);

  React.useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `.${railsClass}{--ish-play:running}` +
      `.${railsClass}[data-paused="true"]{--ish-play:paused}` +
      `.${cardClass}{animation-play-state:var(--ish-play);pointer-events:auto;cursor:pointer;` +
      `transition:filter .35s ease,box-shadow .35s ease,outline-color .35s ease;` +
      `outline:2px solid transparent;outline-offset:2px}` +
      `.${cardClass}[data-active="true"]{z-index:80 !important;filter:brightness(1.14) saturate(1.1);` +
      `outline-color:${accentColor};` +
      `box-shadow:0 0 0 2px color-mix(in srgb, ${accentColor} 75%, transparent),0 22px 60px rgba(0,0,0,.65),0 0 48px color-mix(in srgb, ${accentColor} 45%, transparent)}` +
      `.${cardClass} img{transition:transform .35s cubic-bezier(.22,1,.36,1);width:100%;height:100%;object-fit:cover}` +
      `.${cardClass}[data-active="true"] img{transform:scale(1.07)}` +
      `.${cardClass} .ish-overlay{opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .35s cubic-bezier(.22,1,.36,1)}` +
      `.${cardClass}[data-active="true"] .ish-overlay{opacity:1;transform:translateY(0)}` +
      `@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused}}`,
    [right, left, cardClass, railsClass, p, accentColor],
  );

  const clearTimers = () => {
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    hoverOpenTimer.current = null;
    closeTimer.current = null;
    pauseTimer.current = null;
  };

  const openPreview = React.useCallback((image: StreamImage) => {
    clearTimers();
    setPreview(image);
  }, []);

  const closePreview = React.useCallback(() => {
    clearTimers();
    setVisible(false);
    closeTimer.current = setTimeout(() => {
      setPreview(null);
      setPaused(false);
      setActiveKey(null);
      lastHoverKey.current = null;
    }, 200);
  }, []);

  /** Pick the topmost stream card under the cursor (fixes uneven 3D hover). */
  const pickCardAtPoint = React.useCallback(
    (clientX: number, clientY: number) => {
      const stack = document.elementsFromPoint(clientX, clientY);
      for (const el of stack) {
        if (!(el instanceof HTMLElement)) continue;
        const node = el.closest(`[data-ish-card="${uid}"]`) as HTMLElement | null;
        if (!node) continue;
        const key = node.dataset.ishKey;
        if (!key) continue;
        const rect = node.getBoundingClientRect();
        // Ignore tiny far cards — too hard / misleading to target
        if (rect.width < 56 || rect.height < 36) continue;
        const image = metaByKey.get(key);
        if (!image) continue;
        return { key, image, node };
      }
      return null;
    },
    [uid, metaByKey],
  );

  const schedulePreview = (image: StreamImage, key: string) => {
    if (!previewOnHover || preview) return;
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    hoverOpenTimer.current = setTimeout(() => {
      openPreview(image);
      setActiveKey(key);
    }, 160);
  };

  const onRailsPointerMove = (e: React.PointerEvent) => {
    if (preview || !previewOnHover) return;
    const hit = pickCardAtPoint(e.clientX, e.clientY);
    if (!hit) {
      if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
      setActiveKey(null);
      lastHoverKey.current = null;
      setPaused(false);
      return;
    }

    setActiveKey(hit.key);

    if (lastHoverKey.current !== hit.key) {
      lastHoverKey.current = hit.key;
      schedulePreview(hit.image, hit.key);
    }

    if (!pauseTimer.current) {
      pauseTimer.current = setTimeout(() => {
        setPaused(true);
        pauseTimer.current = null;
      }, 140);
    }
  };

  const onRailsPointerLeave = () => {
    if (preview || !previewOnHover) return;
    clearTimers();
    setActiveKey(null);
    lastHoverKey.current = null;
    setPaused(false);
  };

  const onRailsClick = (e: React.MouseEvent) => {
    const hit = pickCardAtPoint(e.clientX, e.clientY);
    if (!hit) return;
    e.preventDefault();
    openPreview(hit.image);
    setActiveKey(hit.key);
  };

  const handleOpenCaseStudy = () => {
    if (!preview) return;
    const target = preview;
    closePreview();
    setTimeout(() => {
      if (onImageClick) onImageClick(target);
      else if (target.href) window.location.assign(target.href);
    }, 180);
  };

  const modal =
    mounted &&
    preview &&
    createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden p-3 sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-label={preview.title || "Project preview"}
      >
        <button
          type="button"
          aria-label="Close preview"
          className={cn(
            "absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-250",
            visible ? "opacity-100" : "opacity-0",
          )}
          onClick={closePreview}
        />

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500",
            visible ? "opacity-25" : "opacity-0",
          )}
          style={{ backgroundColor: accentColor }}
        />

        <div
          className={cn(
            "relative z-10 flex max-h-[min(92vh,860px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-2xl transition-all duration-250",
            visible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-5 scale-[0.97] opacity-0",
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: accentColor }}
              >
                Project preview
              </p>
              <h3 className="truncate font-Poppins text-lg font-semibold text-white sm:text-xl">
                {preview.title || preview.alt || "Untitled project"}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={closePreview}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Body — constrained, no page overflow */}
          <div className="grid min-h-0 flex-1 overflow-hidden md:grid-cols-[1.25fr_1fr]">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black md:aspect-auto md:h-full md:min-h-[280px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.src}
                alt={preview.alt || preview.title || "Project mockup"}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              {preview.projectType && (
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {preview.projectType}
                </span>
              )}
            </div>

            <div className="flex min-h-0 flex-col overflow-hidden">
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
                {preview.subtitle && (
                  <p className="text-sm text-stone-400">{preview.subtitle}</p>
                )}
                {preview.description && (
                  <p className="text-sm leading-relaxed text-stone-300/90">
                    {preview.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 text-xs text-stone-400">
                  {preview.timeline && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                      {preview.timeline}
                    </span>
                  )}
                  {preview.projectType && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                      {preview.projectType}
                    </span>
                  )}
                </div>

                {preview.technologies && preview.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {preview.technologies.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={handleOpenCaseStudy}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                  style={{ backgroundColor: accentColor }}
                >
                  View case study
                </button>
                {preview.liveUrl && (
                  <a
                    href={preview.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Live demo
                  </a>
                )}
                <button
                  type="button"
                  onClick={closePreview}
                  className="ml-auto rounded-full px-3 py-2 text-sm text-stone-400 transition hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={
        {
          containerType: "inline-size",
          ["--ish-accent" as string]: accentColor,
          ...props.style,
        } as React.CSSProperties
      }
    >
      <style>{css}</style>

      {/* Title copy under the stream so it never steals hover */}
      <div className="pointer-events-none relative z-[1] h-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {children}
      </div>

      {/* Stream on top — pointer move finds the real top card under cursor */}
      <div
        className={cn(railsClass, "absolute inset-0 z-10")}
        data-paused={paused || preview ? "true" : "false"}
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
        onPointerMove={onRailsPointerMove}
        onPointerLeave={onRailsPointerLeave}
        onClick={onRailsClick}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cardMetas.map(({ key, image, rail, index }) => (
            <div
              key={key}
              data-ish-card={uid}
              data-ish-key={key}
              data-active={activeKey === key ? "true" : "false"}
              className={cn(
                cardClass,
                "absolute overflow-hidden border border-white/10 bg-[#111]",
              )}
              style={{
                left: "50%",
                top: `${axis}%`,
                width: `${p.cardWidth}cqw`,
                height: `${p.cardHeight}cqw`,
                marginLeft: `${-p.cardWidth / 2}cqw`,
                marginTop: `${-p.cardHeight / 2}cqw`,
                borderRadius: `${p.cardRadius}cqw`,
                animation: `${rail} ${speed}s linear infinite`,
                animationDelay: `${-(index * speed) / cards}s`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt ?? ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none"
              />

              <div className="ish-overlay pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/35 to-transparent p-[0.85cqw]">
                <span
                  className="mb-[0.3cqw] inline-flex w-fit rounded-full px-[0.5cqw] py-[0.18cqw] text-[0.8cqw] font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  Preview
                </span>
                <span className="line-clamp-1 text-[1.05cqw] font-semibold text-white">
                  {image.title || image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal}
    </div>
  );
}

export default ImageStreamHero;
