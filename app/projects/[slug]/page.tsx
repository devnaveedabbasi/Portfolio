// app/projects/[slug]/page.tsx - CLIENT COMPONENT
"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { PortfolioData, Portfolio } from "@/constant/data";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import ImageGallery from "@/component/imageGallery";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Lazy load GSAP
let gsap: any = null;
let ScrollTrigger: any = null;

if (typeof window !== 'undefined') {
  import('gsap').then((module) => {
    gsap = module.gsap;
    import('gsap/ScrollTrigger').then((stModule) => {
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
    });
  });
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [isClient, setIsClient] = useState(false);
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  // Refs for animations
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  
  const techRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const featureRefs = useRef<(HTMLLIElement | null)[]>([]);
  const challengeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sidebarCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linkButtonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const project: Portfolio | undefined = useMemo(() => {
    return PortfolioData.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug?.toLowerCase(),
    );
  }, [slug]);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize ref arrays
  useEffect(() => {
    if (project) {
      techRefs.current = [];
      featureRefs.current = [];
      challengeRefs.current = [];
      sidebarCardRefs.current = [];
      linkButtonRefs.current = [];
    }
  }, [project]);

  // Main animations
  useEffect(() => {
    if (!isClient || !gsap || !project) return;

    let animationTimeout: NodeJS.Timeout;
    const scrollTriggers: any[] = [];

    const initAnimations = () => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { 
            y: -100,
            opacity: 0
          },
          { 
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          }
        );
      }

      // Hero image animation
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { 
            scale: 1.1,
            opacity: 0,
            y: 50
          },
          { 
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2
          }
        );
      }

      // Back button animation
      if (backButtonRef.current) {
        gsap.fromTo(
          backButtonRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.5)" }
        );
      }

      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { 
            opacity: 0,
            y: 30,
            scale: 0.9
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "elastic.out(1, 0.5)"
          }
        );
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { 
            opacity: 0,
            y: 40
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.5,
            ease: "power3.out"
          }
        );
      }

      // Sidebar cards staggered animation
      sidebarCardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
              },
              opacity: 0,
              x: 30,
              scale: 0.9
            },
            { 
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              delay: 0.6 + (index * 0.1),
              ease: "back.out(1.7)"
            }
          );
        }
      });

      // Video container animation
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { 
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2
          }
        );
      }

      // Tech stack tags animation
      techRefs.current.forEach((tag, index) => {
        if (tag) {
          gsap.fromTo(
            tag,
            { opacity: 0, scale: 0.5, y: 20 },
            { 
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              delay: 0.8 + (index * 0.05),
              ease: "back.out(2)"
            }
          );

          // Hover effect
          tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
              scale: 1.1,
              y: -3,
              duration: 0.2,
              ease: "power2.out"
            });
          });

          tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        }
      });

      // Link buttons animation
      linkButtonRefs.current.forEach((button, index) => {
        if (button) {
          gsap.fromTo(
            button,
            { opacity: 0, y: 20 },
            { 
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.9 + (index * 0.1),
              ease: "back.out(1.7)"
            }
          );

          // Pulse animation
          gsap.to(button, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2 + (index * 0.5)
          });
        }
      });

      // Features animation
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current,
          { 
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.7
          }
        );
      }

      // Feature items staggered animation
      featureRefs.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(
            feature,
            { opacity: 0, x: -20 },
            { 
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1 + (index * 0.05),
              ease: "power2.out"
            }
          );

          // Icon animation
          const icon = feature.querySelector('svg, i');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotate: -180 },
              { scale: 1, rotate: 0, duration: 0.6, delay: 0.1 + (index * 0.05), ease: "back.out(1.7)" }
            );
          }
        }
      });

      // Gallery animation
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { 
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8
          }
        );
      }

      // Challenges animation
      if (challengesRef.current) {
        gsap.fromTo(
          challengesRef.current,
          { 
            scrollTrigger: {
              trigger: challengesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.7
          }
        );
      }

      // Challenge items staggered animation
      challengeRefs.current.forEach((challenge, index) => {
        if (challenge) {
          gsap.fromTo(
            challenge,
            { opacity: 0, x: 20 },
            { 
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1 + (index * 0.05),
              ease: "power2.out"
            }
          );
        }
      });

      // CTA section animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { 
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)"
          }
        );

        // CTA buttons animation
        const ctaButtons = ctaRef.current.querySelectorAll('a');
        ctaButtons.forEach((button, index) => {
          gsap.fromTo(
            button,
            { opacity: 0, y: 20 },
            { 
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3 + (index * 0.1),
              ease: "back.out(1.5)"
            }
          );
        });
      }

      // Page scroll reveal effect
      const sections = [
        heroImageRef.current,
        descriptionRef.current,
        videoRef.current,
        featuresRef.current,
        galleryRef.current,
        challengesRef.current,
        ctaRef.current
      ].filter(Boolean);

      sections.forEach((section, index) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            onEnter: () => {
              gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
              });
            }
          });
        }
      });

      // Back button glow effect
      if (backButtonRef.current) {
        gsap.to(backButtonRef.current, {
          boxShadow: `0 0 20px ${selectedColor}40`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3
        });
      }

      // Hero image parallax effect
      if (heroImageRef.current) {
        ScrollTrigger.create({
          trigger: heroImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self: any) => {
            gsap.to(heroImageRef.current, {
              y: -50 * self.progress,
              ease: "none"
            });
          }
        });
      }
    };

    animationTimeout = setTimeout(initAnimations, 300);

    return () => {
      clearTimeout(animationTimeout);
      scrollTriggers.forEach(trigger => trigger?.kill());
      ScrollTrigger?.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [isClient, project, selectedColor]);

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

  // Helper functions for refs
  const addTechRef = (el: HTMLSpanElement | null) => {
    if (el) techRefs.current.push(el);
  };

  const addFeatureRef = (el: HTMLLIElement | null, index: number) => {
    featureRefs.current[index] = el;
  };

  const addChallengeRef = (el: HTMLLIElement | null, index: number) => {
    challengeRefs.current[index] = el;
  };

  const setSidebarCardRef = (el: HTMLDivElement | null, index: number) => {
    sidebarCardRefs.current[index] = el;
  };

  const addLinkButtonRef = (el: HTMLAnchorElement | null) => {
    if (el) linkButtonRefs.current.push(el);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-300">
      <div
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button
            ref={backButtonRef}
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-700 hover:scale-105"
          >
            <Icon icon="mdi:arrow-left" width={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold" style={{ color: selectedColor }}>
            {project.name}
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div ref={heroImageRef} className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={project.cardImage || DefaultImage}
            alt={project.name}
            width={1200}
            height={400}
            priority
            fetchPriority="high"
            className="h-auto w-full md:object-cover object-fit"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Title & Description */}
            <div ref={descriptionRef} className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  ref={titleRef}
                  className="text-4xl font-bold"
                  style={{ color: selectedColor }}
                >
                  {project.name}
                </h2>
              </div>
              <p className="text-xl text-gray-300">
                {project.shortDescription}
              </p>
              <p className="mt-4 leading-relaxed text-gray-400">
                {project.description}
              </p>
            </div>

            {/* Project Preview */}
            <div ref={videoRef}>
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

          {/* Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            {/* Timeline */}
            <div 
              ref={(el) => setSidebarCardRef(el, 0)}
              className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="mdi:calendar-outline"
                  width={24}
                  style={{ color: selectedColor }}
                />
                <h3 className="text-lg font-bold" style={{ color: selectedColor }}>
                  Timeline
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-300">
                {project.timeline}
              </p>
              <p className="mt-2 text-sm text-gray-400">Project duration</p>
            </div>

            {/* Tech Stack */}
            <div 
              ref={(el) => setSidebarCardRef(el, 1)}
              className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="gridicons:code"
                  width={24}
                  style={{ color: selectedColor }}
                />
                <h3 className="text-lg font-bold" style={{ color: selectedColor }}>
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    ref={addTechRef}
                    className="inline-block rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View Project Links */}
            <div 
              ref={(el) => setSidebarCardRef(el, 2)}
              className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  icon="quill:link-out"
                  width={24}
                  style={{ color: selectedColor }}
                />
                <h3 className="text-lg font-bold" style={{ color: selectedColor }}>
                  View Project
                </h3>
              </div>
              <div className="space-y-3">
                <a
                  ref={addLinkButtonRef}
                  href={!project.link ? "https://www.linkedin.com/in/naveed-abbasi/" : project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:scale-105"
                >
                  <Icon icon="mdi:linkedin" width={20} />
                  LinkedIn Post
                </a>
                {project.liveUrl && (
                  <a
                    ref={addLinkButtonRef}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold transition-all hover:bg-green-700 hover:shadow-lg hover:scale-105"
                  >
                    <Icon icon="mdi:web" width={20} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Explore More Button */}
            <button
              onClick={() => router.back()}
              style={{ background: selectedColor }}
              className="w-full rounded-lg px-6 py-3 font-semibold text-black transition-all hover:scale-105 hover:shadow-xl"
            >
              Explore More Projects
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8 mt-12">
          <h3 className="mb-4 text-2xl font-bold" style={{ color: selectedColor }}>
            Key Features
          </h3>
          <ul ref={featuresRef} className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                ref={(el) => addFeatureRef(el, idx)}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-4 transition-all hover:border-yellow-500/50 hover:bg-gray-900 hover:scale-[1.02]"
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

        {/* Image Gallery */}
        <div ref={galleryRef} className="mb-8">
          {project.galleryImages && project.galleryImages.length > 0 && (
            <ImageGallery
              images={project.galleryImages}
              projectName={project.name}
            />
          )}
        </div>

        {/* Challenges & Solutions */}
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold" style={{ color: selectedColor }}>
            Challenges & Solutions
          </h3>
          <ul ref={challengesRef} className="space-y-3">
            {project.challenges.map((challenge, idx) => (
              <li
                key={idx}
                ref={(el) => addChallengeRef(el, idx)}
                className="flex items-start gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-4 transition-all hover:border-orange-500/50 hover:bg-gray-900 hover:scale-[1.02]"
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

        {/* CTA Section */}
        <div ref={ctaRef} className="mt-16 border-t border-gray-700 pt-8">
          <div className="rounded-lg bg-gray-900/50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold" style={{ color: selectedColor }}>
              Ready to work together?
            </h3>
            <p className="mb-6 text-gray-400">
              Check out my other projects or get in touch for collaboration
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition-all hover:bg-blue-700 hover:scale-105"
              >
                View All Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gray-600 px-6 py-3 font-semibold transition-all hover:border-gray-400 hover:bg-gray-800 hover:scale-105"
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