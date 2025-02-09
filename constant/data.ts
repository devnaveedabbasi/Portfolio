interface MenuIcon {
  icon: string;
  name: string;
  link: string;
}

// Menu Icons Array
export const menuIcons: MenuIcon[] = [
  { icon: "solar:home-outline", name: "Home", link: "/" },
  { icon: "iconamoon:profile-duotone", name: "About Us", link: "/about" },
  { icon: "dashicons:portfolio", name: "Portfolio", link: "/portfolio" },
  { icon: "mdi:contact-outline", name: "Contact", link: "/contact-us" },
  { icon: "mdi:blog", name: "Blog", link: "/blog" },
];

import Purple from "@/public/assets/img/colors/purple.webp";
import blueviolet from "@/public/assets/img/colors/blueviolet.webp";
import Yellowgreen from "@/public/assets/img/colors/yellowgreen.webp";
import Goldenrod from "@/public/assets/img/colors/goldenrod.webp";
import Green from "@/public/assets/img/colors/green.webp";
import Orange from "@/public/assets/img/colors/orange.webp";
import Magenta from "@/public/assets/img/colors/magenta.webp";
import Red from "@/public/assets/img/colors/red.webp";
import Yellow from "@/public/assets/img/colors/yellow.webp";
import Blue from "@/public/assets/img/colors/blue.webp";
import { StaticImageData } from "next/image";

interface colorIcons {
  color: string;
  icon: StaticImageData;
  isColor: boolean;
}

export const colors: colorIcons[] = [
  { color: "#F1B317", icon: Yellow, isColor: true },
  { color: "#6957AF", icon: Purple, isColor: false },
  { color: "#4169E1", icon: Blue, isColor: false },
  { color: "#8A2BE2", icon: blueviolet, isColor: false },
  { color: "#E96091", icon: Magenta, isColor: false },
  { color: "#9ACD32", icon: Yellowgreen, isColor: false },
  { color: "#DAA520", icon: Goldenrod, isColor: false },
  { color: "#72B626", icon: Green, isColor: false },
  { color: "#E7592A", icon: Orange, isColor: false },
  { color: "#E62E2D", icon: Red, isColor: false },
];

// Skills
interface Skill {
  skill: string;
  percentage: number;
}
export const skills: Skill[] = [
  { skill: "HTML", percentage: 89 },
  { skill: "CSS", percentage: 70 },
  { skill: "JavaScript", percentage: 66 },
  { skill: "React", percentage: 95 },
  { skill: "Angular", percentage: 50 },
  { skill: "PHP", percentage: 65 },
  { skill: "WordPress", percentage: 45 },
  { skill: "jQuery", percentage: 60 },
];

interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
}

interface Education {
  date: string;
  title: string;
  institution: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    date: "2024 - 2025",
    title: "Frontend developer",
    company: "Digital Elliptical",
    description: " 3 months full-time onsite as a Frontend Developer (ReactJS)",
  },
  {
    date: "2024",
    title: "Frontend Developer",
    company: "YoungDev",
    description: "1 month remote as a Frontend Developer (HTML, CSS, JS).",
  },
];

export const educations: Education[] = [
  {
    date: "2023-2024",
    title: "Web & Mobile App Development",
    institution: "SMIT Hyderabad",
    description:
      "Completed a comprehensive course in web and mobile app development.",
  },
  {
    date: "2017-2021",
    title: "Memorization of Quran",
    institution: "Madrasa Tajweed-ul-Quran",
    description: "Successfully completed Hifz-e-Quran with a focus on Tajweed.",
  },
  {
    date: "2012-2022",
    title: "Matriculation",
    institution: "Himayat-ul-Islam High School",
    description: "Completed Matriculation with a strong academic foundation.",
  },
  {
    date: "2022-2024",
    title: "Intermediate",
    institution: "Hidayat-ullah College",
    description:
      "Pursuing Intermediate with a focus on core academic subjects.",
  },
];

import BlogPost1 from "@/public/assets/img/blogs/blog-post-1.jpg";
import BlogPost2 from "@/public/assets/img/blogs/blog-post-2.jpg";
import BlogPost3 from "@/public/assets/img/blogs/blog-post-3.jpg";

export interface Blogs {
  img: string | StaticImageData;
  title: string;
  dis: string;
  author?: string;
  tags?: string[];
  date?: string;
  content?: string; // Rich text content
}

export const blogData: Blogs[] = [
  {
    img: BlogPost1,
    title: "How to Own Your Audience by Creating an Email List",
    dis: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
    author: "John Doe",
    tags: ["AI", "Technology", "Finance"],
    date: "2025-02-06",
  },
  {
    img: BlogPost2,
    title: "Top 10 Toolkits for Deep Learning in 2020",
    dis: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
    author: "Jane Smith",
    tags: ["Blockchain", "Technology", "Security"],
    date: "2025-02-07",
  },
  {
    img: BlogPost3,
    title: "Everything You Need to Know About Web Accessibility",
    dis: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
    author: "Jane Smith",
    tags: ["Blockchain", "Technology", "Security"],
    date: "2025-02-07",
  },
];






import BgRemoveBanner from '@/public/assets/img/ProjectsImage/bg-remove.png';
import EcomBanner from '@/public/assets/img/ProjectsImage/ecom-banner.png';
import SoicalMediaBanner from '@/public/assets/img/ProjectsImage/soical-media.png';
import FigmaToHtmlBanner from '@/public/assets/img/ProjectsImage/Figma-to-Html.png';


export interface Portfolio {
  cardImage: string | StaticImageData;
  ProjectVedio: string;
  name: string;
  link: string;
  linkPreview:string,
  Technologies: string;
}

export const PortfolioData: Portfolio[] = [
  {
    cardImage: BgRemoveBanner,
    ProjectVedio: 'https://drive.google.com/file/d/1kTia_WsfvDrN2Nrg4FMsRaNq6sIZciKf/preview',  // Corrected video path
    name: 'Bg-Remove',
    link: 'https://bg-remove-murex.vercel.app/',
    linkPreview: 'www.bg-remove.com',  
    Technologies: 'React & Tailwind CSS',
  },
  {
    cardImage: SoicalMediaBanner,
    ProjectVedio: 'https://drive.google.com/file/d/1r7-1U-PKkPp-r3T3zg_G9DQ9lQiV16OS/preview',
    name: 'Social Media App',
    link: 'https://social-media-wine-eight.vercel.app/',
    linkPreview: 'www.social-media.com',
    Technologies: 'React & Tailwind CSS',
  },
  {
    cardImage: EcomBanner,
    ProjectVedio: 'https://drive.google.com/file/d/1r7-1U-PKkPp-r3T3zg_G9DQ9lQiV16OS/preview', 
    name: 'Ecommerce Web App',
    link: 'https://ecommercewebapp12.netlify.app/',
    linkPreview: 'www.social-media.com',
    Technologies: 'React,ContextApi,TailwindCSS',
  },
  {
    cardImage: FigmaToHtmlBanner,
    ProjectVedio: 'https://drive.google.com/file/d/18iNBdmPcQ5OtV1ELgc3htOKH9GSVml3o/preview', 
    name: 'Ecommerce Web App',
    link: 'https://ecommercewebapp12.netlify.app/',
    linkPreview: 'www.social-media.com',
    Technologies: 'React,ContextApi,TailwindCSS',
  },
];
