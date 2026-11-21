// app/projects/ProjectsClient.tsx - CLIENT COMPONENT
"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { type StaticImageData } from "next/image";
import { useSelector } from "react-redux";
import { Portfolio } from "@/constant/data";
import { RootState } from "@/store";
import { ImageStreamHero } from "@/component/image-stream-hero";
import { WorksShowcase } from "@/component/works-showcase";

function resolveImageSrc(image: string | StaticImageData) {
  return typeof image === "string" ? image : image.src;
}

interface ProjectsClientProps {
  portfolioData: Portfolio[];
}

export default function ProjectsClient({ portfolioData }: ProjectsClientProps) {
  const router = useRouter();
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  // Must match [slug]/page.tsx lookup: name → kebab-case
  const getProjectSlug = useCallback((project: Portfolio) => {
    return project.name.toLowerCase().replace(/\s+/g, "-");
  }, []);

  const handleProjectClick = useCallback(
    (project: Portfolio) => {
      router.push(`/projects/${getProjectSlug(project)}`);
    },
    [router, getProjectSlug],
  );

  const handleStreamClick = useCallback(
    (image: { id?: string; href?: string; title?: string }) => {
      if (image.href) {
        router.push(image.href);
        return;
      }
      if (image.id) {
        const project = portfolioData.find((p) => p.name === image.id);
        if (project) handleProjectClick(project);
      }
    },
    [router, portfolioData, handleProjectClick],
  );

  const streamImages = useMemo(() => {
    const toStreamItem = (project: Portfolio, src: string, alt?: string) => {
      const slug = getProjectSlug(project);
      return {
        src,
        alt: alt || project.name,
        title: project.name,
        subtitle: `${project.projectType}${project.timeline ? ` · ${project.timeline}` : ""}`,
        description: project.shortDescription,
        technologies: (project.Technologies || "").split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        projectType: project.projectType,
        timeline: project.timeline,
        liveUrl: project.liveUrl,
        id: project.name,
        href: `/projects/${slug}`,
      };
    };

    const items = portfolioData.flatMap((project) => {
      const primary = toStreamItem(project, resolveImageSrc(project.cardImage));
      // Landscape mockups first for richer corridor
      const gallery =
        project.galleryImages
          ?.slice(0, 3)
          .map((src, i) =>
            toStreamItem(project, src, `${project.name} mockup ${i + 1}`),
          ) ?? [];
      return [primary, ...gallery];
    });

    const unique = new Map<string, (typeof items)[number]>();
    items.forEach((image) => {
      if (image?.src) unique.set(image.src, image);
    });

    return Array.from(unique.values()).slice(0, 12);
  }, [portfolioData, getProjectSlug]);

  const showcaseItems = useMemo(
    () =>
      portfolioData.map((project) => ({
        title: project.name,
        image: resolveImageSrc(project.cardImage),
        href: `/projects/${getProjectSlug(project)}`,
        type: project.projectType,
        timeline: project.timeline,
        description: project.shortDescription,
        tags: (project.Technologies || "").split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        liveUrl: project.liveUrl || undefined,
      })),
    [portfolioData, getProjectSlug],
  );

  return (
    <>
      {/* Immersive project image stream showcase */}
      <section className="relative bg-[#0a0a0a] px-3 pb-4 pt-16 md:px-6 md:pt-8">
        <ImageStreamHero
          images={streamImages}
          cards={9}
          speed={22}
          axis={56}
          accentColor={selectedColor}
          previewOnHover={false}
          onImageClick={handleStreamClick}
          className="h-[380px] w-full rounded-2xl border border-[#252525] bg-black sm:h-[460px] md:h-[520px]"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-8 text-center sm:py-10">
            <div className="pointer-events-none px-6">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: selectedColor }}
              >
                Selected Work
              </p>
              <h1 className="text-balance font-Poppins text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Projects,
                <br />
                front and centre.
              </h1>
            </div>
            <div className="px-6">
              <p className="mx-auto max-w-md text-balance text-sm leading-relaxed text-stone-300/90">
                Click any mockup to open its full project preview.
              </p>
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("all-projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="pointer-events-auto mt-4 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                Browse all projects
              </button>
            </div>
          </div>
        </ImageStreamHero>
      </section>

      <WorksShowcase
        id="all-projects"
        items={showcaseItems}
        accentColor={selectedColor}
      />
    </>
  );
}