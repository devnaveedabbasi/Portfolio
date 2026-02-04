import { Metadata } from "next";
import HeroSection from "@/app/home/page";

export const metadata: Metadata = {
  title: "Naveed Abbasi - Full Stack Developer | MERN Stack Expert",
  description: "Full Stack Developer specializing in MERN stack development. I craft high-performance web applications with MongoDB, Express.js, React.js, and Node.js. Passionate about clean code, modern UI/UX, and scalable solutions.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Naveed Abbasi - Full Stack Developer | MERN Stack Expert",
    description: "Experienced Full Stack Developer from Kotri, Sindh. Building cutting-edge web applications with MERN stack, Next.js, and TypeScript. Transforming ideas into responsive, scalable digital experiences.",
    url: "https://naveedabbasi.vercel.app",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/Me.png",
        width: 1200,
        height: 630,
        alt: "Naveed Abbasi - Full Stack Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Abbasi - Full Stack Developer",
    description: "MERN Stack Developer crafting modern, responsive web applications. Expertise in MongoDB, Express, React, Node.js, Next.js & TypeScript. Let's build something amazing together!",
    images: ["https://naveedabbasi.vercel.app/assets/img/Me.png"],
  },
  keywords: [
    "Naveed Abbasi",
    "Full Stack Developer",
    "MERN Stack Developer",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "JavaScript Developer",
    "Hyderabad Developer",
    "Pakistan Developer",
  ],
};

export default function Home() {
  return <HeroSection />;
}