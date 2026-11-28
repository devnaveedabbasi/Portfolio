import Image from "next/image";
import { personalInfo, socialLinks } from "@/constant/data";
import { CurtainButton } from "@/components/ui/curtain-button";

const FACTS = [
  { label: "Based in", value: personalInfo.location },
  { label: "Experience", value: "2 years" },
  { label: "Role", value: "Full Stack Developer" },
  { label: "Timezone", value: personalInfo.timezone },
];

export function AboutProfileSection() {
  const github = socialLinks.find((link) => link.name === "GitHub");

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-card">
            <Image
              src="/assets/img/NaveedAbbasi.jpg"
              alt={personalInfo.name}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="display-2 text-[var(--text-primary)]">Hi, I am {personalInfo.name}</h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            I am a full stack developer with 2 years of experience. Most of my
            work is in Node.js, Next.js and TypeScript, with MongoDB or PostgreSQL and Prisma behind them.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            I build both sides of a web app: the screens people use, the APIs behind them and the
            database that holds it together.
          </p>

          <dl className="mt-10 grid grid-cols-1 border-t border-[var(--border-default)] sm:grid-cols-2 sm:gap-x-10">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--border-default)] py-4"
              >
                <dt className="text-sm text-[var(--text-muted)]">{fact.label}</dt>
                <dd className="text-right text-base font-bold text-[var(--text-primary)]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CurtainButton text="Get in Touch ↗" size="lg" href="/#contact" />
            {github && (
              <CurtainButton
                text="GitHub ↗"
                variant="outline"
                size="lg"
                href={github.href}
                target="_blank"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
