"use client";
import Button from "@/component/button";
import Image from "next/image";
import React from "react";
import ProfileImage from "@/public/assets/img/Me.png";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { educations, experiences, skills } from "@/constant/data";
import SkillsProgressLoader from "@/component/skillsProgressLoader";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";

export default function Page() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const PersonalInfo: string = JSON.stringify([
    { firstName: "Naveed" },
    { lastName: "Abbasi" },
    { Age: "18 Years" },
    { Nationality: "Pakistan" },
    { Freelance: "Available" },
    { Address: "Sarfaraz Society Hyderabad" },
    { phone: "+92 311 1309060" },
    { Email: "naveedabbasi8651@gmail.com" },
    { languages: ["English", "Urdu"] },
  ]);

  // Define type for the parsed JSON data
  type PersonalInfoType = Record<string, string | string[]>;

  const parsedInfo: PersonalInfoType[] = JSON.parse(PersonalInfo);

  interface ExperinceDefineType {
    years: number;
    exper: string;
  }
  const ExperinceData: ExperinceDefineType[] = [
    { years: 1, exper: "Year of experience" },
    { years: 43, exper: "Completed  projects" },
    { years: 16, exper: "Happy customers" },
    { years: 13, exper: "Awards won" },
  ];
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

      <div className="h-full w-full bg-[#111111]">
        <div className="ml-5 hidden h-[210px] items-center justify-center md:flex">
          <HeaderText
            backHead="RESUME"
            frontHeadSimple="ABOUT"
            frontHeadColor="ME"
          />
        </div>

        {/* Mobile */}

        <section className="mb-5 mt-20 flex h-fit w-full items-center justify-center">
          <div className="!-ml-10 grid h-full w-[83%] grid-cols-1 lg:grid-cols-2">
            <div className="">
              <h1 className="ml-4 font-Poppins text-[26px] font-semibold uppercase leading-[31.2px] tracking-wide text-white md:ml-0">
                Persnol Infos{" "}
              </h1>
              <div className="flex w-full justify-center md:hidden">
                <Image
                  src={ProfileImage || DefaultImage}
                  width={740}
                  height={100}
                  priority
                  alt="Profile"
                  className="z-10 mt-2 h-[250px] w-[250px] rounded-full border-4 border-[#252525] object-cover drop-shadow"
                />
              </div>
              <div className="mb-8 ml-4 mt-3 grid h-full w-full grid-cols-2 md:ml-0">
                <div className="col-span-1 flex flex-col">
                  {parsedInfo
                    .slice(0, 5)
                    .map((item: PersonalInfoType, index: number) => {
                      const key: string = Object.keys(item)[0];
                      const value: string | string[] = item[key];

                      return (
                        <div
                          key={index}
                          className="flex flex-col py-2 md:flex-row"
                        >
                          <span className="text-[13px] text-gray-300 md:text-[16px]">{`${key} :`}</span>{" "}
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
                  {parsedInfo
                    .slice(5)
                    .map((item: PersonalInfoType, index: number) => {
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
              {ExperinceData.map((val, idx) => (
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
        <section className="h-full w-full">
          <div className="min-h-screen p-2 md:p-10">
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

        {/* Education */}

        <section>
          <div className="mx-auto w-[80%] px-5 py-10 text-white">
            <h1 className="mb-8 text-center text-[26px] font-bold leading-[31.2px]">
              EDUCATION & EXPERIENCE
            </h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                {educations.map((edu, index) => (
                  <div
                    key={index}
                    className="relative mb-6 flex h-fit items-start overflow-hidden"
                  >
                    <div className="relative top-1 mr-4 text-3xl">
                      <div
                        className="rounded-full p-2"
                        style={{ backgroundColor: selectedColor }}
                      >
                        <Icon
                          icon="tdesign:education-filled"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="absolute left-1/2 top-9 h-[120px] w-[1px] bg-gray-800 md:h-[80px]"></div>
                    </div>
                    <div className="mt-2">
                      <span className="rounded-full bg-[#212121] px-3 py-1 font-Poppins text-[12px] text-gray-200">
                        {edu.date}
                      </span>
                      <div className="mt-4">
                        <h2 className="mt-2 text-[18px] font-medium leading-[21.6px]">
                          {edu.title}{" "}
                          <span className="text-white opacity-[0.8]">
                            – {edu.institution}
                          </span>
                        </h2>
                        <p className="mt-1 font-Open_Sans text-[14px] font-medium leading-[22.4px] text-gray-300">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative mb-10 flex h-fit items-start overflow-hidden"
                  >
                    <div className="text-1xl relative top-1 mr-4">
                      <div
                        className="rounded-full p-2"
                        style={{ backgroundColor: selectedColor }}
                      >
                        <Icon
                          icon="hugeicons:permanent-job"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="absolute left-1/2 top-9 h-[120px] w-[1px] bg-gray-800 md:h-[80px]"></div>
                    </div>
                    <div className="mt-2">
                      <span className="mb-4 rounded-full bg-[#212121] px-2 py-2 font-Poppins text-[12px] text-gray-200">
                        {exp.date}
                      </span>
                      <div className="mt-4">
                        <h2 className="mt-2 text-[18px] font-medium leading-[21.6px]">
                          {exp.title}{" "}
                          <span className="text-white opacity-[0.8]">
                            – {exp.company}
                          </span>
                        </h2>
                        <p className="mt-1 font-Open_Sans text-[14px] font-medium leading-[22.4px] text-gray-300">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
