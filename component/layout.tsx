"use client";

import React, { Suspense, lazy } from "react";
import Navigations from "./partials/navigations/navigations";
import Loading from "./partials/loading";
import { Toaster } from "react-hot-toast";

// Lazy load components
const LazyAnimation = lazy(() => import("@/component/partials/animation"));
const LazySetting = lazy(() => import("@/component/partials/setting"));
const LazyMobileNavigation = lazy(() => import("@/component/partials/navigations/mobileNavigation"));
// const LazyChatBot = lazy(() => import("@/component/partials/chatbot/page"));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto w-full relative">
      <Suspense fallback={<Loading />}>
        <LazyAnimation />
      </Suspense>

      <Suspense fallback={null}>
        <LazySetting />
      </Suspense>

      <Suspense fallback={null}>
        <LazyMobileNavigation navHeadFirst="Naveed" NavHeadSec="Abbasi" />
      </Suspense>

      <Toaster />
      <main>{children}</main>

      <div className="hidden md:flex">
        <Navigations />
      </div>

      {/* <Suspense fallback={null}>
        <LazyChatBot />
      </Suspense> */}
    </div>
  );
};

export default React.memo(Layout);
