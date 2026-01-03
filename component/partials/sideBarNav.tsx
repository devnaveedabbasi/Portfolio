"use client";

import React from "react";
import SimpleBar from "simplebar-react";
import { Icon } from "@iconify/react";
import { menuIcons } from "@/constant/data";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();
  
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  return (
    <div>
      <div
        className={`fixed right-0 top-0 z-50 h-fit w-[100%] transform overflow-y-auto bg-[#252525] shadow-lg outline-none transition-transform duration-300 md:w-[50%] lg:w-[25%] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SimpleBar onClick={closeSidebar} style={{ maxHeight: "100%" }}>
          <div className="flex w-[100%] items-center justify-end py-4">
        <button
  onClick={closeSidebar}
  className="mr-6 cursor-pointer text-[30px] text-white"
  aria-label="Close sidebar"
>
  <Icon
    icon="akar-icons:cross"
    className="text-1xl cursor-pointer"
  />
</button>

          </div>

          {menuIcons.map((menu, idx) => (
           <Link
           href={menu.link}
           key={idx}
           className="group relative mb-5 flex cursor-pointer items-center gap-4 px-3 py-3 pb-2 text-start md:w-[80%] lg:w-full"
         >
           <div
             className="rounded-full p-3 transition-all duration-300"
             style={{
               backgroundColor: pathname === menu.link ? selectedColor : "#212529",
             }}
           >
             <Icon
               icon={menu.icon}
               className="font-Poppins text-[21px] font-medium leading-[41.6px] text-white"
             />
           </div>
         
           <h4
             className="relative z-10 font-Poppins text-[21px] font-medium leading-[41.6px] text-white duration-300"
             style={{
               color: pathname === menu.link ? selectedColor : "white",
             }}
           >
             {menu.name}
           </h4>
         
           {/* Hover Effect for Underline */}
           <span
             className="absolute bottom-0 left-0 h-[3px] w-[13%] transition-all duration-700 group-hover:w-full"
             style={{
               backgroundColor: selectedColor,
             }}
           ></span>
         
           {/* Hover Effect Using an Overlay */}
           {/* <div
             className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
             style={{
               backgroundColor: selectedColor,
               zIndex: -1,
             }}
           ></div> */}
         </Link>
         
          ))}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* <div key={idx} className="flex items-center hover:bg-[#3d3b3b] border-[#3d3b3b] transition-all duration-700 cursor-pointer group border-b text-white gap-2 p-4">
<Icon icon={menu.icon} className="font-Poppins text-[21px] leading-[41.6px] font-medium group-hover:text-[#ffb400]" />
<h4 className="font-Poppins text-[21px] leading-[41.6px] font-medium   group-hover:text-[#ffb400]">
  {menu.name}
</h4>
</div> */
}
