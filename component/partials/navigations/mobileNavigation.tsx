"use client";
import React, { useState } from "react";
import Sidebar from "../sideBarNav";
import { Icon } from "@iconify/react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
interface Props{
  navHeadFirst:string,
  NavHeadSec:string
}
export default function MobileNavigation({ navHeadFirst, NavHeadSec }: Props) {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [isMenuBarOpen, setIsMenuBarOpen] = useState<boolean>(false);

  const handleMenuToogle = (): void => {
    setIsMenuBarOpen((prevState) => !prevState);
  };

  const hanldeClose = (): void => setIsMenuBarOpen(false);
  return (
    <div>
      <div className="fixed left-0 top-0 z-40 flex h-[50px] w-full items-center justify-between bg-[#252525] p-8 md:hidden">
        <h1 className="font-Open_Sans text-[35px] font-bold uppercase text-white">
          {navHeadFirst} <span  style={{color:selectedColor}}>{NavHeadSec}</span>
        </h1>
        <div className="rounded-md bg-[#252525]">
          <Icon
            icon="jam:menu"
            className="text-[50px] text-white"
            onClick={handleMenuToogle}
          />
        </div>
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
    </div>
  );
}
