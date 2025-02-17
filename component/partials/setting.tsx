"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { colors } from "@/constant/data";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setColor } from "@/store/slices/colorSlice";
import DefaultImage from '@/public/assets/img/defult.jpeg'

const Setting: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const toggleSettingsMenu = (): void => {
    setIsSettingsOpen((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const handleColorChange =(color: string) :void=> {
    dispatch(setColor(color)); 
  };

  return (
    <>
      <div>
        <div className="fixed left-3 top-[45%] z-30 cursor-pointer rounded-lg bg-white p-3 text-black shadow-lg transition-transform duration-500">
          <Icon
            className={`text-black ${
              isSettingsOpen ? "rotate-0" : "animate-spin-slow"
            }`}
            icon="icon-park-solid:setting"
            width={24}
            height={24}
            onClick={toggleSettingsMenu}
          />
        </div>

        {/* Color Switcher Menu */}
        <div
          className={`fixed left-[-250px] top-[40%] z-50 h-[200px] w-[250px] rounded-lg bg-white shadow-md transition-all duration-500 ${
            isSettingsOpen ? "translate-x-[250px]" : "translate-x-0"
          }`}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between gap-4 border-b-2 p-4">
            <h4 className="font-Open_Sans text-[16px] font-semibold text-[#333333]">
              COLOR SWITCHER
            </h4>
            <Icon
              icon="ic:baseline-close"
              className="cursor-pointer text-[24px] text-gray-500"
              onClick={toggleSettingsMenu}
            />
          </div>

          {/* Color Options */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-4">
            {colors.map((color) => (
              <div
              onClick={() => handleColorChange(color.color)}
               key={color.color}>
                <Image
                  src={color.icon || DefaultImage}
                  alt={color.color}
                  width={2000}
                  height={2000}
                  priority
                  className="w-[30px] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
