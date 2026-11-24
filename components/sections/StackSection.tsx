import { techStackData } from "@/constant/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export function StackSection() {
  return (
    <section id="stack" className="border-t border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          pillText="MY STACK"
          align="center"
          title={
            <>
              The technologies I use to <br className="hidden sm:inline" />
              build scalable web apps.
            </>
          }
          description="A battle-tested technology ecosystem chosen for reliability, high performance, and rapid developer velocity."
        />

        {/* 3 Architecture Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {techStackData.map((category) => (
            <Card key={category.number} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    {category.number} / {category.category}
                  </div>
                  <CardTitle className="mt-2 text-2xl">
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-4">
                  <div className="space-y-3.5 border-t border-[var(--border-subtle)] pt-6">
                    {category.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-3 text-sm font-semibold text-[var(--text-primary)]">
                        <span className="text-xs text-[var(--text-muted)]">✦</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
