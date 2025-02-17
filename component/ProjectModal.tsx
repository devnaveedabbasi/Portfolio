'use client';
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState, useCallback, memo } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    link: string;
    linkPreview: string;
    ProjectVedio: string;
    Technologies: string;
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);

  const handleOutsideClick = useCallback(() => {
    if (window.confirm("Are you sure you want to close the modal?")) {
      onClose();
    }
  }, [onClose]);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={handleOutsideClick}
    >
      <div
        className="relative w-[100%] max-w-sm rounded-lg bg-[#252525] p-6 text-white md:max-w-2xl"
        onClick={stopPropagation}
      >
        <button onClick={onClose} className="absolute right-3 top-3 text-[#ABABAB]">
          <Icon icon="ic:sharp-close" width={20} height={20} />
        </button>

        <h2 className="mb-4 text-center font-Open_Sans text-[33px] font-bold text-[#ffb400]">
          {project.name}
        </h2>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Other project details remain the same */}
          <div className="flex items-center gap-2">
            <Icon icon="octicon:project-roadmap-24" className="text-white" width={20} />
            <p className="text-[14px] text-white">Project: <strong>{project.name}</strong></p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:user-outline" className="text-white" width={20} />
            <p className="text-[14px] text-white">Client: <strong>Practice</strong></p>
          </div>
          <div className="flex items-start gap-2">
            <Icon icon="gridicons:code" className="text-white" width={20} />
            <p className="text-[14px] text-white">
              Technologies: <strong>{project.Technologies.split(",").map(tech => tech.trim()).join(", ")}</strong>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Icon icon="quill:link-out" className="text-white" width={20} />
            <p className="text-[14px] text-white">
              Details: <Link href={project.link} target="_blank" className="text-blue-400 underline">{project.linkPreview}</Link>
            </p>
          </div>
        </div>

        {/* Video or Play Button */}
        <div className="mt-4 relative">
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="loader"></span>
                </div>
              )}
              <iframe
                key={project.ProjectVedio}
                src={project.ProjectVedio}
                allow="autoplay"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                className="h-[300px] w-full object-cover"
              ></iframe>
            </>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectModal);
