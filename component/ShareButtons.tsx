"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title,
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log("Error copying to clipboard:", err);
      }
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out this article: ${title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-400">
        Share this article:
      </span>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-gray-300 transition hover:bg-gray-700 hover:text-white"
        title="Share article"
      >
        <Icon icon="mdi:share" width={18} />
        <span className="text-sm">{copied ? "Copied!" : "Share"}</span>
      </button>

      <button
        onClick={shareOnTwitter}
        className="rounded-full p-2 text-gray-400 transition hover:bg-blue-500/20 hover:text-blue-400"
        title="Share on Twitter"
      >
        <Icon icon="mdi:twitter" width={20} />
      </button>

      <button
        onClick={shareOnLinkedIn}
        className="rounded-full p-2 text-gray-400 transition hover:bg-blue-700/20 hover:text-blue-600"
        title="Share on LinkedIn"
      >
        <Icon icon="mdi:linkedin" width={20} />
      </button>
    </div>
  );
}
