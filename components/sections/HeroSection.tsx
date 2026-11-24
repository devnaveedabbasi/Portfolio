import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TechMarquee } from "@/components/ui/TechMarquee";

export function HeroSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-20 text-center md:pt-28 md:pb-28">
      {/* Availability Status Pill */}
      <div className="-mt-10">
        <Badge variant="status" dot>
          {personalInfo.tagline}
        </Badge>
      </div>

      {/* Main Headline — Exact Figma Scale */}
      <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl leading-[1.08]">
        Engineering web apps <br className="hidden sm:inline" />
        <span>that scale and perform.</span>
      </h1>

      {/* Subtitles */}
      <p className="mt-6 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
        Full Stack Engineer architecting resilient backends, fluid user interfaces,
        and high-throughput database systems.
      </p>

      {/* Dual CTA Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="primary"
          size="md"
          href={personalInfo.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          icon={<span>📹</span>}
        >
          Book a free call
        </Button>

        <Button
          variant="secondary"
          size="md"
          href={`mailto:${personalInfo.email}`}
          icon={<span>💬</span>}
        >
          Let&apos;s chat
        </Button>
      </div>

      {/* Centered Floating Tech Marquee (Separate Reusable Component) */}
      <TechMarquee className="mt-14 sm:mt-18" />

      {/* Direct Email */}
      {/* <div className="mt-6 text-xs font-medium text-[var(--text-muted)]">
        Direct Email:{" "}
        <a
          href={`mailto:${personalInfo.email}`}
          className="font-bold text-[var(--text-primary)] underline underline-offset-4 hover:opacity-80"
        >
          {personalInfo.email}
        </a>
      </div> */}
    </section>
  );
}
