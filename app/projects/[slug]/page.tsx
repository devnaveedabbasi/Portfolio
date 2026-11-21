"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { PortfolioData, type Portfolio } from "@/constant/data";
import { ProjectDetail } from "@/component/projectss";
import type {
  NextProjectData,
  ProjectDetailData,
} from "@/component/project-detail";
import { RootState } from "@/store";

const PLACEHOLDER_IMAGE = "/assets/img/defult.jpeg";

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

function toDetailData(project: Portfolio): ProjectDetailData {
  const tags = (project.Technologies || "")
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return {
    title: project.name,
    tagline: project.shortDescription || "A project built with care and purpose.",
    projectType: project.projectType,
    timeline: project.timeline || "Not specified",
    role: project.projectType === "FullStack" ? "Full-stack Developer" : "Frontend Developer",
    client: project.clientName,
    liveUrl: project.liveUrl,
    tags,
    heroImage: PLACEHOLDER_IMAGE,
    results: [
      ...(project.features?.length
        ? [{ value: String(project.features.length), label: "Key features" }]
        : []),
      ...(tags.length ? [{ value: String(tags.length), label: "Technologies" }] : []),
      ...(project.timeline
        ? [{ value: project.timeline, label: "Timeline" }]
        : []),
    ],
    ...(project.description ? { solution: project.description } : {}),
    ...(project.features?.length
      ? {
          features: project.features.map((feature) => ({
            title: feature,
            description:
              "This feature is part of the project experience. A detailed description can be added here later.",
            image: PLACEHOLDER_IMAGE,
          })),
        }
      : {}),
    ...(project.galleryImages?.length
      ? {
          gallery: project.galleryImages.map((image, index) => ({
            src: PLACEHOLDER_IMAGE,
            caption: `${project.name} preview ${index + 1}`,
            kind: "desktop" as const,
          })),
        }
      : {}),
    ...(project.challenges?.length
      ? {
          challenges: project.challenges.map((challenge) => ({
            title: challenge,
            description:
              "A focused implementation decision helped keep this part of the project reliable and user-friendly.",
          })),
        }
      : {}),
  };
}

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  const projectIndex = useMemo(
    () =>
      PortfolioData.findIndex(
        (project) => slugify(project.name) === params?.slug?.toLowerCase(),
      ),
    [params?.slug],
  );

  const project = projectIndex >= 0 ? PortfolioData[projectIndex] : undefined;
  const projectData = project ? toDetailData(project) : undefined;
  const nextProject = project
    ? PortfolioData[(projectIndex + 1) % PortfolioData.length]
    : undefined;

  if (!projectData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] px-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="mt-3 text-white/60">
            This project is not available in PortfolioData.
          </p>
        </div>
      </main>
    );
  }

  const next: NextProjectData | undefined = nextProject
    ? {
        title: nextProject.name,
        href: `/projects/${slugify(nextProject.name)}`,
        image: PLACEHOLDER_IMAGE,
      }
    : undefined;

  return (
    <ProjectDetail
      project={projectData}
      next={next}
      accentColor={selectedColor}
      contactHref="#contact"
    />
  );
}