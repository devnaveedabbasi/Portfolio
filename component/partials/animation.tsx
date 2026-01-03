

"use client";

import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor
  );

  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    // ❌ Skip loader on initial page load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // ✅ Show loader only on route change
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // shorter = smoother UX

    return () => clearTimeout(timer);
  }, [pathname]);

  const loaderContent = useMemo(
    () => (
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        <div
          className="layer layer-1"
          style={{ backgroundColor: selectedColor || "#111111" }}
        />
        <div className="layer layer-2" style={{ backgroundColor: "#333333" }} />
        <div className="layer layer-3" style={{ backgroundColor: "#555555" }} />
        <div className="layer layer-4" style={{ backgroundColor: "#777777" }} />
        <div className="layer layer-5" style={{ backgroundColor: "#999999" }} />
      </div>
    ),
    [selectedColor]
  );

  return loading ? loaderContent : null;
}


// "use client";
// import { RootState } from "@/store";
// import { usePathname } from "next/navigation";
// import { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";

// export default function Loader() {
//   const selectedColor = useSelector(
//     (state: RootState) => state.color.selectedColor
//   );
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname() || "";

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Loader visible for 2 seconds
//     return () => clearTimeout(timer);
//   }, [pathname]);

//   const loaderContent = useMemo(
//     () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
//   <div className="layer layer-1" style={{ backgroundColor: selectedColor || "#111111" }} />
//   <div className="layer layer-2" style={{ backgroundColor: "#333333" }} />
//   <div className="layer layer-3" style={{ backgroundColor: "#555555" }} />
//   <div className="layer layer-4" style={{ backgroundColor: "#777777" }} />
//   <div className="layer layer-5" style={{ backgroundColor: "#999999" }} />
// </div>

//     ),
//     [selectedColor]
//   );

//   return <>{loading && loaderContent}</>;
// }
