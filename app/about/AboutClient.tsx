// app/about/AboutClient.tsx - CLIENT COMPONENT
'use client';

import Button from "@/component/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SkillsProgressLoader from "@/component/skillsProgressLoader";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";

interface AboutClientProps {
  personalInfo: any[];
  experienceData: any[];
  educations: any[];
  experiences: any[];
  skills: any[];
}

export default function AboutClient({
  personalInfo,
  experienceData,
  educations,
  experiences,
  skills,
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

  return (
    <>
      <MobileNavigation navHeadFirst="About" NavHeadSec="Us" />

      <div className="h-full w-full bg-black">
        <div className="ml-5 hidden h-[210px] items-center justify-center md:flex">
          <HeaderText
            backHead="RESUME"
            frontHeadSimple="ABOUT"
            frontHeadColor="ME"
          />
        </div>

        <section className="mb-5 mt-20 flex h-fit w-full items-center justify-center">
          <div className="!-ml-10 grid h-full w-[83%] grid-cols-1 lg:grid-cols-2">
            <div className="">
              <h1 className="ml-4 font-Poppins text-[26px] font-semibold uppercase leading-[31.2px] tracking-wide text-white md:ml-0">
                Personal Infos{" "}
              </h1>
              <div className="flex w-full justify-center md:hidden">
                <Image
                  src="/assets/img/Me.png"
                  width={740}
                  height={100}
                  priority
                  alt="Profile"
                  fetchPriority="high"
                  className="z-10 mt-2 h-[250px] w-[250px] rounded-full border-4 border-[#252525] object-cover drop-shadow"
                />
              </div>
              <div className="mb-8 ml-4 mt-3 grid h-full w-full grid-cols-2 md:ml-0">
                <div className="col-span-1 flex flex-col">
                  {personalInfo
                    .slice(0, 5)
                    .map((item: any, index: number) => {
                      const key: string = Object.keys(item)[0];
                      const value: string | string[] = item[key];

                      return (
                        <div
                          key={index}
                          className="flex flex-col py-2 md:flex-row"
                        >
                          <span className="text-[13px] text-gray-300 md:text-[16px]">{`${key}:`}</span>{" "}
                          <span className="text-[13px] font-medium capitalize text-white md:text-[15px]">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </span>
                        </div>
                      );
                    })}

                  <div className="mt-12 w-[90%] md:mt-12">
                    <Button
                      text="Download CV"
                      oNClick={downloadNow}
                      icon="ri:download-fill"
                    />
                  </div>
                </div>

                <div className="!-ml-10 flex flex-col">
                  {personalInfo
                    .slice(5)
                    .map((item: any, index: number) => {
                      const key: string = Object.keys(item)[0];
                      const value: string | string[] = item[key];

                      return (
                        <div
                          key={index}
                          className="flex flex-col flex-nowrap py-2 md:flex-row"
                        >
                          <span className="text-[13px] capitalize text-gray-300 md:text-[16px]">{`${key} :`}</span>{" "}
                          <span className="text-nowrap text-[13px] font-medium text-white md:text-[15px]">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              {experienceData.map((val, idx) => (
                <div
                  key={idx}
                  className="col-span-1 flex h-[120px] flex-col items-start justify-center rounded-sm border-2 border-[#252525] md:h-[160px]"
                >
                  <h1
                    className="ml-7 flex justify-start font-Open_Sans text-[35px] font-bold md:text-[40px] lg:text-[47px]"
                    style={{ color: selectedColor }}
                  >
                    {val.years}{" "}
                    <span className="block text-[30px] md:text-[33px] lg:text-[36px]">
                      +
                    </span>
                  </h1>
                  <div className="ml-8 flex items-center justify-center gap-3 px-0 leading-6 md:mb-0 md:ml-0 md:px-10">
                    <span className="hidden h-[2px] w-[60px] bg-gray-500 md:block"></span>{" "}
                    <h6 className="font-Open_Sans text-[13px] font-normal uppercase text-white md:text-[14px] lg:text-[15px]">
                      {val.exper}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="h- w-full bg-[#111111]">
          <div className="md:p-10">
            <h1 className="mb-10 text-center text-3xl font-bold text-[#ffffff]">
              Skills Progress
            </h1>
            <div className="grid grid-cols-2 gap-4 px-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {skills.map((skill, index) => (
                <SkillsProgressLoader
                  key={index}
                  percentage={skill.percentage}
                  skill={skill.skill}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Education & Experience */}
        <section className="bg-black py-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              EDUCATION & EXPERIENCE
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Education Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 lg:hidden">
                  Education
                </h2>
                <div className="relative">
                  <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800 z-0"></div>

                  {educations.map((edu, index) => (
                    <div
                      key={index}
                      className="relative mb-8 sm:mb-10 flex items-start"
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
                        <span className="inline-block rounded-full bg-[#212121] px-3 py-1 text-xs sm:text-sm text-gray-200 mb-3">
                          {edu.date}
                        </span>
                        <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed">
                          {edu.title}{" "}
                          <span className="text-gray-400 block sm:inline mt-1 sm:mt-0">
                            – {edu.institution}
                          </span>
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 lg:hidden">
                  Experience
                </h2>
                <div className="relative">
                  <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-800 z-0"></div>

                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="relative flex items-start mb-8 sm:mb-10"
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
                        <span className="inline-block rounded-full bg-[#212121] px-3 py-1 text-xs sm:text-sm text-gray-200 mb-3">
                          {exp.date}
                        </span>
                        <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed">
                          {exp.title}{" "}
                          <span className="text-gray-400 block sm:inline mt-1 sm:mt-0">
                            – {exp.company}
                          </span>
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
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
      </div>
    </>
  );
}