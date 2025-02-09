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


'use client';
import React, { useState } from 'react';
import HeaderText from '@/component/headerText';

import Image from 'next/image';
import ProjectModal from '@/component/ProjectModal';
import DefaultImage from '@/public/assets/img/defult.jpeg'
import { Portfolio, PortfolioData } from '@/constant/data';

export default function Page() {
 
  

  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Portfolio) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };


  const closeModal = () => {
  
      setSelectedProject(null);
      setIsModalOpen(false);
  
  };

  return (
    <>
      <div>
        <HeaderText backHead='Work' frontHeadSimple='My' frontHeadColor='Portfolio' />
      </div>

      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {PortfolioData.map((data, idx) => (
          <div
            key={idx}
            className="relative h-[200px] group cursor-pointer overflow-hidden rounded-md"
            onClick={() => openModal(data)}
          >
            <Image
              src={data.cardImage || DefaultImage}
              alt={data.name}
              width={400}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {data.name}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
    </>
  );
}
