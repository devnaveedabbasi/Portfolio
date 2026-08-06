"use client";

import React from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function KineticText({ text, className, style }: KineticTextProps) {
  return (
    <span className={className} style={style}>
      {text.split(" ").map((word, wIdx) => (
        <span
          key={wIdx}
          className="word inline-block whitespace-nowrap overflow-hidden align-top"
        >
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="inline-block cursor-default select-none transition-all duration-300 ease-out"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                transition: "font-weight 0.25s ease-out, transform 0.25s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.fontWeight = "900";
                e.currentTarget.style.transform = "scale(1.18) translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fontWeight = "400";
                e.currentTarget.style.transform = "scale(1) translateY(0)";
              }}
            >
              {char}
            </span>
          ))}
          {wIdx !== text.split(" ").length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
