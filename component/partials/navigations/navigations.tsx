"use client";

import { menuIcons } from "@/constant/data";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Navigations() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor
  );
  const pathname = usePathname() || "";

  // Memoize navigation items so they don't re-render unnecessarily
  const navigationItems = useMemo(() => {
    return menuIcons.map((menu, idx) => (
      <Link
        key={idx}
        href={menu.link}
        style={{
          backgroundColor: pathname === menu.link ? selectedColor : "#212529",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.currentTarget.style.backgroundColor = selectedColor;
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.currentTarget.style.backgroundColor =
            pathname === menu.link ? selectedColor : "#212529";
        }}
        className="group relative flex h-[50px] w-[50px] cursor-pointer items-center justify-between gap-4 rounded-full px-3 text-white transition-all duration-500 hover:w-[140px]"
      >
        <span className="translate-x-[-20px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          {menu.name}
        </span>
        <Icon
          icon={menu.icon}
          className="absolute right-3 top-3 text-[27px]"
        />
      </Link>
    ));
  }, [pathname, selectedColor]);

  return (
    <div className="!fixed right-4 top-32 z-50 flex w-[20%] flex-col items-end gap-4">
      {navigationItems}
    </div>
  );
}
