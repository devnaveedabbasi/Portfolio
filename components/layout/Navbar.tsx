"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo, navLinks } from "@/constant/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CurtainButton } from "@/components/ui/curtain-button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "pt-3 sm:pt-4 px-4 sm:px-8 bg-transparent pointer-events-none"
          : "pt-0 px-0 bg-[var(--bg-page)] border-b border-[var(--border-subtle)]"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-4xl sm:max-w-5xl rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] shadow-card px-4 sm:px-6 py-2 sm:py-2.5"
            : "max-w-7xl px-6 py-4"
        }`}
      >
        {/* Brand / Wordmark with Avatar Image */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div
            className={`relative shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] transition-all duration-300 group-hover:scale-105 shadow-sm ${
              isScrolled ? "h-8 w-8 sm:h-9 sm:w-9" : "h-10 w-10"
            }`}
          >
            <Image
              src="/assets/img/NaveedAbbasi.jpg"
              alt={personalInfo.name}
              width={40}
              height={40}
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
          <span
            className={`font-bold tracking-tight text-[var(--text-primary)] transition-all duration-300 ${
              isScrolled ? "text-base sm:text-lg" : "text-lg"
            }`}
          >
            {personalInfo.wordmark}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[var(--text-secondary)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-brand"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Sun/Moon */}
          <ThemeToggle />

          {/* Curtain Button */}
          <CurtainButton
            text="Get in touch ↗"
            size="sm"
            variant="default"
            href="/#contact"
          />
        </div>

        {/* Mobile Actions: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)]"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto transition-all duration-300 ${
            isScrolled
              ? "max-w-4xl mx-auto mt-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl px-6 py-6 md:hidden"
              : "border-b border-[var(--border-subtle)] bg-[var(--bg-page)] px-6 py-6 md:hidden"
          }`}
        >
          <nav className="flex flex-col gap-4 text-base font-medium text-[var(--text-primary)]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <CurtainButton
                text="Get in touch ↗"
                size="default"
                variant="default"
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
