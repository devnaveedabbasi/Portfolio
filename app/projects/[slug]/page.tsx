import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projectsData, Project } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Naveed Abbasi",
    };
  }

  return {
    title: `${project.title} — ${project.subtitle} | Naveed Abbasi`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.id === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* ================= Breadcrumb Bar ================= */}
        <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                HOME
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[var(--text-primary)] transition-colors">
                PROJECTS
              </Link>
              <span>/</span>
              <span className="font-semibold text-[var(--text-primary)] uppercase">
                {project.id}
              </span>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← All Projects
            </Link>
          </div>
        </div>

        {/* ================= Hero Header ================= */}
        <section className="relative mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="status" className="px-3.5 py-1 text-xs font-semibold">
              {project.category}
            </Badge>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {project.year}
            </span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.06]">
            {project.title}
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-medium text-[var(--text-secondary)] max-w-3xl">
            {project.subtitle}
          </p>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-muted)] max-w-3xl">
            {project.description}
          </p>

          {/* Metadata Specs Matrix */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 border-y border-[var(--border-subtle)] py-8">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                ROLE
              </div>
              <div className="mt-1.5 font-bold text-sm sm:text-base text-[var(--text-primary)]">
                {project.role}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                CLIENT / ORG
              </div>
              <div className="mt-1.5 font-bold text-sm sm:text-base text-[var(--text-primary)]">
                {project.client}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                TIMELINE
              </div>
              <div className="mt-1.5 font-bold text-sm sm:text-base text-[var(--text-primary)]">
                {project.timeline}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                DELIVERABLE
              </div>
              <div className="mt-1.5 font-bold text-sm sm:text-base text-[var(--text-primary)]">
                Full Production System
              </div>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CurtainButton
              text="Live Deployment ↗"
              variant="default"
              size="default"
              href={project.liveUrl}
              target="_blank"
            />
            <CurtainButton
              text="View Source Code ↗"
              variant="outline"
              size="default"
              href={project.githubUrl}
              target="_blank"
            />
          </div>
        </section>

        {/* ================= Primary Hero Image Showcase ================= */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#121216] border border-neutral-800 p-3 sm:p-4 shadow-2xl">
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-800 bg-[#15151c] p-8 text-center">
              {/* L-bracket corner marks */}
              <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-neutral-600" />
              <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-neutral-600" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-neutral-600" />
              <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-neutral-600" />

              {/* Central Camera / Media Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/90 text-neutral-300 shadow-xl">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>

              {/* Exact Recommended Size Badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 shadow-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-sm font-black tracking-wider">
                  {project.recommendedSize}
                </span>
              </div>

              <h3 className="mt-3 text-base sm:text-lg font-bold text-white tracking-wide">
                {project.title} — Primary Hero Screenshot
              </h3>
              <p className="mt-1 text-xs text-neutral-400 max-w-md">
                Drop your high-resolution desktop showcase capture here (Aspect Ratio 16:10 or 16:9).
              </p>
            </div>
          </div>
        </section>

        {/* ================= Overview & Key Story ================= */}
        <section className="mx-auto max-w-7xl px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                [overview &amp; vision]
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Architecting the solution.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {project.fullDescription.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Impact & Metrics Matrix ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-12 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              [impact &amp; verification]
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Measurable Engineering Results
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] p-6"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Challenges & Technical Solutions ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Challenges Card */}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  ⚡
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  Engineering Challenges
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {project.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono font-bold text-[var(--text-primary)]">
                      {idx + 1}
                    </span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Card */}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  Architectural Solutions
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {project.solutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                      ✓
                    </span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= Gallery Showcase with Precise Placeholder Dimensions ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              [gallery &amp; interfaces]
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              System Interface Details
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)]">
              Modular UI screens, data visualization components, and mobile-adaptive interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 shadow-sm"
              >
                {/* Specific Frame Placeholder */}
                <div className={`relative w-full overflow-hidden rounded-2xl bg-[#141418] border border-neutral-800 p-4 ${
                  idx === 2 ? "aspect-[9/14]" : "aspect-[16/10]"
                }`}>
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#161620] p-4 text-center">
                    {/* Corner marks */}
                    <div className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-neutral-500" />
                    <div className="absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-neutral-500" />
                    <div className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-neutral-500" />
                    <div className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-neutral-500" />

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>

                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-white text-black px-2.5 py-1 text-[11px] font-mono font-bold shadow-sm">
                      <span>{item.size}</span>
                    </div>

                    <span className="mt-2 text-xs font-semibold text-neutral-300">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-base text-[var(--text-primary)]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Tech Stack Pill Matrix ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--border-subtle)]">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            [technologies utilized]
          </span>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Full Stack Technologies &amp; Libraries
          </h3>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-2 font-mono text-xs font-semibold text-[var(--text-primary)] shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ================= Next Project Footer Bar ================= */}
        <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                UP NEXT
              </span>
              <h4 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                {nextProject.title}
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                {nextProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <CurtainButton
                text="Next Case Study →"
                variant="default"
                size="default"
                href={`/projects/${nextProject.id}`}
              />
              <CurtainButton
                text="All Projects"
                variant="outline"
                size="default"
                href="/projects"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
