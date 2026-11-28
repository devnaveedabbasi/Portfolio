import { personalInfo } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { CurtainButton } from "@/components/ui/curtain-button";
import { SparkleIcon, ChatIcon } from "@/components/ui/Icons";
import { TechMarquee } from "@/components/ui/TechMarquee";

export function HeroSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
      {/* Availability Status Pill (Matching Reference) */}
      <div className="-mt-8">
        <Badge variant="status" dot>
          {personalInfo.tagline}
        </Badge>
      </div>

      {/* Main Headline: each line rises out of its own mask */}
      <h1 className="mt-8 max-w-4xl display-1 text-[var(--text-primary)]">
        <span className="line-reveal">
          <span>Engineering web apps</span>
        </span>{" "}
        <span className="line-reveal">
          <span style={{ animationDelay: "90ms" }}>that scale and perform.</span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
        Full Stack Engineer architecting resilient backends, fluid user interfaces,
        and high-throughput database systems.
      </p>

      {/* Dual CTA Buttons with Curtain Slide-up Effect */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <CurtainButton
          text="Explore Works ↗"
          variant="default"
          size="lg"
          href="#works"
          icon={<SparkleIcon />}
        />

        <CurtainButton
          text="Get in Touch ↗"
          variant="outline"
          size="lg"
          href="#contact"
          icon={<ChatIcon />}
        />
      </div>

      {/* Centered Floating Tech Marquee (Contained & Soft-Faded) */}
      <div className="w-full">
        <TechMarquee className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
