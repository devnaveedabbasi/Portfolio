"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
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
      // project previews turn the dot into a "View" label
      setIsViewing(!!target.closest('[data-cursor="view"]'));
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
        scale: isViewing ? 1 : isHovered ? 2.2 : 1,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: "spring", damping: 20, stiffness: 300 },
      }}
    >
      {/* Trailing dot, expands into a label over project previews */}
      <div
        className={`flex items-center justify-center rounded-full text-sm font-bold text-primary-foreground transition-all duration-200 ${
          isViewing
            ? "h-20 w-20 bg-brand opacity-100"
            : isHovered
            ? "h-3 w-3 bg-brand opacity-35 ring-4 ring-brand/25"
            : "h-3 w-3 bg-brand opacity-90"
        }`}
      >
        {isViewing && "View"}
      </div>
    </motion.div>
  );
}
