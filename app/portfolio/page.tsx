"use client";
import React from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import HeaderText from "@/component/headerText";
import Image from "next/image";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import { Portfolio, PortfolioData } from "@/constant/data";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const router = useRouter();
  const containerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  const handleProjectClick = (project: Portfolio) => {
    const slug = project.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/portfolio/${slug}`);
  };

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card) => {
      if (card) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.to(card, {
              y: -5,
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              y: -5,
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case "freelance":
        return "bg-orange-500/20 text-orange-300 border-orange-500";
      case "client":
        return "bg-blue-500/20 text-blue-300 border-blue-500";
      default:
        return "bg-green-500/20 text-green-300 border-green-500";
    }
  };

  return (
    <>
      <MobileNavigation navHeadFirst="My" NavHeadSec="Works" />

      {/* Simple Header Section */}
      <div className="ml-5 hidden h-[210px] items-center justify-center bg-black md:flex">
        <HeaderText
          backHead="Portfolio"
          frontHeadSimple="My Creative"
          frontHeadColor="Works"
        />
      </div>

      {/* Fixed Portfolio Grid */}
      <div className="min-h-screen bg-black py-8 md:py-12">
        <div
          ref={containerRef}
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {PortfolioData.map((data, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 transition-all duration-300 hover:border-gray-600 hover:shadow-2xl"
                onClick={() => handleProjectClick(data)}
              >
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden sm:h-52">
                  <Image
                    src={data.cardImage || DefaultImage}
                    alt={data.name}
                    fill
                    priority={idx < 3}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Project Type Badge */}
                  <div className="absolute left-3 top-3 z-10">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-bold uppercase ${getProjectTypeColor(data.projectType)}`}
                    >
                      {data.projectType}
                    </span>
                  </div>

                  {/* View Project Button */}
                  <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      style={{ backgroundColor: selectedColor }}
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white"
                    >
                      <span>{data.projectType}</span>
                      {/* <Icon icon="mdi:arrow-right" width={12} /> */}
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
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 0 1px ${selectedColor}30, 0 8px 32px ${selectedColor}15`,
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Simple Call to Action */}
          <div className="mt-12 text-center md:mt-16">
            <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-900/50 p-6 md:p-8">
              <h3
                className="mb-3 text-xl font-bold md:text-2xl"
                style={{ color: selectedColor }}
              >
                Ready to collaborate?
              </h3>
              <p className="mb-4 text-sm text-gray-300 md:text-base">
                Let's build something amazing together
              </p>
              <button
                onClick={() => router.push("/contact-us")}
                style={{ backgroundColor: selectedColor }}
                className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 md:px-8 md:py-3 md:text-base"
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
