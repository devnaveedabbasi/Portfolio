"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid trailing feel (like Framer Menoa template)
  const springConfig = {
    damping: 24,
    stiffness: 280,
    mass: 0.45,
  };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices that have a precise pointer (mouse/trackpad), not touch screens
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsPointerDevice(true);
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hover on interactive elements (links, buttons, inputs)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], .cursor-pointer'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovered ? 2.2 : 1,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: "spring", damping: 20, stiffness: 300 },
      }}
    >
      {/* Outer fluid trailing dot (Theme-adaptive: black in light mode, white in dark mode) */}
      <div
        className={`h-3 w-3 rounded-full bg-[var(--text-primary)] transition-all duration-200 ${
          isHovered
            ? "opacity-35 ring-4 ring-[var(--text-primary)]/20"
            : "opacity-85 shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        }`}
      />
    </motion.div>
  );
}
