// app/about/AboutClient.tsx - CLIENT COMPONENT
'use client';

import Button from "@/component/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";

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

  const downloadNow = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Skills data - aap isko constant/data.ts se bhi import kar sakte ho
  const skills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", 
      "Tailwind CSS", "Bootstrap", "Material-UI", "Framer Motion", "GSAP","Chakra UI","Redux Toolkit","Zustand"
    ],
    backend: [
      "Node.js", "Express.js", "MongoDB", "MySQL", "Firebase","Supabase", "REST APIs","Fast Api",
      "JWT Authentication", "Socket.io","Ai Integration"
    ],
    tools: [
      "Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel", "Netlify",
      "Cloudflare", "NPM/Yarn", "ESLint", "Prettier"
    ],
    languages: [
      "JavaScript","TypeScript" ,"Python",, "C++", 
    ]
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

  return (
    <>
      <MobileNavigation navHeadFirst="About" NavHeadSec="Us" />

      <div className="min-h-screen w-full bg-black">
        {/* Header Section */}
        <div className="ml-5 hidden h-[180px] items-center justify-center md:flex">
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
              <div className="order-2 lg:order-1">
                <div className="rounded-xl border border-[#252525] bg-black p-2 md:p-4">
                  <h2 className="mb-6 font-Poppins text-2xl font-semibold uppercase leading-[31.2px] tracking-wide text-white md:text-[26px]">
                    Personal Information
                  </h2>
                  
                  <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:gap-6">
                    {/* Profile Image for Mobile */}
                    <div className="mb-6 flex w-full justify-center md:hidden">
                      <div className="relative h-64 w-64">
                        <Image
                          src="/assets/img/Me.png"
                          fill
                          priority
                          alt="Naveed Abbasi Profile"
                          className="rounded-full border-4 border-[#252525] object-cover"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                      </div>
                    </div>

                    {/* Personal Info Grid */}
                    <div className="w-full">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {personalInfo.map((item: any, index: number) => {
                          const key: string = Object.keys(item)[0];
                          const value: string | string[] = item[key];
                          const icon = infoIcons[key as keyof typeof infoIcons] || "mdi:information";

                          return (
                            <div
                              key={index}
                              className="flex  items-start text-wrap gap-3 rounded-lg border border-[#252525] bg-[#111111] p-3"
                            >
                              <Icon 
                                icon={icon} 
                                width={20}
                                className="mt-0.5 flex-shrink-0"
                                style={{ color: selectedColor }}
                              />
                              <div className="flex-1 flex-wrap">
                                <p className="mb-1 text-xs uppercase  text-wrap tracking-wider text-gray-400">
                                  {key}
                                </p>
                                <p className="text-sm font-medium  !text-wrap text-white">
                                  {Array.isArray(value) ? value.join(", ") : value}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Download CV Button */}
                  <div className="flex justify-center">
                    <Button
                      text="Download CV"
                      oNClick={downloadNow}
                      icon="ri:download-fill"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Stats Card */}
              <div className="order-1 lg:order-2 md:mt-0 mt-16">
                <div className="h-full rounded-xl border border-[#252525] bg-black p-2 md:p-8">
                  {/* Profile Image for Desktop */}
                  <div className="mb-8 hidden md:flex md:justify-center">
                    <div className="relative h-72 w-72">
                      <Image
                        src="/assets/img/Me.png"
                        fill
                        priority
                        alt="Naveed Abbasi Profile"
                        className="rounded-full border-4 border-[#252525] object-cover"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                    </div>
                  </div>

                  <h2 className="mb-6 font-Poppins text-2xl font-semibold uppercase leading-[31.2px] tracking-wide text-white md:text-[26px]">
                    Professional Highlightss
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {experienceData.map((val, idx) => (
                      <div
                        key={idx}
                        className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-[#252525] bg-[#111111] p-4 text-center md:h-36"
                      >
                        <div className="mb-2 flex items-center">
                          <span
                            className="font-Open_Sans text-[32px] font-bold md:text-[40px] lg:text-[45px]"
                            style={{ color: selectedColor }}
                          >
                            {val.years}
                          </span>
                          <span
                            className="text-[28px] md:text-[36px] lg:text-[40px]"
                            style={{ color: selectedColor }}
                          >
                            +
                          </span>
                        </div>
                        <p className="font-Open_Sans text-xs font-normal uppercase text-white md:text-sm">
                          {val.exper}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Skills */}
          <section className="mb-16">
            <div className="mb-10 text-center">
              <h2 className="mb-3 font-Poppins text-3xl font-bold text-white">
                My Skills
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Frontend Skills */}
              <div className="rounded-xl border border-[#252525] bg-black p-6">
                <div className="mb-6 flex items-center gap-3">
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
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="rounded-xl border border-[#252525] bg-black p-6">
                <div className="mb-6 flex items-center gap-3">
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
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="rounded-xl border border-[#252525] bg-black p-6">
                <div className="mb-6 flex items-center gap-3">
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
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programming Languages */}
              <div className="rounded-xl border border-[#252525] bg-black p-6">
                <div className="mb-6 flex items-center gap-3">
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
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-[#252525] bg-[#111111] px-3 py-1.5 text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
                <div>
                  <h3 className="mb-8 text-xl font-semibold text-white md:text-2xl lg:hidden">
                    Education
                  </h3>
                  <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800"></div>

                    {educations.map((edu, index) => (
                      <div
                        key={index}
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
                <div>
                  <h3 className="mb-8 text-xl font-semibold text-white md:text-2xl lg:hidden">
                    Experience
                  </h3>
                  <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800"></div>

                    {experiences.map((exp, index) => (
                      <div
                        key={index}
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