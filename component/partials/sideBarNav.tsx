"use client";

import React from "react";
import SimpleBar from "simplebar-react";
import { Icon } from "@iconify/react";
import { menuIcons } from "@/constant/data";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
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
            >
              <Icon
                icon="akar-icons:cross"
                className="text-1xl cursor-pointer"
              />
            </button>
          </div>

          {menuIcons.map((menu, idx) => (
            <div
              key={idx}
              className="group relative mb-5 flex cursor-pointer items-center gap-4 px-3 py-3 pb-2 text-start md:w-[80%] lg:w-full"
            >
              <div className="rounded-full p-3 transition-all duration-300 group-hover:bg-[#ffb400]">
                <Icon
                  icon={menu.icon}
                  className="font-Poppins text-[21px] font-medium leading-[41.6px] text-white group-hover:text-white"
                />
              </div>
              <h4 className="relative z-10 font-Poppins text-[21px] font-medium leading-[41.6px] text-white duration-300 group-hover:text-[#ffb400]">
                {menu.name}
              </h4>

              <span className="bg-primary absolute bottom-0 left-0 h-[3px] w-[13%] transition-all duration-700 group-hover:w-full"></span>
            </div>
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
