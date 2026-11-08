// app/about/AboutClient.tsx - CLIENT COMPONENT
'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import Terminal from "@/component/terminal";
import AOS from "aos";
import "aos/dist/aos.css";

interface AboutClientProps {
  personalInfo: any[];
  experienceData: any[];
  educations: any[];
  experiences: any[];
}

export default function AboutClient({
  personalInfo,
  educations,
  experiences,
}: AboutClientProps) {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [isClient, setIsClient] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const eduExpSectionRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const eduLineRef = useRef<HTMLDivElement>(null);
  const expLineRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  const skillTagsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const eduItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const downloadNow = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
  };

  useEffect(() => {
    setIsClient(true);
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
    });
  }, []);

  useEffect(() => {
    if (isClient) {
      AOS.refresh();
    }
  }, [isClient, selectedColor]);

  useEffect(() => {
    if (!isClient) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const setup = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header entrance
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
          );
        }

        // About personal info — slide in from left
        if (personalInfoRef.current) {
          gsap.fromTo(
            personalInfoRef.current,
            { opacity: 0, x: -60, rotateY: 8 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: personalInfoRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Profile / stats card — slide in from right with scale
        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current,
            { opacity: 0, x: 60, scale: 0.92 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Soft floating loop on profile image
          const profile = statsRef.current.querySelector("[data-float]");
          if (profile) {
            gsap.to(profile, {
              y: -8,
              duration: 2.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.2,
            });
          }
        }

        // Skill tags pop-in once skills section enters view
        if (skillsRef.current) {
          const tags = skillTagsRef.current.filter(Boolean);
          gsap.fromTo(
            tags,
            { opacity: 0, scale: 0.7 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              stagger: 0.02,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Education & Experience section title
        if (sectionTitleRef.current) {
          gsap.fromTo(
            sectionTitleRef.current,
            { opacity: 0, y: 30, letterSpacing: "0.35em" },
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.05em",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Timeline line draw — education
        if (eduLineRef.current && educationRef.current) {
          gsap.fromTo(
            eduLineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: educationRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Timeline line draw — experience
        if (expLineRef.current && experienceRef.current) {
          gsap.fromTo(
            expLineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: experienceRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Education column slide
        if (educationRef.current) {
          gsap.fromTo(
            educationRef.current,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: educationRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Experience column slide
        if (experienceRef.current) {
          gsap.fromTo(
            experienceRef.current,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: experienceRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Education timeline items
        eduItemsRef.current.filter(Boolean).forEach((item, index) => {
          if (!item) return;

          gsap.fromTo(
            item,
            { opacity: 0, x: -36, filter: "blur(6px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.65,
              delay: index * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );

          const icon = item.querySelector("[data-timeline-icon]");
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotate: -160 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.7,
                delay: 0.1 + index * 0.12,
                ease: "back.out(1.8)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          const card = item.querySelector("[data-timeline-card]");
          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                delay: 0.15 + index * 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // Experience timeline items — mirror entrance from right
        expItemsRef.current.filter(Boolean).forEach((item, index) => {
          if (!item) return;

          gsap.fromTo(
            item,
            { opacity: 0, x: 36, filter: "blur(6px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.65,
              delay: index * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );

          const icon = item.querySelector("[data-timeline-icon]");
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotate: 160 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.7,
                delay: 0.1 + index * 0.12,
                ease: "back.out(1.8)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          const card = item.querySelector("[data-timeline-card]");
          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                delay: 0.15 + index * 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // Parallax glow on edu/exp section
        if (eduExpSectionRef.current) {
          const glow = eduExpSectionRef.current.querySelector("[data-section-glow]");
          if (glow) {
            gsap.to(glow, {
              y: 80,
              ease: "none",
              scrollTrigger: {
                trigger: eduExpSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }
      });
    };

    setup();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [isClient]);

  const addSkillTagRef = (el: HTMLSpanElement | null) => {
    if (el && !skillTagsRef.current.includes(el)) {
      skillTagsRef.current.push(el);
    }
  };

  const setEduItemRef = (el: HTMLDivElement | null, index: number) => {
    eduItemsRef.current[index] = el;
  };

  const setExpItemRef = (el: HTMLDivElement | null, index: number) => {
    expItemsRef.current[index] = el;
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
                  <h2
                    className="mb-6 font-Poppins text-2xl font-semibold uppercase leading-[31.2px] tracking-wide text-white md:text-[26px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Personal Information
                  </h2>

                  <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:gap-6">
                    <div ref={profileImageRef} className="mb-6 flex w-full justify-center md:hidden">
                      <div className="relative h-64 w-64" data-aos="zoom-in" data-aos-delay="150">
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

                    <div className="mt-4 w-full md:mt-0" data-aos="fade-up" data-aos-delay="200">
                      <Terminal personalInfo={personalInfo} selectedColor={selectedColor} onDownloadCV={downloadNow} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Stats Card */}
              <div ref={statsRef} className="order-1 mt-16 lg:order-2 md:mt-0">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[#252525] bg-gradient-to-b from-[#0d0d0d] to-black p-6 md:p-8">
                  <div
                    className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[85%] -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
                    style={{ backgroundColor: selectedColor }}
                  />

                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative mb-6 h-56 w-56 md:h-64 md:w-64" data-float>
                      <div
                        className="absolute -inset-3 rounded-full border border-dashed opacity-40 transition-transform duration-[6s] ease-linear group-hover:rotate-180"
                        style={{ borderColor: selectedColor }}
                      />
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
                        <div className="absolute inset-0 flex items-end justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <span
                            className="mb-4 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
                            style={{ backgroundColor: selectedColor }}
                          >
                            Let&apos;s build something
                          </span>
                        </div>
                      </div>
                    </div>

                    <h2
                      className="font-Poppins text-2xl font-semibold uppercase tracking-wide text-white md:text-[26px]"
                      data-aos="fade-up"
                      data-aos-delay="120"
                    >
                      Naveed Abbasi
                    </h2>
                    <p
                      className="mb-4 mt-1 font-Open_Sans text-sm font-medium uppercase tracking-wider"
                      style={{ color: selectedColor }}
                      data-aos="fade-up"
                      data-aos-delay="180"
                    >
                      Full Stack Developer
                    </p>

                    <p
                      className="max-w-xs font-Open_Sans text-sm font-light leading-[1.7] text-stone-300/90"
                      data-aos="fade-up"
                      data-aos-delay="240"
                    >
                      I build fast, scalable web apps with clean code and thoughtful design turning ideas into products people actually enjoy using.
                    </p>

                    <div
                      className="mt-6 flex flex-wrap items-center justify-center gap-2"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    >
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
            <div className="mb-10 text-center" data-skills-heading data-aos="fade-up">
              <h2 className="mb-3 font-Poppins text-3xl font-bold text-white">
                My Skills
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="cursor-default rounded-xl border border-[#252525] bg-black p-6"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + "20" }}
                  >
                    <Icon icon="mdi:monitor" width={20} style={{ color: selectedColor }} />
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

              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="cursor-default rounded-xl border border-[#252525] bg-black p-6"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + "20" }}
                  >
                    <Icon icon="mdi:server" width={20} style={{ color: selectedColor }} />
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

              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="cursor-default rounded-xl border border-[#252525] bg-black p-6"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mb-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor + "20" }}
                  >
                    <Icon icon="mdi:tools" width={20} style={{ color: selectedColor }} />
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
            </div>
          </section>

          {/* Section 3: Education & Experience */}
          <section ref={eduExpSectionRef} className="relative overflow-hidden bg-black py-10">
            <div
              data-section-glow
              className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: selectedColor }}
            />

            <div className="relative mx-auto max-w-6xl">
              <h2
                ref={sectionTitleRef}
                className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-white md:text-3xl lg:text-4xl"
              >
                Education & Experience
              </h2>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
                {/* Education Section */}
                <div ref={educationRef}>
                  <h3 className="mb-8 flex items-center gap-3 text-xl font-semibold text-white md:text-2xl">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: selectedColor + "25" }}
                    >
                      <Icon icon="tdesign:education-filled" width={18} style={{ color: selectedColor }} />
                    </span>
                    Education
                  </h3>

                  <div className="relative">
                    <div
                      ref={eduLineRef}
                      className="absolute bottom-0 left-[18px] top-0 w-[2px]"
                      style={{
                        background: `linear-gradient(to bottom, ${selectedColor}, transparent)`,
                      }}
                    />

                    {educations.map((edu, index) => (
                      <div
                        key={index}
                        ref={(el) => setEduItemRef(el, index)}
                        className="relative mb-8 flex items-start last:mb-0 md:mb-10"
                      >
                        <div className="relative z-10 mr-4 flex-shrink-0">
                          <div
                            data-timeline-icon
                            className="rounded-full p-2 shadow-lg transition-transform duration-300 hover:scale-110"
                            style={{
                              backgroundColor: selectedColor,
                              boxShadow: `0 0 18px ${selectedColor}55`,
                            }}
                          >
                            <Icon
                              icon="tdesign:education-filled"
                              width={20}
                              height={20}
                              className="text-white"
                            />
                          </div>
                        </div>

                        <div
                          data-timeline-card
                          className="flex-1 rounded-xl border border-[#252525] bg-[#0a0a0a]/80 p-4 pt-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111]"
                        >
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs text-white md:text-sm"
                            style={{ backgroundColor: selectedColor + "30", color: selectedColor }}
                          >
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
                  <h3 className="mb-8 flex items-center gap-3 text-xl font-semibold text-white md:text-2xl">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: selectedColor + "25" }}
                    >
                      <Icon icon="hugeicons:permanent-job" width={18} style={{ color: selectedColor }} />
                    </span>
                    Experience
                  </h3>

                  <div className="relative">
                    <div
                      ref={expLineRef}
                      className="absolute bottom-0 left-[18px] top-0 w-[2px]"
                      style={{
                        background: `linear-gradient(to bottom, ${selectedColor}, transparent)`,
                      }}
                    />

                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        ref={(el) => setExpItemRef(el, index)}
                        className="relative mb-8 flex items-start last:mb-0 md:mb-10"
                      >
                        <div className="relative z-10 mr-4 flex-shrink-0">
                          <div
                            data-timeline-icon
                            className="rounded-full p-2 shadow-lg transition-transform duration-300 hover:scale-110"
                            style={{
                              backgroundColor: selectedColor,
                              boxShadow: `0 0 18px ${selectedColor}55`,
                            }}
                          >
                            <Icon
                              icon="hugeicons:permanent-job"
                              width={20}
                              height={20}
                              className="text-white"
                            />
                          </div>
                        </div>

                        <div
                          data-timeline-card
                          className="flex-1 rounded-xl border border-[#252525] bg-[#0a0a0a]/80 p-4 pt-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111]"
                        >
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs md:text-sm"
                            style={{ backgroundColor: selectedColor + "30", color: selectedColor }}
                          >
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
