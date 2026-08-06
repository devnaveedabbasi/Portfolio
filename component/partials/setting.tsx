"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { colors } from "@/constant/data";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "@/store/slices/colorSlice";
import { RootState } from "@/store";

const Setting: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const selectedColor = useSelector((state: RootState) => state.color.selectedColor);

  const toggleSettingsMenu = (): void => {
    setIsSettingsOpen((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const handleColorChange = (color: string): void => {
    dispatch(setColor(color));
  };

  return (
    <>
      <div>
        <div className="fixed left-3 top-[85%] z-30 cursor-pointer rounded-lg bg-white p-3 text-black shadow-lg transition-transform duration-500">
          <Icon
            className={`text-black ${isSettingsOpen ? "rotate-0" : "animate-spin-slow"
              }`}
            icon="icon-park-solid:setting"
            width={24}
            height={24}
            onClick={toggleSettingsMenu}
          />
        </div>

        {/* Color Switcher Menu */}
        <div
          className={`fixed left-[-250px] top-[40%] z-50 h-[220px] w-[250px] rounded-lg bg-white shadow-md transition-all duration-500 ${isSettingsOpen ? "translate-x-[250px]" : "translate-x-0"
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
              <button
                onClick={() => handleColorChange(color.color)}
                key={color.color}
                className={`w-[30px] h-[30px] rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center ${selectedColor === color.color
                  ? "border-gray-900 scale-110 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
                  }`}
                style={{ backgroundColor: color.color }}
                title={color.color}
                aria-label={`Select color ${color.color}`}
              >
                {selectedColor === color.color && (
                  <Icon
                    icon="ic:baseline-check"
                    className={`text-[16px] font-bold ${["#F59E0B", "#84CC16", "#06B6D4"].includes(color.color)
                      ? "text-gray-900"
                      : "text-white"
                      }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
