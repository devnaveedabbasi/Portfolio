import { experiences, educations } from "@/constant/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        pillText="EXPERIENCE"
        title="Where I've contributed & delivered"
        description="A timeline of high-impact engineering across startups, client products, and technical teams."
      />

      {/* Experience Table */}
      <div className="mt-14 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:items-center transition-colors hover:bg-[var(--bg-muted)]/50 px-4 -mx-4 rounded-xl"
          >
            {/* Title & Company */}
            <div className="sm:col-span-5">
              <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                {exp.title}
              </h3>
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                {exp.company} · {exp.type}
              </div>
            </div>

            {/* Tech Scope */}
            <div className="sm:col-span-4">
              <span className="inline-block text-sm font-semibold text-[var(--text-primary)]">
                {exp.scope}
              </span>
              <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">
                {exp.description}
              </p>
            </div>

            {/* Date */}
            <div className="sm:col-span-3 sm:text-right">
              <Badge variant="default">{exp.date}</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Education & Foundations */}
      <div className="mt-20">
        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          Education &amp; Academic Foundations
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {educations.map((edu, index) => (
            <Card key={index} className="p-6">
              <div className="text-xs font-bold text-[var(--text-muted)]">{edu.date}</div>
              <div className="mt-2 text-base font-bold text-[var(--text-primary)]">{edu.title}</div>
              <div className="text-sm font-medium text-[var(--text-secondary)]">{edu.institution}</div>
              <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                {edu.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
