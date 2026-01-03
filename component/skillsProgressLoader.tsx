"use client";
import { RootState } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

interface ProgressLoaderProps {
  percentage: number;
  skill: string;
}

const SkillsProgressLoader: React.FC<ProgressLoaderProps> = ({ percentage, skill }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
  const circleRef = useRef<SVGCircleElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Trigger animation when section is visible
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate the circle when the section is visible
  useEffect(() => {
    if (isVisible && circleRef.current) {
      // Set initial stroke-dashoffset
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      // Trigger animation
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }
      }, 100); // Small delay to trigger animation
    }
  }, [isVisible, circumference, offset]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      <svg className="md:w-32 md:h-32 w-24  h-24" viewBox="0 0 120 120">
        <circle
          className="text-[#222222] stroke-current"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          ref={circleRef}
          className="stroke-current"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Initial value
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
            stroke: selectedColor,
          }}
        />
        <text
          x="50%"
          y="50%"
          className="text-lg font-bold fill-current text-[#ffffff]"
          textAnchor="middle"
          dy=".3em"
        >
          {percentage}%
        </text>
      </svg>
      <p className="mt-2 text-lg font-semibold text-[#ffffff]">{skill}</p>
    </div>
  );
};

export default SkillsProgressLoader;