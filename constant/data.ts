interface MenuIcon {
  icon: string;
  name: string;
  link: string;
}

// Menu Icons Array
export const menuIcons: MenuIcon[] = [
  { icon: "solar:home-outline", name: "Home", link: "/" },
  { icon: "iconamoon:profile-duotone", name: "About Us", link: "/about" },
  { icon: "dashicons:portfolio", name: "Projects", link: "/projects" },
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
  { skill: "Firebase", percentage: 75 },
  { skill: "React.js", percentage: 85 },
  { skill: "Next.js", percentage: 80 },
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
    date: "2025 - Present",
    title: "Full Stack Developer (Freelance)",
    company: "Linkdin",
    description:
      "Freelance MERN Stack developer handling frontend and backend to deliver complete web applications for various client requirements.", // 23 words
  },
  {
    date: "2025",
    title: "Full Stack Developer",
    company: "Verior",
    description:
      "Developed full-stack projects using Node.js, React.js, Next.js with backend APIs, REST/FastAPI integration, Figma to Next.js conversion, Firebase, and client collaboration.", // 24 words
  },
  {
    date: "2024 - 2025",
    title: "React Developer",
    company: "Digital Elliptical",
    description:
      "Three-month onsite React Developer focusing on responsive web applications using React.js, Tailwind CSS, and modern UI/UX design practices.", // 22 words
  },
  {
    date: "2024",
    title: "Frontend Developer",
    company: "YoungDevIntern",
    description:
      "One-month remote internship as Frontend Developer working on static and interactive websites using HTML, CSS, and JavaScript technologies.", // 21 words
  },
];

export const educations: Education[] = [
  {
    date: "2025 - Present",
    title: "BS Software Engineering",
    institution: "Virtual University of Pakistan",
    description:
      "Pursuing first year with strong focus on core software engineering fundamentals and programming principles currently.", // 20 words
  },
  {
    date: "2023-2024",
    title: "Web & Mobile App Development",
    institution: "SMIT Hyderabad",
    description:
      "Completed comprehensive course in web and mobile app development covering various programming technologies and frameworks.", // 21 words
  },
  {
    date: "2017-2021",
    title: "Memorization of Quran",
    institution: "Madrasa Tajweed-ul-Quran",
    description: "Successfully completed Hifz-e-Quran with dedicated focus on Tajweed rules and proper recitation techniques.", // 20 words
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
  content?: string;
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
  shortDescription?: string;
  description?: string;
  Technologies: string;
  projectType: "Frontend" | "FullStack";
  liveUrl?: string;
  clientName?: string;
  timeline: string;
  features: string[];
  challenges: string[];
  galleryImages?: string[]; // Optional gallery images (6-10 placeholder images)
}

export const PortfolioData: Portfolio[] = [
  {
  cardImage: "/assets/img/Projects/Cozet/hero.png",
  ProjectVedio:
    "https://drive.google.com/file/d/1yhj3d1XX8DwBUKhPigbKneUNQEYnizpz/preview",
  name: "Cozet Solution Digital Agency Website",
  shortDescription:
    "A modern static digital agency website built with React and Tailwind CSS.",
  description:
    "Cozet Solution is a React-based static digital agency website designed to showcase professional services, portfolio projects, client testimonials, and team members. The website focuses on clean UI, smooth animations, and performance optimization. It is ideal for digital agencies or personal portfolios, providing a strong online presence without backend complexity.",
  link: "https://www.linkedin.com/in/naveed-abbasi/",
  liveUrl: "https://cozech-solution.vercel.app/",
  projectType: "Frontend",
  timeline: "2 Days",
  features: [
    "Modern and responsive digital agency UI",
    "Services showcase with clean layouts",
    "Portfolio section with project highlights",
    "Client testimonials and FAQ section",
    "Team members and statistics display",
    "Smooth animations using Framer Motion",
    "Reusable and scalable React components",
    "Optimized for performance and SEO",
  ],
  challenges: [
    "Optimizing large media assets for better performance",
    "Improving Lighthouse performance scores",
    "Managing animations without impacting page speed",
    "Ensuring responsive design across all devices",
    "Maintaining clean and scalable component structure",
  ],
  Technologies:
    "React JS, Vite, Tailwind CSS, Framer Motion, Lucide Icons, JavaScript, HTML5, CSS3",
  // galleryImages: [
  //   "/assets/img/Projects/Cozet/hero.png",
  //   "/assets/img/Projects/Cozet/1.png",  
  // ],
}
,
  {
    cardImage: "/assets/img/Projects/BookStore/BookStore.png",
    ProjectVedio:
      "https://drive.google.com/file/d/1eJrYklpdFvJKis7j--dzfXJRXChJOsSF/preview",
    name: "Online Book Exchange Platform",
    shortDescription:
      "A full-stack OLX-style book exchange platform with real-time chat.",
    description:
      "A MERN fullstack online book exchange platform where users can upload, sell, exchange, or donate books. Other users can request books, owners can approve/reject requests, and both users can communicate through real-time chat using Socket.IO. The system promotes knowledge-sharing and reusability within the community.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-fullstackdeveloper-nodejs-activity-7363232307782021120-1HWU?utm_source=share&utm_medium=member_desktop",
    liveUrl: "https://book-store-five-nu.vercel.app/",
    projectType: "FullStack",
    timeline: "1 month",
    features: [
      "Upload books for sell, exchange or donation",
      "Book request system with approve/reject",
      "Real-time chat between users using Socket.IO",
      "Secure JWT-based authentication",
      "Email notifications using Nodemailer",
      "User profile management",
      "Responsive UI with React & Tailwind CSS",
    ],
    challenges: [
      "Implementing real-time chat using Socket.IO",
      "Managing book exchange workflow between two users",
      "Handling image uploads with Multer",
      "Maintaining clean state management with Redux Toolkit",
    ],
    Technologies:
      "React JS, Tailwind CSS, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Nodemailer, Socket.IO",
    galleryImages: [
      "/assets/img/Projects/BookStore/book1.jpeg",
      "/assets/img/Projects/BookStore/book2.jpeg",
      "/assets/img/Projects/BookStore/book3.jpeg",
      "/assets/img/Projects/BookStore/book4.jpeg",
      "/assets/img/Projects/BookStore/book5.jpeg",
      "/assets/img/Projects/BookStore/book6.jpeg",
      "/assets/img/Projects/BookStore/book7.jpeg",
      "/assets/img/Projects/BookStore/book8.jpeg",
      "/assets/img/Projects/BookStore/book9.jpeg",
      "/assets/img/Projects/BookStore/book10.jpeg",
      "/assets/img/Projects/BookStore/book11.jpeg",
    ],
  },

  {
    cardImage: "/assets/img/Projects/ChatApp/chat.png",
    ProjectVedio:
      "https://drive.google.com/file/d/1Wlp7RuyCZk95q8ZachM7V7a6q7alqKzc/preview",

    name: "Real-Time Chat App",
    shortDescription:
      "A real-time chat application with authentication, OTP flow, friends system, and live messaging using Socket.IO.",

    description:
      "A full-stack real-time chat application built using the MERN stack. It includes complete authentication with OTP verification, a friend system, real-time text & image messaging, online status tracking, and a fully responsive frontend built with React, Tailwind CSS, and Zustand. Socket.IO powers all real-time communication with seamless updates.",

    link: "https://www.linkedin.com/posts/naveed-abbasi_mernstack-frontend-backend-activity-7342513674307166208-vB_2?utm_source=share&utm_medium=member_desktop",

    projectType: "FullStack",
    timeline: "1 week",

    features: [
      // Authentication + Email Flow
      "complete Authentication System",
      "OTP verification via NodeMailer (custom HTML templates)",

      // Social System
      "Send, Accept & Reject Friend Requests",
      "Suggested Friends Section",
      "Friends List Management",

      // Real-Time Chat
      "Real-time messaging with Socket.IO",
      "Send text & image messages",
      "Show live online status",

      // Frontend
    ],

    challenges: [
      "Implementing OTP email flow with custom HTML templates",
      "Managing real-time socket events efficiently",
      "Syncing user presence and messages across clients",
      "Handling friend request logic and state management",
    ],

    Technologies:
      "MongoDB, Express.js, Node.js, React.js, Socket.IO, Zustand, Tailwind CSS, NodeMailer",

    galleryImages: [
      "/assets/img/Projects/ChatApp/chat.png",
      "/assets/img/Projects/ChatApp/chat1.png",
      "/assets/img/Projects/ChatApp/chat2.png",
      "/assets/img/Projects/ChatApp/chat3.png",
      "/assets/img/Projects/ChatApp/chat4.png",
      "/assets/img/Projects/ChatApp/chat5.png",
    ],
  },

  {
    cardImage: "/assets/img/Projects/Ecom/ecom.png",
    ProjectVedio:
      "https://drive.google.com/file/d/1r7-1U-PKkPp-r3T3zg_G9DQ9lQiV16OS/preview",
    name: "Ecommerce Web App",
    shortDescription:
      "A fully functional e-commerce platform with full ecom flows.",
    description:
      "A fully functional e-commerce platform with product catalogs, shopping cart, secure checkout, and order management. Demonstrates state persistence and payment integration.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_webdevelopment-reactjs-fullstack-activity-7292500402158108672-45Pj?utm_source=share&utm_medium=member_desktop",
    projectType: "FullStack",
    timeline: "3 weeks",
    features: [
      "Dynamic product catalog",
      "Advanced filtering and search",
      "Shopping cart management",
      "Checkout process",
      "Order history",
      "User reviews and ratings",
    ],
    challenges: [
      "State persistence across sessions",
      "Cart synchronization",
      "Payment gateway integration",
    ],
    Technologies: "React,Context API,Tailwind CSS",
    galleryImages: [
      "/assets/img/Projects/Ecom/ecom1.png",
      "/assets/img/Projects/Ecom/ecom2.png",
      "/assets/img/Projects/Ecom/ecom3.png",
      "/assets/img/Projects/Ecom/ecom4.png",
      "/assets/img/Projects/Ecom/ecom5.png",
      "/assets/img/Projects/Ecom/ecom6.png",
      "/assets/img/Projects/Ecom/ecom7.png",
      "/assets/img/Projects/Ecom/ecom8.png",
      "/assets/img/Projects/Ecom/ecom7.png",
      "/assets/img/Projects/Ecom/ecom10.png",
    ],
  },

  {
    cardImage: Gemini,
    ProjectVedio:
      "https://drive.google.com/file/d/1-OVdz4or9SseK1Gi7dNIXhXJv1HEgtJZ/preview",
    name: "Gemini",
    shortDescription: "Next.js + TypeScript integration with Gemini API.",
    description:
      "A Next.js application showcasing TypeScript best practices and integration with Google's Gemini API for AI-powered content generation and analysis.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_nextjs-typescript-geminiapi-activity-7300613102188793856-9lnZ?utm_source=share&utm_medium=member_desktop",
    projectType: "Frontend",
    timeline: "2 days",
    features: [
      "Gemini API integration",
      "Server-side rendering with Next.js",
      "TypeScript type safety",
      "Real-time streaming responses",
      "Beautiful UI with Tailwind CSS",
      "Error handling and fallbacks",
    ],
    challenges: [
      "Working with external APIs",
      "Handling streaming responses",
      "Type safety with complex data structures",
    ],
    Technologies: "Nextjs,TypeScript,Tailwind CSS,Gemini API",
  },
  {
    cardImage: SoicalMediaBanner,
    ProjectVedio:
      "https://drive.google.com/file/d/17wwy2qWsm1ZgcKU6GSci_BsQ6qsIRett/preview",
    name: "Social Media App",
    shortDescription: "Social media clone with posting and interactions.",
    description:
      "A comprehensive social media platform featuring user profiles, posts, likes, comments, and follower systems. Built to demonstrate advanced state management and UI patterns.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_just-finished-a-social-media-website-clone-activity-7296118246720573440-gwJw?utm_source=share&utm_medium=member_desktop",
    projectType: "Frontend",
    timeline: "1 week",
    features: [
      "User authentication and profiles",
      "Create, edit, delete posts",
      "Like and comment system",
      "Follow/unfollow functionality",
      "Feed with infinite scroll",
      "Search and filters",
    ],
    challenges: [
      "Complex state management",
      "Performance optimization for large feeds",
      "Real-time updates",
    ],
    Technologies: "React,Redux-Toolkit,Tailwind CSS,Firebase",
    // galleryImages: [
    //   "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    //   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    // ],
  },
  {
    cardImage: BgRemoveBanner,
    ProjectVedio:
      "https://drive.google.com/file/d/1kTia_WsfvDrN2Nrg4FMsRaNq6sIZciKf/preview",
    name: "Bg-Remove",
    shortDescription: "Background removal UI with image preview.",
    description:
      "A frontend tool for removing image backgrounds with real-time preview and download capabilities. Features a polished UI for image editing operations.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_webdevelopment-tailwindcss-backgroundremoval-activity-7248614484779356160-SRIW?utm_source=share&utm_medium=member_desktop",
    projectType: "Frontend",
    timeline: "1 week",
    features: [
      "Image upload and preview",
      "Real-time background removal",
      "Before/after comparison",
      "Download edited images",
      "Responsive design",
    ],
    challenges: [
      "Image processing performance",
      "User experience for large files",
    ],
    Technologies: "React,Tailwind CSS",
  },
  {
    cardImage: JobEvent,
    ProjectVedio:
      "https://drive.google.com/file/d/1tUp0dtJ30CQvVIsaIKtRX-07fQAX_lyg/preview",

    name: "Job and Event Management System",
    shortDescription:
      "A complete job and event management system built for a hackathon with separate admin and user panels.",

    description:
      "A fully functional Job & Event Management System developed for a hackathon challenge. It includes separate Admin and User panels, allowing job posting, event creation, user applications, event participation, and detailed data management. Built using React JS and Firebase with authentication, database, and storage. React Bootstrap, Material UI, Formik, Yup, and Chart.js were used to enhance UI, validation, and analytics.",

    link: "https://www.linkedin.com/posts/naveed-abbasi_jobportal-eventmanagement-reactjs-activity-7241347404250140673-Hhau?utm_source=share&utm_medium=member_desktop",

    projectType: "FullStack",
    timeline: "1 day",

    features: [
      // Admin Panel
      "Add, view, and delete jobs",
      "View users who applied for jobs",
      "Add events",
      "View event participants",
      "Delete events",

      // User Panel
      "View all jobs",
      "Filter jobs",
      "Apply for jobs",
      "View all events",
      "Join events",
    ],

    challenges: [
      "Managing separate Admin and User flows",
      "Handling Firestore data structure for jobs and events",
      "Ensuring fast and smooth UI within a 1-day hackathon deadline",
    ],

    Technologies:
      "React JS, Firebase Firestore, Firebase Auth, Firebase Storage, CSS, React Bootstrap, Material UI, Formik, Yup, Chart.js, React Router, React Toastify",
  },

  {
    cardImage: Medium,
    ProjectVedio:
      "https://drive.google.com/file/d/1cGkIj4xn5NF-23Bm2PjSU344TyECI48X/preview",
    name: "Medium Blog Website",
    shortDescription: "Responsive blog platform with tagging.",
    description:
      "A blog website inspired by Medium, focusing on content presentation with tagging, search, and a responsive reading experience optimized for all devices.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_webdevelopment-blogging-frontend-activity-7246069331892072449-afUw?utm_source=share&utm_medium=member_desktop",
    projectType: "Frontend",
    timeline: "5 weeks",
    features: [
      "Blog post creation and editing",
      "Tag-based categorization",
      "Search functionality",
      "Reading time estimation",
      "Social sharing",
      "Comment system",
    ],
    challenges: [
      "Rich text editing",
      "SEO optimization",
      "Performance with large content",
    ],
    Technologies: "React,Tailwind CSS",
  },
  // {
  //   cardImage: Weather,
  //   ProjectVedio:
  //     "https://drive.google.com/file/d/1WPx_Zu-typVdzu_FsoKQTPl6COYx0h1f/preview",
  //   name: "Weather App",
  //   shortDescription: "Weather lookup app using public APIs.",
  //   description:
  //     "A utility application that fetches real-time weather data from public APIs and displays detailed forecasts, current conditions, and weather alerts for selected locations.",
  //   link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-webdevelopment-weatherapp-activity-7235013460634333185-QnGR?utm_source=share&utm_medium=member_desktop",
  //   projectType: "Frontend",
  //   timeline: "2 weeks",
  //   features: [
  //     "Real-time weather data",
  //     "Location search",
  //     "5-day forecast",
  //     "Weather alerts",
  //     "Temperature unit conversion",
  //     "Responsive design",
  //   ],
  //   challenges: [
  //     "API rate limiting",
  //     "Geolocation handling",
  //     "Data refresh optimization",
  //   ],
  //   Technologies: "React,Tailwind CSS,Weather API",
  //   galleryImages: [
  //     "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop",
  //   ],
  // },
  {
    cardImage: ITDeveloper,
    ProjectVedio:
      "https://drive.google.com/file/d/15OnezBYMrvn28E6lth0kxTkkLJdIXT4F/preview",
    name: "IT Developers",
    shortDescription: "Agency landing page and portfolio site.",
    description:
      "A professional marketing website for an IT agency showcasing services, team members, and case studies. Features smooth animations with GSAP and modern design.",
    link: "https://www.linkedin.com/posts/naveed-abbasi_frontenddeveloper-frontend-webdeveloper-activity-7192238968938119168--VYN?utm_source=share&utm_medium=member_desktop",
    projectType: "Frontend",
    timeline: "1 week",
    features: [
      "Service showcase",
      "Team member profiles",
      "Case studies",
      "Contact form",
      "Smooth animations",
      "Mobile responsive",
    ],
    challenges: [
      "GSAP animation implementation",
      "Performance optimization",
      "Cross-browser compatibility",
    ],
    Technologies: "HTML,CSS,JavaScript,GSAP",
  },
];
// {
//   cardImage: CMS,
//   ProjectVedio:
//     "https://drive.google.com/file/d/1RPdhJ8-OIDlVWvclvT08DlFV0I-vcDM1/preview",
//   name: "Complain Manegment System",
//   link: "https://www.linkedin.com/posts/naveed-abbasi_frontenddeveloper-frontend-backend-activity-7190815187623407616-_uoK?utm_source=share&utm_medium=member_desktop",
//   projectType: "practice",
//   Technologies: "HTML,CSS,JS,Firebase",
// },
// {
//   cardImage: TicTacToe,
//   ProjectVedio:
//     "https://drive.google.com/file/d/1S_OqFSg5bMdYC4VluzgkTJs96sQ-jozO/preview",
//   name: "TicTacToe Game",
//   link: "https://www.linkedin.com/posts/naveed-abbasi_frontend-webdeveloper-developer-activity-7196224511984205824-bfqf?utm_source=share&utm_medium=member_desktop",
//   projectType: "practice",
//   Technologies: "Reactjs,CSS",
// },
// {
//   cardImage: FigmaToHtmlBanner,
//   ProjectVedio:
//     "https://drive.google.com/file/d/18iNBdmPcQ5OtV1ELgc3htOKH9GSVml3o/preview",
//   name: "Figma to Html",
//   link: "https://www.linkedin.com/posts/naveed-abbasi_reactjs-css-webdevelopment-activity-7246069331892072449-afUw?utm_source=share&utm_medium=member_desktop",
//   projectType: "practice",
//   Technologies: "Html,CSS",
// },
