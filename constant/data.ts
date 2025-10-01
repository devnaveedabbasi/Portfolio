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
  { skill: "JavaScript", percentage: 75 },
  { skill: "TypeScript", percentage: 70 },
  { skill: "Firebase", percentage: 55 },
  { skill: "React.js", percentage: 85 },
  { skill: "Next.js", percentage: 60 },
  { skill: "Nodejs", percentage: 85 },
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
    date: "2025",
    title: "MERN Stack Developer",
    company: "Verior",
    description:
      "Completed a 2-month full-time, paid onsite internship as a MERN Stack Developer. Worked on real-world projects using React.js, Node.js, Express.js, and MongoDB.",
  },
  {
    date: "2024 - 2025",
    title: "Frontend Developer",
    company: "Digital Elliptical",
    description:
      "Completed a3-month full-time onsite role as a Frontend Developer, focusing on building responsive web applications with React.js, Tailwind CSS, and modern UI/UX practices.",
  },
  {
    date: "2024",
    title: "Frontend Developer",
    company: "YoungDevIntern",
    description:
      "Completed a 1-month remote internship as a Frontend Developer, working on static and interactive websites using HTML, CSS, and JavaScript.",
  },
];

export const educations: Education[] = [
  {
    date: "2025 - Present",
    title: "BS Software Engineering",
    institution: "Virtual University of Pakistan",
    description:
      "Pursuing my first year with a strong focus on core software engineering fundamentals.",
  },
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

import BgRemoveBanner from "@/public/assets/img/ProjectsImage/bg-remove.png";
import EcomBanner from "@/public/assets/img/ProjectsImage/ecom-banner.png";
import SoicalMediaBanner from "@/public/assets/img/ProjectsImage/soical-media.png";
import JobEvent from "@/public/assets/img/ProjectsImage/job&Event.png";
import Medium from "@/public/assets/img/ProjectsImage/medium.png";
import ITDeveloper from "@/public/assets/img/ProjectsImage/It-developer.png";
import Weather from "@/public/assets/img/ProjectsImage/weather.png";
import TicTacToe from "@/public/assets/img/ProjectsImage/tictactoe.png";
import CMS from "@/public/assets/img/ProjectsImage/cms.png";
import FigmaToHtmlBanner from "@/public/assets/img/ProjectsImage/Figma-to-Html.png";
import Gemini from "@/public/assets/img/ProjectsImage/gemini.png";
import ChatApp from "@/public/assets/img/ProjectsImage/chat-app.png";
import BookStore from "@/public/assets/img/ProjectsImage/BookStore.png";

export interface Portfolio {
  cardImage: string | StaticImageData;
  ProjectVedio: string;
  name: string;
  link: string;
  linkPreview: string;
  Technologies: string;
}

export const PortfolioData: Portfolio[] = [
  {
    cardImage: BookStore,
    ProjectVedio:
      "  https://drive.google.com/file/d/1eJrYklpdFvJKis7j--dzfXJRXChJOsSF/preview",
    name: "BookStore",
    link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-fullstackdeveloper-nodejs-activity-7363232307782021120-1HWU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsXc8QBqFRNJp6_tfcJoH2liTm-xvkthAc",
    linkPreview: "www.linkedin/bookstore.com",
    Technologies:
      "MongoDb,Reactjs,Nodejs,Expressjs,Socket.io,Redux,Tailwind CSS",
  },
  {
    cardImage: ChatApp,
    ProjectVedio:
      "https://drive.google.com/file/d/1Wlp7RuyCZk95q8ZachM7V7a6q7alqKzc/preview",
    name: "ChatApp",
    link: "https://www.linkedin.com/posts/naveed-abbasi_mernstack-frontend-backend-activity-7342513674307166208-vB_2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsXc8QBqFRNJp6_tfcJoH2liTm-xvkthAc",
    linkPreview: "www.linkedin/chatapp.com",
    Technologies:
      "MongoDb,Reactjs,Nodejs,Expressjs,Socket.io,zustand,Tailwind CSS",
  },
  {
    cardImage: Gemini,
    ProjectVedio:
      "https://drive.google.com/file/d/1-OVdz4or9SseK1Gi7dNIXhXJv1HEgtJZ/preview",
    name: "Gemini",
    link: "https://www.linkedin.com/posts/naveed-abbasi_nextjs-typescript-geminiapi-activity-7300613102188793856-9lnZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsXc8QBqFRNJp6_tfcJoH2liTm-xvkthAc",
    linkPreview: "www.linkedin/gemini.com",
    Technologies: "Nextjs,TypeScript & Tailwind CSS",
  },
  {
    cardImage: SoicalMediaBanner,
    ProjectVedio:
      "https://drive.google.com/file/d/17wwy2qWsm1ZgcKU6GSci_BsQ6qsIRett/preview",
    name: "Social Media App",
    link: "https://www.linkedin.com/posts/naveed-abbasi_just-finished-a-social-media-website-clone-activity-7296118246720573440-gwJw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsXc8QBqFRNJp6_tfcJoH2liTm-xvkthAc",
    linkPreview: "www.linkedin/social-media.com",
    Technologies: "React & Reducx-Toolkit Tailwind CSS",
  },
  {
    cardImage: EcomBanner,
    ProjectVedio:
      "https://drive.google.com/file/d/1r7-1U-PKkPp-r3T3zg_G9DQ9lQiV16OS/preview",
    name: "Ecommerce Web App",
    link: "https://www.linkedin.com/posts/naveed-abbasi_webdevelopment-reactjs-fullstack-activity-7292500402158108672-45Pj?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/ecommerce.com",
    Technologies: "React,ContextApi,TailwindCSS",
  },
  {
    cardImage: BgRemoveBanner,
    ProjectVedio:
      "https://drive.google.com/file/d/1kTia_WsfvDrN2Nrg4FMsRaNq6sIZciKf/preview", // Corrected video path
    name: "Bg-Remove",
    link: "https://www.linkedin.com/posts/naveed-abbasi_webdevelopment-tailwindcss-backgroundremoval-activity-7248614484779356160-SRIW?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/bg-remove.com",
    Technologies: "React & Tailwind CSS",
  },
  {
    cardImage: JobEvent,
    ProjectVedio:
      "https://drive.google.com/file/d/1tUp0dtJ30CQvVIsaIKtRX-07fQAX_lyg/preview",
    name: "Job&Event Manegment System",
    link: "https://www.linkedin.com/posts/naveed-abbasi_jobportal-eventmanagement-reactjs-activity-7241347404250140673-Hhau?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/job-event.com",
    Technologies: "React & firebase,CSS",
  },
  {
    cardImage: Medium,
    ProjectVedio:
      "https://drive.google.com/file/d/1cGkIj4xn5NF-23Bm2PjSU344TyECI48X/preview",
    name: "Medium Blog Website",
    link: "https://www.linkedin.com/posts/naveed-abbasi_jobportal-eventmanagement-reactjs-activity-7241347404250140673-Hhau?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/medium.com",
    Technologies: "React & TailwindCSS",
  },
  {
    cardImage: Weather,
    ProjectVedio:
      "https://drive.google.com/file/d/1WPx_Zu-typVdzu_FsoKQTPl6COYx0h1f/preview",
    name: "Weather App",
    link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-webdevelopment-weatherapp-activity-7235013460634333185-QnGR?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/weather.com",
    Technologies: "Reactjs,CSS",
  },
  {
    cardImage: ITDeveloper,
    ProjectVedio:
      "https://drive.google.com/file/d/15OnezBYMrvn28E6lth0kxTkkLJdIXT4F/preview",
    name: "IT Developers",
    link: "https://www.linkedin.com/posts/naveed-abbasi_frontenddeveloper-frontend-webdeveloper-activity-7192238968938119168--VYN?utm_source=share&utm_medium=member_desktop",
    linkPreview: "www.linkedin/it-developers.com",
    Technologies: "HTML,CSS,js,Gsap",
  },
  // {
  //   cardImage: CMS,
  //   ProjectVedio:
  //     "https://drive.google.com/file/d/1RPdhJ8-OIDlVWvclvT08DlFV0I-vcDM1/preview",
  //   name: "Complain Manegment System",
  //   link: "https://www.linkedin.com/posts/naveed-abbasi_frontenddeveloper-frontend-backend-activity-7190815187623407616-_uoK?utm_source=share&utm_medium=member_desktop",
  //   linkPreview: "www.linkedin/cms.com",
  //   Technologies: "HTML,CSS,JS,Firebase",
  // },
  // {
  //   cardImage: TicTacToe,
  //   ProjectVedio:
  //     "https://drive.google.com/file/d/1S_OqFSg5bMdYC4VluzgkTJs96sQ-jozO/preview",
  //   name: "TicTacToe Game",
  //   link: "https://www.linkedin.com/posts/naveed-abbasi_frontend-webdeveloper-developer-activity-7196224511984205824-bfqf?utm_source=share&utm_medium=member_desktop",
  //   linkPreview: "www.linkedin/tictactoe.com",
  //   Technologies: "Reactjs,CSS",
  // },
  // {
  //   cardImage: FigmaToHtmlBanner,
  //   ProjectVedio:
  //     "https://drive.google.com/file/d/18iNBdmPcQ5OtV1ELgc3htOKH9GSVml3o/preview",
  //   name: "Figma to Html",
  //   link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-css-webdevelopment-activity-7246069331892072449-afUw?utm_source=share&utm_medium=member_desktop",
  //   linkPreview: "www/linkedin/figma-form.com",
  //   Technologies: "Html,CSS",
  // },
];
