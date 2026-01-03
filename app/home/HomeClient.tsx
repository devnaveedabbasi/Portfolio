// app/HomeClient.tsx - CLIENT COMPONENT
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Setting from "@/component/partials/setting";
import Image from "next/image";
import Button from "@/component/button";
import Sidebar from "@/component/partials/sideBarNav";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

// Lazy load GSAP for performance
let gsap: any = null;

if (typeof window !== 'undefined') {
  import('gsap').then((module) => {
    gsap = module.gsap;
  });
}

export default function HomeClient() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [isMenuBarOpen, setIsMenuBarOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  // Refs for animation
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLHeadingElement>(null);
  const mobileSubtitleRef = useRef<HTMLHeadingElement>(null);
  const mobileTextRef = useRef<HTMLParagraphElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);

  const handleMenuToogle = (): void => {
    setIsMenuBarOpen((prevState) => !prevState);
  };

  const hanldeClose = (): void => setIsMenuBarOpen(false);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Desktop animations
  useEffect(() => {
    if (!isClient || !gsap) return;

    const initDesktopAnimations = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background animation
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { 
            x: -100,
            opacity: 0,
            scale: 0.8
          },
          { 
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { 
            scale: 0.5,
            opacity: 0,
            y: 50
          },
          { 
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            delay: -0.5
          },
          "-=0.8"
        );
      }

      // Text animations
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { 
            opacity: 0,
            y: 30,
            x: -20
          },
          { 
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8
          },
          "-=0.6"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { 
            opacity: 0,
            y: 20
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          "-=0.5"
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { 
            opacity: 0,
            y: 20
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          "-=0.4"
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { 
            opacity: 0,
            scale: 0.8,
            y: 20
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6
          },
          "-=0.3"
        );
      }
    };

    // Small delay for better UX
    const timeoutId = setTimeout(initDesktopAnimations, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  // Mobile animations
  useEffect(() => {
    if (!isClient || !gsap || window.innerWidth >= 1024) return;

    const initMobileAnimations = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger animations for mobile
      const mobileElements = [
        mobileImageRef.current,
        mobileTitleRef.current,
        mobileSubtitleRef.current,
        mobileTextRef.current,
        mobileButtonRef.current
      ].filter(Boolean);

      tl.fromTo(
        mobileElements,
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1
        }
      );

      // Add floating animation to profile image
      if (mobileImageRef.current) {
        gsap.to(mobileImageRef.current, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1
        });
      }
    };

    const timeoutId = setTimeout(initMobileAnimations, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  // Add scroll animations for desktop
  useEffect(() => {
    if (!isClient || !gsap || window.innerWidth < 1024) return;

    // Parallax effect for background
    const handleScroll = () => {
      if (bgRef.current && window.scrollY < 500) {
        const yPos = window.scrollY * 0.3;
        gsap.to(bgRef.current, {
          y: yPos,
          duration: 0.3,
          ease: "none"
        });
      }
    };

    // Floating animation for desktop image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });
    }

    // Text reveal animation on scroll
    const textElements = [titleRef.current, subtitleRef.current, textRef.current]
      .filter(Boolean);

    textElements.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { 
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            opacity: 0.8,
            scale: 0.98
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1
          }
        );
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);

  return (
    <>
      <div className="hidden h-screen w-full bg-[#111111] lg:flex">
        {/* Left Section */}
        <div className="relative z-10 h-full w-[42%]">
          {/* Background Styling */}
          <div
            ref={bgRef}
            className={`fixed -left-[14%] top-0 !h-[200%] w-[40%] -rotate-[15deg] transform overflow-hidden`}
            style={{ backgroundColor: selectedColor }}
          ></div>

          {/* Profile Image */}
          <div className="absolute !h-[100%] w-[100%] p-12">
            <div ref={imageRef} className="ml-4 h-full w-full rounded-2xl">
              <Image
                src="/assets/img/Me.webp"
                width={740}
                height={100}
                priority
                alt="Profile"
                fetchPriority="high"
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
              ref={titleRef}
              className="mb-2 flex items-center gap-3 font-PoppinsHeading text-[45px] font-bold uppercase leading-[62px]"
              style={{ color: selectedColor }}
            >
              <span
                className={`block h-[6px] w-[32px]`}
                style={{ backgroundColor: selectedColor }}
              ></span>{" "}
              I&apos;m Naveed Abbasi
            </h1>
            <h2 
              ref={subtitleRef}
              className="mb-4 ml-11 font-PoppinsHeading text-[43px] font-bold uppercase leading-[42px]"
            >
              FullStack Developer{" "}
            </h2>
            <p 
              ref={textRef}
              className="mt-6 text-[16px] font-medium leading-[32px] text-white"
            >
              I am a Full Stack Developer specializing in MERN (MongoDB,
              Express.js, React.js, Node.js). I build modern, responsive, and
              scalable web applications with a focus on both frontend and
              backend. Skilled in React, TypeScript, Tailwind CSS, and Node.js,
              I integrate REST APIs, authentication systems, and dynamic
              features to deliver fully functional, user-friendly websites. I
              turn Figma designs into clean, maintainable code that performs
              flawlessly across all devices. Let&apos;s collaborate to bring your
              ideas to life with smart, efficient solutions.
            </p>
            <div ref={buttonRef} className="mt-4">
              <Button
                text="More about Me"
                icon="mynaui:arrow-right-solid"
                oNClick={() => router.push("/about")}
              />
            </div>
          </div>
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
            <div ref={mobileImageRef}>
              <Image
                src="/assets/img/Me.webp"
                width={280}
                height={280}
                priority
                alt="Profile"
                fetchPriority="high"
                className="h-[280px] w-[280px] rounded-full border-4 border-[#252525] object-cover drop-shadow"
              />
            </div>
          </div>
          {/* Introduction */}
          <div className="mb-4 mt-4 flex w-[100%] flex-col">
            <h1
              ref={mobileTitleRef}
              className="font- mb-2 flex items-center gap-3 text-[38px] font-bold uppercase leading-[48px]"
              style={{ color: selectedColor }}
            >
              I&apos;m Naveed Abbasi
            </h1>
            <h2 
              ref={mobileSubtitleRef}
              className="fo mb-4 text-[38px] font-bold uppercase leading-[48px] text-white"
            >
              FullStack Developer
            </h2>
            <p 
              ref={mobileTextRef}
              className="text-[13px] font-medium leading-[30px] text-white"
            >
              I am a Full Stack Developer specializing in MERN (MongoDB,
              Express.js, React.js, Node.js). I build modern, responsive, and
              scalable web applications with a focus on both frontend and
              backend. Skilled in React, TypeScript, Tailwind CSS, and Node.js,
              I integrate REST APIs, authentication systems, and dynamic
              features to deliver fully functional, user-friendly websites. I
              turn Figma designs into clean, maintainable code that performs
              flawlessly across all devices. Let&apos;s collaborate to bring your
              ideas to life with smart, efficient solutions.
            </p>
            <div ref={mobileButtonRef} className="mt-6">
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