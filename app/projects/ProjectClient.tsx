// app/projects/ProjectsClient.tsx - CLIENT COMPONENT
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderText from "@/component/headerText";
import Image from "next/image";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import { Portfolio } from "@/constant/data";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Lazy load gsap only on client side to avoid forced reflows
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

interface ProjectsClientProps {
  portfolioData: Portfolio[];
}

export default function ProjectsClient({ portfolioData }: ProjectsClientProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(any | null)[]>([]);
  const [isClient, setIsClient] = useState(false);
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  // Optimize click handler with useCallback
  const handleProjectClick = useCallback((project: Portfolio) => {
    const slug = project.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/projects/${slug}`);
  }, [router]);

  // Set client flag for animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimized animation with debounce and cleanup
  useEffect(() => {
    if (!isClient || !gsap || !ScrollTrigger) return;

    let animationTimeout: NodeJS.Timeout;
    let scrollTriggers: any[] = [];

    const initAnimations = () => {
      // Initial fade-in animation
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          },
        );
      }

      // Hover animations with ScrollTrigger
      const cards = cardsRef.current.filter(Boolean);
      
      cards.forEach((card) => {
        if (card) {
          const trigger = ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
              gsap.to(card, {
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(card, {
                y: 0,
                duration: 0.2,
              });
            },
            onEnterBack: () => {
              gsap.to(card, {
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(card, {
                y: 0,
                duration: 0.2,
              });
            },
          });
          scrollTriggers.push(trigger);
        }
      });
    };

    // Debounce initialization
    animationTimeout = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(animationTimeout);
      scrollTriggers.forEach(trigger => trigger?.kill());
      ScrollTrigger?.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [isClient, portfolioData.length]);

  // Optimize image sizes
  const getImageSize = (index: number) => {
    if (index < 2) return { width: 600, height: 320 }; // First 2 images larger
    if (index < 6) return { width: 400, height: 240 }; // Next 4 medium
    return { width: 300, height: 180 }; // Rest smaller
  };

  return (
    <>
      <MobileNavigation navHeadFirst="My" NavHeadSec="Works" />

      {/* Simple Header Section */}
      <div className=" hidden h-[180px] items-center justify-center bg-black md:flex">
        <HeaderText
          backHead="Portfolio"
          frontHeadSimple="My Creative"
          frontHeadColor="Works"
        />
      </div>

      {/* Fixed Portfolio Grid */}
      <div className="min-h-screen md:mt-0 mt-16 bg-black py-6 md:py-8">
        <div
          ref={containerRef}
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {portfolioData.map((data, idx) => {
              const imageSize = getImageSize(idx);
              const imagePriority = idx < 2; // Only prioritize first 2 images for LCP
              
              return (
                <article
                  key={idx}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-800 bg-gray-900/30 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900/50"
                  onClick={() => handleProjectClick(data)}
                  aria-label={`View ${data.name} project details`}
                >
                  {/* Project Image - Optimized for LCP */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={data.cardImage || DefaultImage}
                      alt={data.name}
                      width={imageSize.width}
                      height={imageSize.height}
                      priority={imagePriority}
                      fetchPriority={imagePriority ? "high" : "auto"}
                      loading={imagePriority ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      // quality={idx < 4 ? 85 : 75} // Reduce quality for later images
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTExIi8+PC9zdmc+"
                    />

                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70"
                      aria-hidden="true"
                    ></div>

                    {/* Project Type Badge */}
                    <div className="absolute right-3 top-3 z-10">
                      <div
                        style={{ backgroundColor: selectedColor }}
                        className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        <span>{data.projectType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5">
                    {/* Project Title */}
                    <h3
                      className="mb-2 line-clamp-1 text-lg font-bold sm:text-xl"
                      style={{ color: selectedColor }}
                    >
                      {data.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-300 sm:text-base">
                      {data.shortDescription || "Project details coming soon."}
                    </p>

                    {/* Timeline */}
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                      <Icon icon="mdi:clock-outline" width={14} />
                      <span>{data.timeline}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {data.Technologies.split(",")
                        .slice(0, 3)
                        .map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: `${selectedColor}15`,
                              color: selectedColor,
                            }}
                            className="rounded-full px-2 py-1 text-xs font-medium"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      {data.Technologies.split(",").length > 3 && (
                        <span
                          style={{ color: selectedColor }}
                          className="rounded-full px-2 py-1 text-xs font-medium"
                        >
                          +{data.Technologies.split(",").length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 0 1px ${selectedColor}20, 0 4px 16px ${selectedColor}10`,
                    }}
                    aria-hidden="true"
                  ></div>
                </article>
              );
            })}
          </div>

          {/* Simple Call to Action */}
          <div className="mt-10 text-center md:mt-12">
            <div className="mx-auto max-w-md rounded-lg border border-gray-800 bg-gray-900/30 p-6 md:p-7">
              <h3
                className="mb-3 text-xl font-bold md:text-2xl"
                style={{ color: selectedColor }}
              >
                Ready to collaborate?
              </h3>
              <p className="mb-4 text-sm text-gray-300 md:text-base">
                Let&apos;s build something amazing together
              </p>
              <button
                onClick={() => router.push("/contact-us")}
                style={{ backgroundColor: selectedColor }}
                className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] md:px-7 md:py-2.5 md:text-base"
                aria-label="Get in touch for collaboration"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}