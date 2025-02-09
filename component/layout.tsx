"use client";

import React, { useState, useEffect } from "react";
import Navigations from "./partials/navigations/navigations";
import Setting from "@/component/partials/setting";
import ChatBot from "@/component/partials/chatbot/page";
import Animation from "@/component/partials/animation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <>
        <Animation />
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
