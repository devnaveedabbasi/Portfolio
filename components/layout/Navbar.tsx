"use client";

import { useState } from "react";
import Link from "next/link";
import { personalInfo, navLinks, socialLinks } from "@/constant/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-nav)] backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-sm tracking-tight transition-transform group-hover:scale-105 shadow-sm">
            NA
          </div>
          <span className="font-bold text-lg tracking-tight text-[var(--text-primary)]">
            {personalInfo.wordmark}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-[var(--text-primary)] hover:font-semibold"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* {socialLinks.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="sm"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </Button>
          ))} */}

          {/* Theme Toggle Sun/Moon */}
          <ThemeToggle />

          <Button variant="primary" size="sm" href="#contact">
            Get in touch ↗
          </Button>
        </div>

        {/* Mobile Actions: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-base font-medium text-[var(--text-primary)]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:font-bold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between py-2 text-sm text-[var(--text-secondary)]">
              <span>Theme Mode</span>
              <ThemeToggle />
            </div>

            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Get in touch ↗
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
