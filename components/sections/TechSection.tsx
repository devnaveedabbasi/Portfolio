import { Workflow } from "lucide-react";
import { TechIcon, type TechIconName } from "@/components/ui/TechIcons";

interface Tech {
  // "pipeline" has no brand mark, so it gets a generic one
  icon: TechIconName | "pipeline";
  name: string;
  use: string;
}

// the tools used most, grouped by the part of the app they belong to
const CORE: { group: string; items: Tech[] }[] = [
  {
    group: "Frontend",
    items: [
      { icon: "nextdotjs", name: "Next.js", use: "Pages, routing and server rendering" },
      { icon: "typescript", name: "TypeScript", use: "Types across frontend and backend" },
    ],
  },
  {
    group: "Backend",
    items: [{ icon: "nodedotjs", name: "Node.js", use: "APIs and server logic" }],
  },
  {
    group: "Database",
    items: [
      { icon: "mongodb", name: "MongoDB", use: "Document data" },
      { icon: "postgresql", name: "PostgreSQL", use: "Relational data" },
      { icon: "prisma", name: "Prisma", use: "Schema, migrations and typed queries" },
    ],
  },
  {
    group: "DevOps",
    items: [
      { icon: "docker", name: "Docker", use: "Containers that run the same everywhere" },
      { icon: "amazonwebservices", name: "AWS", use: "Cloud hosting and services" },
      { icon: "githubactions", name: "GitHub Actions", use: "Automated builds and deployments" },
      { icon: "pipeline", name: "CI/CD pipelines", use: "From a push to a live release" },
      { icon: "linux", name: "Linux", use: "Servers and the command line" },
      { icon: "nginx", name: "Nginx", use: "Reverse proxy in front of the app" },
    ],
  },
];

const ALSO: { icon: TechIconName; name: string }[] = [
  { icon: "react", name: "React" },
  { icon: "express", name: "Express" },
  { icon: "tailwindcss", name: "Tailwind CSS" },
  { icon: "redux", name: "Redux Toolkit" },
  { icon: "firebase", name: "Firebase" },
  { icon: "git", name: "Git" },
];

export function TechSection() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <h2 className="display-2 text-[var(--text-primary)]">What I work with</h2>
      <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">
        The tools I use most, and what I use each one for.
      </p>

      <div className="mt-12 border-t border-[var(--border-default)]">
        {CORE.map(({ group, items }) => (
          <div
            key={group}
            className="grid grid-cols-1 gap-4 border-b border-[var(--border-default)] py-8 lg:grid-cols-12 lg:gap-8"
          >
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] lg:col-span-3 lg:pt-4">
              {group}
            </h3>

            <ul className="lg:col-span-9">
              {items.map((tech) => (
                <li
                  key={tech.name}
                  className="group grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-x-4 rounded-2xl px-3 py-3 transition-colors hover:bg-[var(--bg-card)] sm:grid-cols-[3.5rem_18rem_minmax(0,1fr)] sm:gap-x-6"
                >
                  <span className="row-span-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-primary-foreground sm:row-span-1">
                    {tech.icon === "pipeline" ? (
                      <Workflow className="h-7 w-7" aria-hidden="true" />
                    ) : (
                      <TechIcon name={tech.icon} className="h-7 w-7" />
                    )}
                  </span>
                  <span className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
                    {tech.name}
                  </span>
                  <span className="text-sm text-[var(--text-muted)] sm:text-base">{tech.use}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="grid grid-cols-1 gap-5 py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] lg:col-span-3">
            Also use
          </h3>
          <ul className="flex flex-wrap gap-3 lg:col-span-9">
            {ALSO.map((tech) => (
              <li
                key={tech.name}
                className="flex items-center gap-2.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)]"
              >
                <TechIcon name={tech.icon} className="h-4 w-4 text-brand" />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
