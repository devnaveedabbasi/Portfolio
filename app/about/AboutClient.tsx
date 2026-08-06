// app/about/AboutClient.tsx - CLIENT COMPONENT
'use client';

import { useEffect, useRef, useState } from "react";
import Button from "@/component/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import Terminal from "@/component/terminal";

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

interface AboutClientProps {
  personalInfo: any[];
  experienceData: any[];
  educations: any[];
  experiences: any[];
}

export default function AboutClient({
  personalInfo,
  experienceData,
  educations,
  experiences,
}: AboutClientProps) {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [isClient, setIsClient] = useState(false);

  // Refs for animations
  const headerRef = useRef<HTMLDivElement>(null);
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const desktopProfileImageRef = useRef<HTMLDivElement>(null);

  // Arrays for multiple refs
  const personalCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillCategoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillTagsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const downloadNow = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Skills data
  const skills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js",
      "Tailwind CSS", "Bootstrap", "Material-UI", "Framer Motion", "GSAP",
      "Chakra UI", "Redux Toolkit", "Zustand"
    ],
    backend: [
      "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Supabase",
      "REST APIs", "Fast Api", "JWT Authentication", "Socket.io", "AI Integration"
    ],
    tools: [
      "Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel", "Netlify", "AWS", "Prisma",
      "Cloudflare", "NPM/Yarn", "ESLint", "Prettier"
    ],
    // languages: [
    //   "JavaScript", "TypeScript", "Python", "C++",
    // ]
  };

  // Professional icons for personal info
  const infoIcons = {
    firstName: "mdi:account",
    lastName: "mdi:account",
    Age: "mdi:cake",
    Nationality: "mdi:earth",
    Freelance: "mdi:briefcase-check",
    Address: "mdi:map-marker",
    phone: "mdi:phone",
    Email: "mdi:email",
    languages: "mdi:translate"
  };

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize ref arrays
  useEffect(() => {
    personalCardsRef.current = personalCardsRef.current.slice(0, personalInfo.length);
    statCardsRef.current = statCardsRef.current.slice(0, experienceData.length);
    skillCategoriesRef.current = skillCategoriesRef.current.slice(0, 4);
    skillTagsRef.current = [];
    timelineItemsRef.current = [];
  }, [personalInfo.length, experienceData.length]);

  // Main animations
  useEffect(() => {
    if (!isClient || !gsap) return;

    const initAnimations = () => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      // Personal info card animation
      if (personalInfoRef.current) {
        gsap.fromTo(
          personalInfoRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.7)" }
        );
      }

      // Stats card animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.7)", delay: 0.1 }
        );
      }

      // Personal info items staggered animation
      personalCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.1 + (index * 0.05),
              ease: "power2.out"
            }
          );
        }
      });

      // Stats cards animation with counter
      statCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.2 + (index * 0.1),
              ease: "elastic.out(1, 0.5)"
            }
          );

          // Number counting animation
          const numberElement = card.querySelector('span:first-child');
          const plusElement = card.querySelector('span:last-child');
          const years = experienceData[index]?.years || 0;

          if (numberElement) {
            gsap.fromTo(
              numberElement,
              { innerText: 0 },
              {
                innerText: years,
                duration: 1.5,
                delay: 0.3 + (index * 0.1),
                ease: "power2.out",
                snap: { innerText: 1 }
              }
            );
          }

          if (plusElement) {
            gsap.fromTo(
              plusElement,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.5 + (index * 0.1),
                ease: "back.out(1.7)"
              }
            );
          }
        }
      });

      // Profile image animations
      if (profileImageRef.current) {
        gsap.fromTo(
          profileImageRef.current,
          { opacity: 0, scale: 0.5, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" }
        );
      }

      if (desktopProfileImageRef.current) {
        gsap.fromTo(
          desktopProfileImageRef.current,
          { opacity: 0, scale: 0.5, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      // Skills section scroll animation
      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current,
          {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
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

      // Skill categories staggered animation
      skillCategoriesRef.current.forEach((category, index) => {
        if (category) {
          gsap.fromTo(
            category,
            {
              scrollTrigger: {
                trigger: category,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              opacity: 0,
              x: index % 2 === 0 ? -30 : 30
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.1
            }
          );
        }
      });

      // Skill tags staggered animation
      skillTagsRef.current.forEach((tag, index) => {
        if (tag) {
          gsap.fromTo(
            tag,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              delay: 0.5 + (index * 0.03),
              ease: "back.out(1.7)"
            }
          );
        }
      });

      // Education & Experience section
      if (educationRef.current && experienceRef.current) {
        gsap.fromTo(
          [educationRef.current, experienceRef.current],
          {
            scrollTrigger: {
              trigger: educationRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1
          }
        );
      }

      // Timeline items staggered animation
      timelineItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
              },
              opacity: 0,
              x: -20
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: index * 0.05
            }
          );

          // Icon animation
          const icon = item.querySelector('div[style*="background-color"]');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotate: -180 },
              { scale: 1, rotate: 0, duration: 0.6, delay: 0.1 + (index * 0.05), ease: "back.out(1.7)" }
            );
          }
        }
      });

      // Floating animations for profile images
      [profileImageRef.current, desktopProfileImageRef.current].forEach((image) => {
        if (image) {
          gsap.to(image, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2
          });
        }
      });

      // Hover animations for skill tags
      skillTagsRef.current.forEach((tag) => {
        if (tag) {
          const onMouseEnter = () => {
            gsap.to(tag, {
              scale: 1.05,
              duration: 0.2,
              ease: "power2.out"
            });
          };

          const onMouseLeave = () => {
            gsap.to(tag, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          };

          tag.addEventListener('mouseenter', onMouseEnter);
          tag.addEventListener('mouseleave', onMouseLeave);

          // Cleanup function
          return () => {
            tag.removeEventListener('mouseenter', onMouseEnter);
            tag.removeEventListener('mouseleave', onMouseLeave);
          };
        }
      });
    };

    const timeoutId = setTimeout(initAnimations, 200);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger?.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [isClient, experienceData]);

  // Helper function to set ref in array (returns void)
  const setPersonalCardRef = (el: HTMLDivElement | null, index: number) => {
    personalCardsRef.current[index] = el;
  };

  const setStatCardRef = (el: HTMLDivElement | null, index: number) => {
    statCardsRef.current[index] = el;
  };

  const setSkillCategoryRef = (el: HTMLDivElement | null, index: number) => {
    skillCategoriesRef.current[index] = el;
  };

  const addSkillTagRef = (el: HTMLSpanElement | null) => {
    if (el) skillTagsRef.current.push(el);
  };

  const addTimelineItemRef = (el: HTMLDivElement | null) => {
    if (el) timelineItemsRef.current.push(el);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 8;
    const rotateY = (x - xc) / 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <>
      <MobileNavigation navHeadFirst="About" NavHeadSec="Us" />

      <div className="min-h-screen w-full bg-black">
        {/* Header Section */}
        <div ref={headerRef} className="ml-5 hidden h-[180px] items-center justify-center md:flex">
          <HeaderText
            backHead="RESUME"
            frontHeadSimple="ABOUT"
            frontHeadColor="ME"
          />
        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          {/* Section 1: Personal Info & Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Personal Information Card */}
              <div ref={personalInfoRef} className="order-2 lg:order-1">
                <div className="rounded-xl border border-[#252525] bg-black p-2 md:p-4">
                  <h2 className="mb-6 font-Poppins text-2xl font-semibold uppercase leading-[31.2px] tracking-wide text-white md:text-[26px]">
                    Personal Information
                  </h2>

                  <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:gap-6">
                    {/* Profile Image for Mobile */}
                    <div ref={profileImageRef} className="mb-6 flex w-full justify-center md:hidden">
                      <div className="relative h-64 w-64">
                        <Image
                          src="/assets/img/meee2.png"
                          fill
                          priority
                          fetchPriority="high"
                          alt="Naveed Abbasi Profile"
                          className="rounded-full border-4 object-cover"
                          style={{ borderColor: selectedColor }}
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                      </div>
                    </div>

                    {/* macOS Terminal CLI Component */}
                    <div className="w-full mt-4 md:mt-0">
                      <Terminal personalInfo={personalInfo} selectedColor={selectedColor} onDownloadCV={downloadNow} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Stats Card */}
              <div ref={statsRef} className="order-1 lg:order-2 md:mt-0 mt-16">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[#252525] bg-gradient-to-b from-[#0d0d0d] to-black p-6 md:p-8">
                  {/* ambient glow */}
                  <div
                    className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[85%] -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
                    style={{ backgroundColor: selectedColor }}
                  />

                  <div className="relative flex flex-col items-center text-center">
                    {/* Profile image with hover effect */}
                    <div className="relative mb-6 h-56 w-56 md:h-64 md:w-64">
                      {/* rotating dashed ring */}
                      <div
                        className="absolute -inset-3 rounded-full border border-dashed opacity-40 transition-transform duration-[6s] ease-linear group-hover:rotate-180"
                        style={{ borderColor: selectedColor }}
                      />
                      {/* glow ring */}
                      <div
                        className="absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                        style={{ backgroundColor: selectedColor }}
                      />

                      <div className="relative h-full w-full overflow-hidden rounded-full border-4" style={{ borderColor: selectedColor }}>
                        <Image
                          src="/assets/img/meee2.png"
                          fill
                          priority
                          fetchPriority="high"
                          alt="Naveed Abbasi"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        {/* dark overlay that fades on hover, revealing a caption */}
                        <div className="absolute inset-0 flex items-end justify-center  opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <span
                            className="mb-4 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
                            style={{ backgroundColor: selectedColor }}
                          >
                            Let&apos;s build something
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Name + role */}
                    <h2 className="font-Poppins text-2xl font-semibold uppercase tracking-wide text-white md:text-[26px]">
                      Naveed Abbasi
                    </h2>
                    <p
                      className="mb-4 mt-1 font-Open_Sans text-sm font-medium uppercase tracking-wider"
                      style={{ color: selectedColor }}
                    >
                      Full Stack Developer
                    </p>

                    {/* Short bio */}
                    <p className="max-w-xs font-Open_Sans text-sm font-light leading-[1.7] text-stone-300/90">
                      I build fast, scalable web apps with clean code and thoughtful design turning ideas into products people actually enjoy using.
                    </p>

                    {/* Quick info pills */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      {["React", "Next.js", "Node.js", "TypeScript"].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border px-3 py-1 text-[11px] font-medium text-stone-200 transition-colors duration-300 hover:text-white"
                          style={{ borderColor: `${selectedColor}55` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Skills */}
          <section ref={skillsRef} className="mb-16">
            <div className="mb-10 text-center">
              <h2 className="mb-3 font-Poppins text-3xl font-bold text-white">
                My Skills
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Frontend Skills */}
              <div
                ref={(el) => setSkillCategoryRef(el, 0)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="rounded-xl border border-[#252525] bg-black p-6 cursor-default"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + '20' }}
                  >
                    <Icon
                      icon="mdi:monitor"
                      width={20}
                      style={{ color: selectedColor }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
                  {skills.frontend.map((skill, index) => (
                    <span
                      key={index}
                      ref={addSkillTagRef}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300 transition-colors duration-200 hover:border-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div
                ref={(el) => setSkillCategoryRef(el, 1)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="rounded-xl border border-[#252525] bg-black p-6 cursor-default"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + '20' }}
                  >
                    <Icon
                      icon="mdi:server"
                      width={20}
                      style={{ color: selectedColor }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
                  {skills.backend.map((skill, index) => (
                    <span
                      key={index}
                      ref={addSkillTagRef}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300 transition-colors duration-200 hover:border-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div
                ref={(el) => setSkillCategoryRef(el, 2)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="rounded-xl border border-[#252525] bg-black p-6 cursor-default"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + '20' }}
                  >
                    <Icon
                      icon="mdi:tools"
                      width={20}
                      style={{ color: selectedColor }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
                  {skills.tools.map((skill, index) => (
                    <span
                      key={index}
                      ref={addSkillTagRef}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300 transition-colors duration-200 hover:border-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programming Languages */}
              {/* <div
                ref={(el) => setSkillCategoryRef(el, 3)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="rounded-xl border border-[#252525] bg-black p-6 cursor-default"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + '20' }}
                  >
                    <Icon
                      icon="mdi:code-braces"
                      width={20}
                      style={{ color: selectedColor }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
                  {skills.languages.map((skill, index) => (
                    <span
                      key={index}
                      ref={addSkillTagRef}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300 transition-colors duration-200 hover:border-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          </section>

          {/* Section 3: Education & Experience */}
          <section className="bg-black py-10">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                EDUCATION & EXPERIENCE
              </h2>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
                {/* Education Section */}
                <div ref={educationRef}>
                  <h3 className="mb-8 text-xl font-semibold text-white md:text-2xl lg:hidden">
                    Education
                  </h3>
                  <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800"></div>

                    {educations.map((edu, index) => (
                      <div
                        key={index}
                        ref={addTimelineItemRef}
                        className="relative mb-8 flex items-start last:mb-0 md:mb-10"
                      >
                        <div className="relative mr-4 flex-shrink-0 z-10">
                          <div
                            className="rounded-full p-2"
                            style={{ backgroundColor: selectedColor }}
                          >
                            <Icon
                              icon="tdesign:education-filled"
                              width={20}
                              height={20}
                              className="text-white"
                            />
                          </div>
                        </div>

                        <div className="flex-1 pt-1">
                          <span className="inline-block rounded-full bg-[#212121] px-3 py-1 text-xs text-gray-200 md:text-sm">
                            {edu.date}
                          </span>
                          <h4 className="mt-2 text-base font-medium text-white md:text-lg">
                            {edu.title}{" "}
                            <span className="block text-gray-400 md:inline">
                              – {edu.institution}
                            </span>
                          </h4>
                          <p className="mt-2 text-sm text-gray-300 md:text-base">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div ref={experienceRef}>
                  <h3 className="mb-8 text-xl font-semibold text-white md:text-2xl lg:hidden">
                    Experience
                  </h3>
                  <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800"></div>

                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        ref={addTimelineItemRef}
                        className="relative mb-8 flex items-start last:mb-0 md:mb-10"
                      >
                        <div className="relative z-10 mr-4 flex-shrink-0">
                          <div
                            className="rounded-full p-2"
                            style={{ backgroundColor: selectedColor }}
                          >
                            <Icon
                              icon="hugeicons:permanent-job"
                              width={20}
                              height={20}
                              className="text-white"
                            />
                          </div>
                        </div>

                        <div className="flex-1 pt-1">
                          <span className="inline-block rounded-full bg-[#212121] px-3 py-1 text-xs text-gray-200 md:text-sm">
                            {exp.date}
                          </span>
                          <h4 className="mt-2 text-base font-medium text-white md:text-lg">
                            {exp.title}{" "}
                            <span className="block text-gray-400 md:inline">
                              – {exp.company}
                            </span>
                          </h4>
                          <p className="mt-2 text-sm text-gray-300 md:text-base">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}