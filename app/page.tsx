import { Metadata } from "next";
import HeroSection from "@/app/home/page";

export const metadata: Metadata = {
  title: "Naveed Abbasi - MERN Stack Developer",
  description:
    "I'm Naveed Abbasi, a MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. I build modern, responsive, and scalable web applications using clean code and best practices.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Naveed Abbasi - MERN Stack Developer",
    description:
      "Explore the MERN Stack portfolio of Naveed Abbasi — building modern web applications using MongoDB, Express, React, and Node.js.",
    url: "https://naveedabbasi.vercel.app",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/Me.png", // 👈 public folder ka direct path
        width: 1200,
        height: 630,
        alt: "Naveed Abbasi Portfolio Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Abbasi - MERN Stack Developer",
    description:
      "MERN Stack Developer portfolio using MongoDB, Express.js, React.js, and Node.js with clean UI and responsive design.",
    images: ["https://naveedabbasi.vercel.app/assets/img/Me.png"],
  },
};

export default function Home() {
  return <HeroSection />;
}
