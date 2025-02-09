"use client";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [loading, setLoading] = useState(false);
  const pathname = usePathname() || "";


  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader visible for 2 seconds

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
          <div className="layer layer-1" style={{ backgroundColor: selectedColor || "#111111" }}></div>
          <div className="layer layer-2" style={{backgroundColor:'#333333'}}></div>
          <div className="layer layer-3" style={{ backgroundColor: selectedColor || "#111111" }}></div>
          <div className="layer layer-4"  style={{backgroundColor:'#555555'}}></div>
          <div className="layer layer-5" style={{ backgroundColor: selectedColor || "#111111" }}></div>

        </div>
      )}
    </>
  );
}
