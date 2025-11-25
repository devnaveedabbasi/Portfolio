"use client";
import React, { useMemo, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioData, Portfolio } from "@/constant/data";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import ImageGallery from "@/component/imageGallery";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const project: Portfolio | undefined = useMemo(() => {
    return PortfolioData.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug?.toLowerCase(),
    );
  }, [slug]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }
    if (contentRef.current) {
      gsap.fromTo(
        ".fade-in-up",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
        <div className="text-center">
          <Icon
            icon="mdi:alert-circle-outline"
            width={64}
            height={64}
            className="mx-auto mb-4 text-red-500"
          />
          <h1 className="mb-2 text-3xl font-bold text-gray-300">
            Project Not Found
          </h1>
          <p className="mb-6 text-gray-400">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-gray-300 transition-all hover:bg-blue-700"
          >
            <Icon icon="mdi:arrow-left" width={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const techStack = project.Technologies.split(",").map((tech) => tech.trim());

  return (
    <div className="min-h-screen bg-[#111111] text-gray-300">
      <div
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-gray-700 bg-black/50 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-700"
          >
            <Icon icon="mdi:arrow-left" width={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold" style={{ color: selectedColor }}>
            {project.name}
          </h1>
          <div className="w-[120px]"></div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="fade-in-up mb-12 overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={project.cardImage || DefaultImage}
            alt={project.name}
            width={1200}
            height={400}
            priority
            className="h-96 w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="fade-in-up rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="text-4xl font-bold"
                  style={{ color: selectedColor }}
                >
                  {project.name}
                </h2>
                {/* <span
                  style={{ color: selectedColor }}
                  className={`rounded-full border bg-blue-400/10 px-4 py-1 text-sm font-bold uppercase`}
                >
                  {project.projectType}
                </span> */}
              </div>
              <p className="text-xl text-gray-300">
                {project.shortDescription}
              </p>
              <p className="mt-4 leading-relaxed text-gray-400">
                {project.description}
              </p>
            </div>

            <div className="fade-in-up">
              <h3 className="mb-4 text-2xl font-bold text-gray-300">
                Project Preview
              </h3>
              <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-xl">
                <div className="aspect-video w-full">
                  <iframe
                    src={project.ProjectVedio}
                    allow="autoplay"
                    loading="lazy"
                    className="h-full w-full"
                    title={`${project.name} Preview`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Timeline */}
            <div className="fade-in-up rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="mdi:calendar-outline"
                  width={24}
                  style={{ color: selectedColor }}
                />

                <h3
                  className="text-lg font-bold"
                  style={{ color: selectedColor }}
                >
                  Timeline
                </h3>
              </div>

              <p className="text-3xl font-bold text-gray-300">
                {project.timeline}
              </p>
              <p className="mt-2 text-sm text-gray-400">Project duration</p>
            </div>

            {/* TechStack */}
            <div className="fade-in-up rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="gridicons:code"
                  width={24}
                  style={{ color: selectedColor }}
                />
                <h3
                  className="text-lg font-bold"
                  style={{ color: selectedColor }}
                >
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    // style={{ color: selectedColor }}
                    className="inline-block rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="fade-in-up rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="quill:link-out"
                  width={24}
                  style={{ color: selectedColor }}
                />
                <h3
                  className="text-lg font-bold"
                  style={{ color: selectedColor }}
                >
                  View Project
                </h3>
              </div>

              <div className="space-y-3">
                {/* LinkedIn Post Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  <Icon icon="mdi:linkedin" width={20} />
                  LinkedIn Post
                </a>

                {/* Live URL Link - Only show if exists */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold transition-all hover:bg-green-700 hover:shadow-lg"
                  >
                    <Icon icon="mdi:web" width={20} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => router.back()}
              style={{ background: selectedColor }}
              className="fade-in-up w-full rounded-lg px-6 py-3 font-semibold text-black transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50"
            >
              Explore More Projects
            </button>
          </div>
        </div>

        <div className="fade-in-up mb-8 mt-4">
          <h3
            className="mb-4 text-2xl font-bold"
            style={{ color: selectedColor }}
          >
            Key Features
          </h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-4 transition-colors hover:border-yellow-500/50 hover:bg-gray-900"
              >
                <Icon
                  icon="mdi:check-circle"
                  width={24}
                  className="mt-1 flex-shrink-0 text-green-400"
                />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Yahan ImageGallery component use karo */}
        <div className="fade-in-up mb-8">
          {project.galleryImages && project.galleryImages.length > 0 && (
            <ImageGallery
              images={project.galleryImages}
              projectName={project.name}
            />
          )}
        </div>

        <div className="fade-in-up mb-8">
          <h3
            className="font-bol mb-4 text-2xl"
            style={{ color: selectedColor }}
          >
            Challenges & Solutions
          </h3>
          <ul className="space-y-3">
            {project.challenges.map((challenge, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-4 transition-colors hover:border-orange-500/50 hover:bg-gray-900"
              >
                <Icon
                  icon="mdi:alert-circle"
                  width={24}
                  className="mt-1 flex-shrink-0 text-orange-400"
                />
                <span className="text-gray-300">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-in-up mt-16 border-t border-gray-700 pt-8">
          <div className="rounded-lg bg-gray-900/50 p-8 text-center">
            <h3
              className="mb-4 text-2xl font-bold"
              style={{ color: selectedColor }}
            >
              Ready to work together?
            </h3>
            <p className="mb-6 text-gray-400">
              Check out my other projects or get in touch for collaboration
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/portfolio"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition-all hover:bg-blue-700"
              >
                View All Projects
              </Link>
              <Link
                href="/contact-us"
                className="rounded-lg border border-gray-600 px-6 py-3 font-semibold transition-all hover:border-gray-400 hover:bg-gray-800"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
