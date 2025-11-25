// components/ImageGallery.tsx - Your Design with Working Gallery
"use client";

import React, { useRef } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

// Import CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ImageGalleryProps {
  images: string[];
  projectName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, projectName }) => {
  const lightGalleryRef = useRef<any>(null);

  const onInit = (detail: any) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  };

  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  return (
    <div className="fade-in-up">
      <h3 className="mb-6 text-2xl font-bold" style={{ color: selectedColor }}>
        Project Gallery
      </h3>

      {/* LightGallery with your exact design */}
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen]}
        thumbnail={true}
        download={false}
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: false,
          rotate: false,
        }}
        elementClassNames="columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        {images.map((image, idx) => (
          <a
            key={idx}
            href={image}
            data-src={image}
            className="group relative mb-4 block cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
          >
            <img
              alt={`${projectName} gallery ${idx + 1}`}
              src={image}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Your Exact Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
              {/* Top Info Bar */}
              <div className="absolute left-0 right-0 top-0 -translate-y-full transform bg-black/60 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                <p className="truncate text-sm font-medium text-white">
                  {projectName}
                </p>
                <p className="text-xs text-gray-300">
                  Image {idx + 1} of {images.length}
                </p>
              </div>

              {/* Bottom Action Bar */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full transform bg-black/60 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 text-white">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.5,11.957c0,6.375-5.625,6.375-5.625,6.375H14.25v3.75h-4.5v-3.75H5.25c-3.75,0-5.625-3.375-5.625-6.375S2.5,5.582,5.25,5.582h13.5C21.375,5.582,23.5,8.207,23.5,11.957z" />
                    </svg>
                    <span className="text-xs font-medium">View Full Size</span>
                  </div>
                </div>
              </div>

              {/* Center View Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform rounded-2xl bg-white/20 p-4 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-500 group-hover:border-yellow-400/50 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]" />
          </a>
        ))}
      </LightGallery>

      <style jsx global>{`
        /* Ensure proper masonry layout */
        .lg-react-element {
          column-count: 1;
          column-gap: 1rem;
        }

        @media (min-width: 640px) {
          .lg-react-element {
            column-count: 2;
          }
        }

        @media (min-width: 1024px) {
          .lg-react-element {
            column-count: 3;
          }
        }

        /* Custom LightGallery styling */
        .lg-backdrop {
          background-color: rgba(0, 0, 0, 0.95);
        }

        .lg-toolbar .lg-icon {
          color: white;
        }

        .lg-sub-html {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
