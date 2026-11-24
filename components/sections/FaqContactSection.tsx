import { personalInfo, faqData } from "@/constant/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

export function FaqContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column — Contact CTA */}
        <div className="lg:col-span-5">
          <Badge variant="default">CONTACT</Badge>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl leading-[1.1]">
            Have a project in mind? <br />
            Let&apos;s make it real.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
            Whether you&apos;re starting from scratch, scaling existing infrastructure, or needing a
            dedicated technical partner, I&apos;m always open to discussing new opportunities.
          </p>

          {/* Action Cards */}
          <div className="mt-8 space-y-4">
            <Button
              variant="primary"
              size="lg"
              href={`mailto:${personalInfo.email}`}
              className="w-full justify-between px-6"
              icon={<span>✉</span>}
              iconPosition="left"
            >
              <span>{personalInfo.email}</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={personalInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-between px-6"
              icon={<span>📹</span>}
              iconPosition="left"
            >
              <span>Schedule a 15-min call</span>
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
            <span>⚡</span>
            <span>Typically responds within 2-4 hours.</span>
          </div>
        </div>

        {/* Right Column — FAQ Accordion */}
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-8">
            Frequently Asked Questions
          </h3>

          <Accordion items={faqData} />
        </div>
      </div>
    </section>
  );
}
