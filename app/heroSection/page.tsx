"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Setting from "@/component/partials/setting";
import Image from "next/image";
// import ProfileImage from "@/public/assets/img/profile.jpg";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import ProfileImage from "@/public/assets/img/Me.png";
import Button from "@/component/button";
import Sidebar from "@/component/partials/sideBarNav";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
export default function Page() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [isMenuBarOpen, setIsMenuBarOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleMenuToogle = (): void => {
    setIsMenuBarOpen((prevState) => !prevState);
  };

  const hanldeClose = (): void => setIsMenuBarOpen(false);
  return (
    <>
      <div className="hidden h-screen w-full bg-[#111111] lg:flex">
        {/* Left Section */}
        <div className="relative z-10 h-full w-[42%]">
          {/* Background Styling */}
          <div
            className={`fixed -left-[14%] top-0 !h-[200%] w-[40%] -rotate-[15deg] transform overflow-hidden`}
            style={{ backgroundColor: selectedColor }}
          ></div>

          {/* Profile Image */}
          <div className="absolute !h-[100%] w-[100%] p-12">
            <div className="ml-4 h-full w-full rounded-2xl">
              <Image
                src={ProfileImage || DefaultImage}
                width={740}
                height={100}
                priority
                alt="Profile"
                className="h-full w-full rounded-2xl object-cover drop-shadow"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-[68%] items-center justify-center gap-4 px-12 text-white">
          {/* Introduction */}
          <div className="mb-8 w-[90%]">
            <h1
              className="mb-2 flex items-center gap-3 font-PoppinsHeading text-[45px] font-bold uppercase leading-[62px]"
              style={{ color: selectedColor }}
            >
              <span
                className={`block h-[6px] w-[32px]`}
                style={{ backgroundColor: selectedColor }}
              ></span>{" "}
              I&apos;m Naveed Abbasi
            </h1>
            <h2 className="mb-4 ml-11 font-PoppinsHeading text-[43px] font-bold uppercase leading-[42px]">
              FullStack Developer{" "}
            </h2>
            <p className="mt-6 text-[16px] font-medium leading-[32px] text-white">
              I am a Full Stack Developer specializing in MERN (MongoDB,
              Express.js, React.js, Node.js). I build modern, responsive, and
              scalable web applications with a focus on both frontend and
              backend. Skilled in React, TypeScript, Tailwind CSS, and Node.js,
              I integrate REST APIs, authentication systems, and dynamic
              features to deliver fully functional, user-friendly websites. I
              turn Figma designs into clean, maintainable code that performs
              flawlessly across all devices. Let’s collaborate to bring your
              ideas to life with smart, efficient solutions.
            </p>
            <div className="mt-4">
              <Button
                text="More about Me"
                icon="mynaui:arrow-right-solid"
                oNClick={() => router.push("/about")}
              />
            </div>
          </div>

          {/* <Navigations /> */}
        </div>
      </div>

      {/* Mobile Section */}
      <div className="mb-10 flex h-fit w-full flex-col items-center justify-center gap-2 bg-[#111111] lg:hidden">
        <div className="absolute right-4 top-4 rounded-md bg-[#252525]">
          <Icon
            icon="jam:menu"
            className="text-[50px] text-white"
            onClick={handleMenuToogle}
          />
        </div>
        <>
          {isMenuBarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
              onClick={hanldeClose}
            ></div>
          )}

          {/* Sidebar */}
          <Sidebar isOpen={isMenuBarOpen} closeSidebar={hanldeClose} />
        </>
        <div className="mx-auto mb-4 mt-10 h-full w-[80%]">
          {/* Profile */}
          <Setting />
          <div className="mt-10 flex w-full justify-center">
            <Image
              src={ProfileImage || DefaultImage}
              width={740}
              height={100}
              priority
              alt="Profile"
              className="h-[280px] w-[280px] rounded-full border-4 border-[#252525] object-cover drop-shadow"
            />
          </div>
          {/* Introduction */}
          <div className="mb-4 mt-4 flex w-[100%] flex-col">
            <h1
              className="font- mb-2 flex items-center gap-3 text-[38px] font-bold uppercase leading-[48px]"
              style={{ color: selectedColor }}
            >
              I&apos;m Naveed Abbasi
            </h1>
            <h2 className="fo mb-4 text-[38px] font-bold uppercase leading-[48px] text-white">
              FullStack Developer
            </h2>
            <p className="text-[13px] font-medium leading-[30px] text-white">
              I am a Full Stack Developer specializing in MERN (MongoDB,
              Express.js, React.js, Node.js). I build modern, responsive, and
              scalable web applications with a focus on both frontend and
              backend. Skilled in React, TypeScript, Tailwind CSS, and Node.js,
              I integrate REST APIs, authentication systems, and dynamic
              features to deliver fully functional, user-friendly websites. I
              turn Figma designs into clean, maintainable code that performs
              flawlessly across all devices. Let’s collaborate to bring your
              ideas to life with smart, efficient solutions.
            </p>
            <div className="mt-6">
              <Button
                text="More about Me"
                icon="mynaui:arrow-right-solid"
                oNClick={() => router.push("/about")}
              />
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
