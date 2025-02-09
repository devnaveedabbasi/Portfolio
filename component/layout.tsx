"use client";

import React, { useState, useEffect } from "react";
import Navigations from "./partials/navigation/Navigations";
import Setting from "@/component/partials/setting";
import ChatBot from "@/component/partials/chatbot/page";
import Animation from "@/component/partials/animation";
import MobileNavigation from "@/component/partials/navigation/mobileNavigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <>
        <Animation />
        <MobileNavigation />
        <Setting />
        <main>{children}</main>

        <div className="hidden md:flex">
          <Navigations />
        </div>
        <ChatBot />
      </>
    </div>
  );
};

export default Layout;
