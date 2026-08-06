"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import KineticText from "@/component/kineticText";

export default function Hero() {
  const color = useSelector((s: RootState) => s.color.selectedColor);
  const prefersReducedMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);

  // Animation refs
  const nameRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const rightCopyRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial state setup
    gsap.set(".word span", { y: "100%", rotateZ: 5, opacity: 0 });
    gsap.set(portraitRef.current, { y: 80, opacity: 0, scale: 0.95 });
    gsap.set([leftCopyRef.current, rightCopyRef.current], { y: 30, opacity: 0 });
    gsap.set(".ring", { scale: 0.85, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".ring", { opacity: 1, scale: 1, duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.1)
      .to(portraitRef.current, { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }, 0.15)
      .to(".word span", { y: "0%", rotateZ: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=1.3")
      .to([leftCopyRef.current, rightCopyRef.current], { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, "-=0.8");

    if (!prefersReducedMotion) {
      gsap.to(glowRef.current, {
        scale: 1.05,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Concentric rings breathing
      gsap.to(".ring", {
        scale: 1.06,
        opacity: (i) => 0.5 - i * 0.12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "center" },
      });
    }

    const portraitEl = portraitRef.current;
    if (!portraitEl) return;

    const primaryImg = portraitEl.querySelector<HTMLElement>(".primary-img");
    const hoverImg = portraitEl.querySelector<HTMLElement>(".hover-img");

    if (primaryImg && hoverImg) {
      gsap.set(primaryImg, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
      gsap.set(hoverImg, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 });

      const onEnter = () => {
        gsap.to(primaryImg, { clipPath: "inset(0% 0% 100% 0%)", scale: 1.05, duration: 0.8, ease: "power3.inOut" });
        gsap.to(hoverImg, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.8, ease: "power3.inOut" });
      };

      const onLeave = () => {
        gsap.to(primaryImg, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.8, ease: "power3.inOut" });
        gsap.to(hoverImg, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08, duration: 0.8, ease: "power3.inOut" });
      };

      portraitEl.addEventListener("mouseenter", onEnter);
      portraitEl.addEventListener("mouseleave", onLeave);

      return () => {
        portraitEl.removeEventListener("mouseenter", onEnter);
        portraitEl.removeEventListener("mouseleave", onLeave);
      };
    }
  }, { scope: container, dependencies: [prefersReducedMotion] });

  const socials = [
    { icon: "ri:twitter-x-fill", href: "https://twitter.com" },
    { icon: "ri:instagram-line", href: "https://instagram.com" },
    { icon: "ri:youtube-line", href: "https://youtube.com" },
  ];

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-stone-100"
    >
      {/* GradientBackground — Centered */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Mobile background (precise centered glow circle behind portrait) */}
        <div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full blur-[90px] opacity-35 pointer-events-none block md:hidden"
          style={{
            background: `radial-gradient(circle, #ffffff 0%, ${color} 40%, transparent 100%)`,
          }}
        />
        {/* Desktop background (full size glow) */}
        <div
          className="absolute inset-0 w-full h-full scale-[1.05] hidden md:block"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.048) 100%), radial-gradient(circle at 50% 50%, #ffffff 0%, ${color} 16.17%, ${color}66 46.2%, #0a0a0a 77%)`,
          }}
        />
      </div>

      {/* Concentric rings — centered behind the portrait */}
      <div
        ref={ringsRef}
        className="pointer-events-none hidden md:block absolute bottom-0 left-1/2 z-[1] -translate-x-1/2"
        style={{
          width: "clamp(280px, 48vw, 580px)",
          height: "clamp(380px, 80vh, 90vh)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="ring absolute rounded-full border"
            style={{
              inset: `${i * 9}%`,
              borderColor: `${color}55`,
              boxShadow: `0 0 60px ${color}14 inset`,
            }}
          />
        ))}
      </div>

      {/* ═══════════ Hero content ═══════════ */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 min-h-screen md:h-screen flex flex-col justify-center items-center md:block py-12 md:py-0 gap-6 sm:gap-8">

        {/* ── Big name — centered ── */}
        <div className="pointer-events-none w-full text-center z-[5] mt-6 md:mt-0 md:absolute md:inset-x-0 md:top-[10%]">
          {/* Desktop Name */}
          <h1
            ref={nameRef}
            className="select-none pointer-events-auto hidden md:block whitespace-nowrap inline-block uppercase text-white"
            style={{
              fontSize: "clamp(2.4rem, 11vw, 13rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              fontFamily: "'Poppins', system-ui, sans-serif",
              textShadow: "0 4px 80px rgba(0,0,0,0.5)",
            }}
          >
            <KineticText text="Naveed Abbasi" />
          </h1>
        </div>

        {/* ── Portrait — centered, touching bottom ── */}
        <div
          className="pointer-events-auto relative z-[10] mx-auto my-4 md:my-0 flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[clamp(260px,45vw,550px)] md:h-[clamp(340px,75vh,85vh)] md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2"
        >
          <div ref={portraitRef} className="relative h-full w-full cursor-pointer">
            <div
              className="relative h-full w-full overflow-hidden rounded-full md:rounded-none md:rounded-t-[220px] border-4 md:border-none"
              style={{ borderColor: color }}
            >
              <Image
                src="/assets/img/mee.png"
                alt="Naveed Abbasi Hover"
                fill
                priority
                className="hover-img object-cover object-top"
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ position: "absolute", inset: 0 }}
              />
              <Image
                src="/assets/img/meee2.png"
                alt="Naveed Abbasi — Full Stack Developer"
                fill
                priority
                className="primary-img object-cover object-top"
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ position: "absolute", inset: 0 }}
              />
            </div>
          </div>
        </div>

        {/* ── Information Columns (stacked on mobile, absolute on desktop) ── */}
        <div className="flex flex-col md:contents gap-8 z-20 relative">

          {/* Left column — tagline + socials */}
          <div
            ref={leftCopyRef}
            className="flex flex-col gap-4 md:gap-5 px-4 md:px-0 text-center md:text-left items-center md:items-start max-w-sm md:max-w-[280px] md:absolute md:left-14 md:top-[44%] md:-translate-y-1/2"
          >
            <p
              className="text-[13px] md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-stone-300/90"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              I create interfaces that blend function with emotion, crafting digital experiences that feel intuitive, seamless, and meaningful.
            </p>
            {/* Socials - Visible on Desktop only inside Left Column */}
            <div className="hidden md:flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white border transition-colors duration-200"
                  style={{
                    backgroundColor: `${color}cc`,
                    borderColor: `${color}40`,
                  }}
                >
                  <Icon icon={s.icon} width={17} height={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right column — description + CTA (Desktop only) */}
          <div
            ref={rightCopyRef}
            className="hidden md:flex flex-col gap-4 md:gap-5 px-4 md:px-0 text-center md:text-left items-center md:items-start max-w-sm md:max-w-[310px] md:absolute md:right-20 md:bottom-[11%]"
          >
            <p
              className="text-[13px] md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-stone-300/90"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Merging design thinking with human insight to create digital experiences that don&apos;t just look great — they perform effortlessly.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-block w-fit"
            >
              <Link
                href="/contact-us"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full pl-4 sm:pl-6 pr-2 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: color, boxShadow: `0 8px 30px ${color}33` }}
              >
                Let&apos;s Talk
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    style={{ color }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

        </div>

        {/* ── Mobile/Tablet Actions Bar (Socials + Let's Talk button grouped together) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:hidden w-full px-4 mt-2">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white border transition-colors duration-200"
                style={{
                  backgroundColor: `${color}cc`,
                  borderColor: `${color}40`,
                }}
              >
                <Icon icon={s.icon} width={18} height={18} />
              </motion.a>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-block w-fit"
          >
            <Link
              href="/contact-us"
              className="group inline-flex items-center justify-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold text-white transition-all duration-200"
              style={{ backgroundColor: color, boxShadow: `0 8px 30px ${color}33` }}
            >
              Let&apos;s Talk
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  style={{ color }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </main>
    </section>
  );
}