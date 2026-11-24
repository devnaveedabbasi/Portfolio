import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column — Bio & Stats */}
        <div className="lg:col-span-7">
          <Badge variant="default">ABOUT ME</Badge>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Hi, I am <span>{personalInfo.name}</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            A software engineer dedicated to building scalable web applications with
            meticulous attention to performance, architecture, and user experience.
            I bridge the gap between complex backend systems and fluid client-side interfaces.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Over the past 6+ years, I&apos;ve collaborated with teams and clients worldwide to
            turn ambitious technical ideas into robust, production-grade applications that
            serve thousands of active users.
          </p>

          {/* Stat Cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-6 transition-all">
              <div className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl">
                {personalInfo.experienceYears}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Engineering Experience
              </div>
            </Card>

            <Card className="p-6 transition-all">
              <div className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl">
                {personalInfo.projectsDelivered}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Projects Delivered
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column — Monogram Portrait Showcase */}
        <div className="lg:col-span-5">
          <div className="relative flex flex-col items-center justify-center rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-inverted)] p-12 text-center text-[var(--text-inverted)] shadow-xl min-h-[420px]">
            {/* Ambient subtle glow */}
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_70%)]" />

            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/20 bg-neutral-900 shadow-inner">
              <span className="text-3xl font-black tracking-tight text-white">NA</span>
            </div>

            <div className="relative mt-8 font-extrabold text-2xl tracking-tight text-white">
              {personalInfo.name}
            </div>

            <div className="relative mt-1 text-sm font-medium text-neutral-400">
              Full Stack Software Engineer
            </div>

            <div className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{personalInfo.location} · {personalInfo.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
