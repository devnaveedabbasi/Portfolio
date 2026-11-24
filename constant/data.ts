export interface PersonalInfo {
  name: string;
  wordmark: string;
  tagline: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  availability: string;
  experienceYears: string;
  projectsDelivered: string;
  bookingUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: "Naveed Abbasi",
  wordmark: "Naveed Abbasi.",
  tagline: "Full Stack Developer · Available for projects",
  status: "Available for projects",
  email: "devnaveedabbasi@gmail.com",
  phone: "+92 315 2891361",
  location: "Islamabad, Pakistan",
  timezone: "PKT (UTC+5)",
  availability: "Available for Q1/Q2 Projects",
  experienceYears: "6+",
  projectsDelivered: "40+",
  bookingUrl: "https://cal.com/devnaveedabbasi",
};

export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export interface SocialLink {
  name: string;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", label: "GH", href: "https://github.com/devnaveedabbasi" },
  { name: "LinkedIn", label: "LinkedIn", href: "https://www.linkedin.com/in/naveed-abbasi" },
];

export interface TechCategory {
  number: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
}

export const techStackData: TechCategory[] = [
  {
    number: "01",
    category: "FRONTEND & UI",
    title: "Client Architecture",
    description:
      "Crafting fluid, responsive, and accessible web experiences with state-of-the-art tooling.",
    skills: [
      "Next.js 14 / React 18",
      "TypeScript & Clean Code",
      "Tailwind CSS & Radix UI",
      "Framer Motion Animations",
      "State Management (Zustand)",
      "Web Vitals & Performance",
    ],
  },
  {
    number: "02",
    category: "BACKEND & SYSTEMS",
    title: "Server & Databases",
    description:
      "Architecting secure, high-concurrency server environments and reliable data pipelines.",
    skills: [
      "Node.js & Express / Nest",
      "PostgreSQL & Prisma ORM",
      "RESTful & GraphQL APIs",
      "Redis Caching & PubSub",
      "Authentication (JWT, OAuth)",
      "Microservices & Queues",
    ],
  },
  {
    number: "03",
    category: "DEVOPS & INFRA",
    title: "Cloud & Delivery",
    description:
      "Automating builds, containerization, and monitoring for fault-tolerant deployments.",
    skills: [
      "Docker & Containerization",
      "AWS (S3, EC2, Lambda, RDS)",
      "CI/CD GitHub Actions",
      "Vercel & Cloudflare Edge",
      "Git Workflow & Branching",
      "Monitoring, Logs & Sentry",
    ],
  },
];

export interface Experience {
  date: string;
  title: string;
  company: string;
  type: string;
  scope: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    date: "2025 — Present",
    title: "Full Stack Developer",
    company: "Tribicx",
    type: "Full-time",
    scope: "Next.js · Nest.js · PostgreSQL · AWS",
    description:
      "Developing Full Stack applications handling both frontend and backend to deliver complete web solutions for diverse client architectures.",
  },
  {
    date: "2025",
    title: "Full Stack Developer",
    company: "Verior",
    type: "Full-time",
    scope: "React · Next.js · Node.js · REST APIs",
    description:
      "Engineered full-stack projects using Node.js, React.js, Next.js with backend APIs, REST/FastAPI integration, Figma-to-code conversions, and Firebase services.",
  },
  {
    date: "2024 — 2025",
    title: "React Developer",
    company: "Digital Elliptical",
    type: "Onsite",
    scope: "React.js · Tailwind CSS · Micro-frontends",
    description:
      "Focused on responsive web applications using React.js, Tailwind CSS, component systems, and modern UI/UX design practices.",
  },
  {
    date: "2024",
    title: "Frontend Developer",
    company: "YoungDevIntern",
    type: "Internship",
    scope: "JavaScript · RESTful APIs · CSS Architecture",
    description:
      "Engineered interactive and responsive web solutions using HTML5, modern CSS, and JavaScript standards.",
  },
];

export interface Education {
  date: string;
  title: string;
  institution: string;
  description: string;
}

export const educations: Education[] = [
  {
    date: "2025 — Present",
    title: "BS Software Engineering",
    institution: "Virtual University of Pakistan",
    description:
      "Core focus on software architecture, algorithms, data structures, and computer science fundamentals.",
  },
  {
    date: "2023 — 2024",
    title: "Web & Mobile App Development",
    institution: "SMIT Hyderabad",
    description:
      "Comprehensive mastery across full-stack modern JavaScript, React, Node.js, and backend integration.",
  },
  {
    date: "2017 — 2021",
    title: "Memorization of Quran (Hifz)",
    institution: "Madrasa Tajweed-ul-Quran",
    description:
      "Completed Hifz-e-Quran with dedicated focus on discipline, Tajweed rules, and memorization mastery.",
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  headline: string;
  subtext: string;
  description: string;
  tech: string[];
  link: string;
}

export const projectsData: Project[] = [
  {
    id: "aurelia",
    title: "Aurelia",
    subtitle: "Algorithmic Trading Platform",
    tag: "FINTECH & TRADING",
    badge: "ARCHITECTURE CORE",
    headline: "AURELIA // TRADING OS",
    subtext: "Sub-10ms UI · WebSockets · 250k req/sec",
    description:
      "High-frequency analytics engine with real-time WebSockets, orderbook depth chart, and sub-10ms UI updates.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebSockets", "Go"],
    link: "https://github.com/devnaveedabbasi",
  },
  {
    id: "northwind",
    title: "Northwind",
    subtitle: "Accessible Component System",
    tag: "DESIGN SYSTEM & LIBRARY",
    badge: "DESIGN TOKENS & SYSTEM",
    headline: "NORTHWIND // UI 2.0",
    subtext: "40+ Headless Primitives · Zero-Runtime CSS",
    description:
      "40+ accessible headless components built on Radix primitives with zero-runtime CSS tokens and automated docs.",
    tech: ["React", "Radix UI", "Tailwind CSS", "Storybook", "npm"],
    link: "https://github.com/devnaveedabbasi",
  },
  {
    id: "lumen",
    title: "Lumen Studio",
    subtitle: "Interactive Portfolio Engine",
    tag: "CREATIVE TECH & 3D",
    badge: "CREATIVE SHADERS & 3D",
    headline: "LUMEN // ENGINE",
    subtext: "Three.js · GLSL Post-Processing · 60fps",
    description:
      "Experimental generative portfolio showcase with Three.js WebGL shaders, kinetic typography, and fluid transitions.",
    tech: ["Three.js", "WebGL", "GSAP", "Next.js", "GLSL"],
    link: "https://github.com/devnaveedabbasi",
  },
  {
    id: "chronos",
    title: "Chronos",
    subtitle: "Smart Device Telemetry Hub",
    tag: "IOT & CLOUD PLATFORM",
    badge: "TELEMETRY & HARDWARE",
    headline: "CHRONOS // HUB",
    subtext: "10k+ Live Nodes · MQTT Stream · Alert Bus",
    description:
      "Fleet portal for 10,000+ IoT units with MQTT telemetry streams, real-time heatmaps, and automated alert systems.",
    tech: ["Node.js", "MQTT", "TimescaleDB", "Docker", "AWS"],
    link: "https://github.com/devnaveedabbasi",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "What is your typical project turnaround time?",
    answer: "Landing pages take 1-2 weeks; full-stack MVPs typically take 3-6 weeks depending on feature scope.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, I offer ongoing retainer contracts, SLA monitoring, security patches, and feature iteration.",
  },
  {
    question: "Can you collaborate with existing design and dev teams?",
    answer: "Absolutely. I regularly integrate into existing GitHub workflows, Jira, and Slack channels.",
  },
  {
    question: "What are your preferred contract structures?",
    answer: "Milestone-based fixed price for well-defined scopes, or weekly/monthly dedicated engineering retainers.",
  },
  {
    question: "How do we get started?",
    answer: "Book a 15-minute discovery call or email your brief directly to devnaveedabbasi@gmail.com to receive an estimate.",
  },
];
