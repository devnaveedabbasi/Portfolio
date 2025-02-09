"use client";
import Button from "@/component/button";
import HeaderText from "@/component/headerText";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";

const ContactUs: React.FC = () => {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  interface Icons {
    icon: string;
  }

  const SocialIcons: Icons[] = [
    { icon: "ri:facebook-fill" },
    { icon: "mdi:whatsapp" },
    { icon: "ri:instagram-line" },
    { icon: "ri:linkedin-fill" },
  ];

  return (
    <div className="bg-[#111111]">
   
   <HeaderText backHead='Contact' frontHeadSimple='Get In' frontHeadColor='Touch' />

      <div className="flex w-full justify-center">
        <div className="mt-8 flex h-full w-[86%] flex-col items-center justify-center gap-4 text-white md:flex-row">
          <div className="space-y-4 md:w-[35%] w-full">
            <h1 className="font-Poppins text-3xl font-bold">DON&apos;T BE SHY!</h1>
            <p className="font-Open_Sans text-[15px] text-white">
              Feel free to get in touch with me. I am always open to discussing
              new projects, creative ideas, or opportunities to be part of your
              visions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:contact"
                  color={selectedColor}
                  width={40}
                  height={40}
                />
                <span className="font-Open_Sans text-[15px] font-medium">
                  naveedabbasi8651@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="material-symbols:mail-sharp"
                  color={selectedColor}
                  width={40}
                  height={40}
                />
                <span className="font-Open_Sans text-[15px] font-medium">
                  +92 311 1309060
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              {SocialIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer rounded-full bg-[#252525] p-2 transition duration-200"
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.backgroundColor = selectedColor;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.backgroundColor = "#252525";
                  }}
                >
                  <Icon icon={icon.icon} className="text-2xl text-white" />
                </div>
              ))}
            </div>
          </div>

          <form className="mt-8 space-y-4 md:mt-0 md:w-[60%] w-full">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-full bg-[#252525] p-3 text-gray-300 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-full bg-[#252525] p-3 text-gray-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Your Subject"
                className="w-full rounded-full bg-[#252525] p-3 text-gray-300 focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Your Message"
              className="h-40 w-full rounded-2xl bg-[#252525] p-3 text-gray-300 focus:outline-none"
            ></textarea>

            <Button text="Send Message" icon="lucide:send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
