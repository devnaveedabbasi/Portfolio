"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ButtonProps {
  text: string;
  oNClick?: () => void;
  icon:string
}

const Button: React.FC<ButtonProps> = ({ text,icon, oNClick }) => {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  return (
    <button
      onClick={oNClick}
      className={`group relative flex items-center justify-between gap-2 overflow-hidden rounded-full border-2 bg-transparent font-semibold text-white transition-all duration-300`}
      style={{ borderColor: selectedColor }}
    >
      <span
        style={{ backgroundColor: selectedColor }}
        className="absolute -left-full top-0 h-full w-full rounded-full transition-transform duration-500 group-hover:translate-x-full"
      ></span>

      <span className="relative pl-6 p-3 font-medium font-Open_Sans text-nowrap">{text}</span>

      <div
        style={{ backgroundColor: selectedColor }}
        className="rounded-full !h-full flex justify-center items-start p-3 "
      >
        <Icon
          icon={icon}
          className="relative z-10 text-[25px]  text-white transition-colors duration-300 group-hover:text-white"
        />
      </div>
    </button>
  );
};

export default Button;
