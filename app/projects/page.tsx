"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projectsData, Project } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";

const CATEGORIES = [
  "All",
  "FinTech & Trading",
  "EdTech Platform",
  "Design System",
  "Creative Tech",
  "IoT & Cloud",
  "AI & Distributed Systems",
];

export default function ProjectsArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* ================= Header Section ================= */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 sm:pt-32 pb-12 sm:pb-16 border-b border-[var(--border-subtle)]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs tabular-nums text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">Projects archive</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-4xl">

              <h1 className="display-1 text-[var(--text-primary)]">
                All projects
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                Filter by category, or search by project name and technology.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-sm">
              <div>
                <div className="font-display text-3xl font-bold tabular-nums text-brand">
                  {projectsData.length}+
                </div>
                <div className="text-xs tabular-nums text-[var(--text-muted)]">
                  Featured Apps
                </div>
              </div>
              <div className="h-8 w-[1px] bg-[var(--border-subtle)]" />
              <div>
                <div className="font-display text-3xl font-bold tabular-nums text-brand">
                  100%
                </div>
                <div className="text-xs tabular-nums text-[var(--text-muted)]">
                  Production Grade
                </div>
              </div>
            </div>
          </div>

          {/* ================= Search & Filter Bar ================= */}
          <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-5 pt-8 border-t border-[var(--border-subtle)]">
            {/* Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-brand hover:text-brand"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech…"
                aria-label="Search projects or technologies"
                name="project-search"
                autoComplete="off"
                className="w-full rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 pl-10 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-brand transition-colors"
              />
              <svg
                className="absolute left-3.5 top-2.5 sm:top-3 h-4 w-4 text-[var(--text-muted)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </section>

        {/* ================= Projects Grid ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-lg font-bold text-[var(--text-primary)]">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-6 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Image Frame with Precise Dimensions */}
                  <Link
                    href={`/projects/${project.id}`}
                    data-cursor="view"
                    className="block relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 transition-colors group-hover:border-neutral-600 cursor-pointer"
                  >
                    {/* Placeholder Frame with L-brackets */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-colors group-hover:bg-neutral-900">
                      {/* Corner marks */}
                      <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-neutral-700 group-hover:border-neutral-400 transition-colors" />
                      <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-neutral-700 group-hover:border-neutral-400 transition-colors" />
                      <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-neutral-700 group-hover:border-neutral-400 transition-colors" />
                      <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-neutral-700 group-hover:border-neutral-400 transition-colors" />

                      {/* Icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 text-neutral-300 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>

                      {/* Dimension Pill */}
                      <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white text-black px-3 py-1 shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 animate-pulse" />
                        <span className="font-mono text-xs font-black tracking-wider">
                          {project.recommendedSize}
                        </span>
                      </div>

                      <span className="mt-2 text-xs font-bold text-neutral-300 tracking-wide">
                        {project.title} Primary Asset
                      </span>
                    </div>
                  </Link>

                  {/* Content Details */}
                  <div className="mt-6 flex flex-1 flex-col justify-between">
                    <div>
                      {/* Category & Year */}
                      <div className="flex items-center justify-between text-xs tabular-nums text-[var(--text-muted)]">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Title */}
                      <Link href={`/projects/${project.id}`}>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-brand transition-colors">
                          {project.title}
                        </h2>
                      </Link>

                      <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                        {project.subtitle}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                        {project.description}
                      </p>

                      {/* Metrics Pill Grid */}
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-4">
                        {project.metrics.slice(0, 2).map((metric, mIdx) => (
                          <div key={mIdx} className="rounded-xl bg-[var(--bg-card-subtle)] p-2.5">
                            <div className="tabular-nums text-xs font-bold text-[var(--text-primary)]">
                              {metric.value}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)]">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-2 py-0.5 tabular-nums text-[11px] font-medium text-[var(--text-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                      <span className="text-xs tabular-nums text-[var(--text-muted)]">
                        0{idx + 1} / Archive
                      </span>

                      <CurtainButton
                        text="Explore Case Study ↗"
                        variant="default"
                        size="sm"
                        href={`/projects/${project.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA Banner */}
        <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] py-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)]">
              Let&apos;s architect and engineer your next high-performance web platform together.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <CurtainButton
                text="Schedule a Strategy Call ↗"
                variant="default"
                size="default"
                href="https://cal.com/devnaveedabbasi"
                target="_blank"
              />
              <CurtainButton
                text="Return to Home ←"
                variant="outline"
                size="default"
                href="/"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
