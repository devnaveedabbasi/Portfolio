// 'use client'
// import HeaderText from '@/component/headerText';
// import React, { useState, useRef } from 'react';
// import project1 from '@/public/assets/img/ProjectsImage/bg-remove.png';
// import project2 from '@/public/assets/img/ProjectsImage/soical-media.png';
// import Image, { StaticImageData } from 'next/image';

// export default function Page() {
//   interface Portfolio {
//     cardImage: string | StaticImageData;
//     name: string;
//     link: string;
//   }

//   const PortfolioData: Portfolio[] = [
//     { cardImage: project1, name: 'Bg-Remove', link: 'https://bg-remove-murex.vercel.app/' },
//     { cardImage: project2, name: 'Social-Media', link: 'https://social-media-wine-eight.vercel.app/' },
//     { cardImage: project2, name: 'Social-Media', link: 'https://social-media-wine-eight.vercel.app/' },
//     { cardImage: project2, name: 'Social-Media', link: 'https://social-media-wine-eight.vercel.app/' },
//   ];

//   const gridRef = useRef<HTMLDivElement>(null);
//   const [overlayInfo, setOverlayInfo] = useState({
//     top: 0,
//     left: 0,
//     width: 0,
//     height: 0,
//     opacity: 0,
//     name: '',
//   });

//   const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
//     const target = e.currentTarget;
//     const rect = target.getBoundingClientRect();

//     if (gridRef.current) {
//       const gridRect = gridRef.current.getBoundingClientRect();

//       setOverlayInfo({
//         top: rect.top - gridRect.top,
//         left: rect.left - gridRect.left,
//         width: rect.width,
//         height: rect.height,
//         opacity: 1,
//         name: name,
//       });
//     }
//   };

//   const handleMouseLeave = () => {
//     setOverlayInfo((prev) => ({
//       ...prev,
//       opacity: 0,
//     }));
//   };

//   return (
//     <>
//       <div>
//         <HeaderText backHead='Work' frontHeadSimple='My' frontHeadColor='Portfolio' />
//       </div>

//       <div ref={gridRef} className='relative w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
//         {/* Single Overlay Div */}
//         <div
//           className='absolute bg-green-500 flex items-center justify-center text-white text-lg font-bold transition-all duration-700 ease-out pointer-events-none rounded-md overflow-hidden'
//           style={{
//             top: overlayInfo.top,
//             left: overlayInfo.left,
//             width: overlayInfo.width,
//             height: overlayInfo.height,
//             opacity: overlayInfo.opacity,
//             transform: overlayInfo.opacity ? 'translateY(0)' : 'translateY(20%)',
//           }}
//         >
//           {overlayInfo.name}
//         </div>

//         {/* Portfolio Cards */}
//         {PortfolioData.map((data, idx) => (
//           <div
//             key={idx}
//             className='relative group cursor-pointer overflow-hidden rounded-md'
//             onMouseEnter={(e) => handleMouseEnter(e, data.name)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Image
//               src={data.cardImage}
//               alt={data.name}
//               width={750}
//               height={950}
//               className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out'
//             />

//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

"use client";
import React, { useState, useCallback, lazy, Suspense } from "react";
import HeaderText from "@/component/headerText";
import Image from "next/image";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import { Portfolio, PortfolioData } from "@/constant/data";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";

const LazyProjectModal = lazy(() => import("@/component/ProjectModal"));

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize the openModal and closeModal functions to prevent unnecessary re-renders
  const openModal = useCallback((project: Portfolio) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <MobileNavigation navHeadFirst="My" NavHeadSec="Works" />

      <div>
        <HeaderText
          backHead="MyWorks"
          frontHeadSimple="My"
          frontHeadColor="Portfolio"
        />
      </div>

      <div className="mx-auto grid w-[80%] grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {PortfolioData.map((data, idx) => (
          <div
            key={idx} // Use a unique ID if available, otherwise fallback to idx
            className="group relative h-[200px] cursor-pointer overflow-hidden rounded-md"
            onClick={() => openModal(data)}
          >
            <Image
              src={data.cardImage || DefaultImage}
              alt={data.name}
              width={400}
              height={300}
              priority={idx < 3} // Prioritize above-the-fold images
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-70 text-lg font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {data.name}
            </div>
          </div>
        ))}
      </div>

      {/* Lazy-loaded Modal Component with Suspense fallback */}
      {isModalOpen && (
        <Suspense fallback={<div>Loading Modal...</div>}>
          <LazyProjectModal
            isOpen={isModalOpen}
            onClose={closeModal}
            project={selectedProject}
          />
        </Suspense>
      )}
    </>
  );
}
