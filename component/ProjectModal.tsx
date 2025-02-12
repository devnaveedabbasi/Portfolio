"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    link: string;
    linkPreview: string; // Added this field
    ProjectVedio: string; // Adjusted for correct property
    Technologies: string;
  } | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  if (!isOpen || !project) return null;
  const handleOutsideClick = (): void => {
    const confirmClose = window.confirm(
      "Are you sure you want to close the modal?",
    );
    if (confirmClose) {
      onClose();
    }
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={handleOutsideClick}
    >
      <div
        className="relative w-[100%] max-w-sm rounded-lg bg-[#252525] p-6 text-white md:max-w-2xl"
        onClick={stopPropagation}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-[#ABABAB]"
        >
          <Icon icon="ic:sharp-close" width={20} height={20} />
        </button>

        {/* Modal Content */}
        <h2 className="mb-4 text-center font-Open_Sans text-[33px] font-bold text-[#ffb400]">
          {project.name}
        </h2>

        <div className="grid w-full grid-cols-1 justify-items-start gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Icon
              icon="octicon:project-roadmap-24"
              className="text-white"
              width={20}
            />
            <p className="flex flex-wrap gap-1 text-[14px] text-white">
              Project: <strong>{project.name}</strong>
            </p>
          </div>
          <div className="mr-10 flex items-center gap-2 ">
            <Icon icon="mdi:user-outline" className="text-white" width={20} />
            <p className="flex gap-1 text-[14px] text-white">
              Client: <strong>Practice</strong>
            </p>
          </div>
          <div className="flex items-start gap-2 md:items-start">
            <Icon icon="gridicons:code" className="text-white" width={20} />
            <p className="flex flex-wrap gap-1 text-[14px] text-white">
              Technologies:
              <strong className="flex gap-2">
                {project.Technologies.split(",")
                  .map((tech) => tech.trim())
                  .join(", ")}
              </strong>
            </p>
          </div>
          <div className="flex items-start gap-2 ">
            <Icon icon="quill:link-out" className="text-white" width={20} />
            <p className="flex flex-wrap gap-1 text-[14px] text-white">
              Details:
              <Link
                href={project.link}
                target="_blank"
                className="text-blue-400 underline"
              >
                {project.linkPreview}
              </Link>
            </p>
          </div>
        </div>

        {/* Video */}
        <div className="mt-4">
          <iframe
            src={project.ProjectVedio}
            allow="autoplay"
            className="h-[300px] w-full object-cover"
          ></iframe>
          {/* <video
            src='https://drive.google.com/file/d/1r7-1U-PKkPp-r3T3zg_G9DQ9lQiV16OS/view'
            controls
          ></video> */}
        </div>
      </div>
    </div>
  );
}
