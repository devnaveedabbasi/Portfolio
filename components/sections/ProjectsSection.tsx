import { projectsData } from "@/constant/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProjectsSection() {
  return (
    <section id="works" className="border-t border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          pillText="SELECTED WORK"
          title="Featured Projects & Architectures"
          description="A curated selection of web applications, cloud systems, and open-source packages engineered for scale."
        />

        {/* 2x2 Projects Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project) => (
            <Card key={project.id} className="group flex flex-col justify-between overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                {/* Visual Preview Box */}
                <div className="relative flex flex-col justify-between rounded-2xl bg-black p-8 text-white min-h-[220px] sm:min-h-[260px] overflow-hidden transition-transform group-hover:scale-[1.01]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
                      ✦ {project.badge}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                  </div>

                  <div className="my-auto py-6">
                    <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {project.headline}
                    </div>
                    <div className="mt-2 text-xs font-medium text-neutral-400 sm:text-sm">
                      {project.subtext}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                      PRODUCTION SYSTEM
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    [ {project.tag} ]
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                    {project.title} — {project.subtitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                </div>
              </CardContent>

              {/* Footer row with tech tags and link */}
              <CardFooter className="flex-wrap gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-[11px] py-0.5 px-2.5">
                      {t}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline underline-offset-4"
                >
                  View Details ↗
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
