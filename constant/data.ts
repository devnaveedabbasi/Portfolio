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
  { name: "Works", href: "/#works" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/#about" },
  { name: "Stack", href: "/#stack" },
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
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

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  image: string;
  highlighted?: boolean;
}

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-google-genai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    image: "/assets/img/certification/genrative-ai.jpg",
    highlighted: true,
  },
  {
    id: "cert-ms-foundry",
    title: "Develop an AI App with Microsoft Foundry SDK",
    issuer: "Microsoft · Azure AI",
    image: "/assets/img/certification/ai.png",
    highlighted: true,
  },
  {
    id: "cert-ms-agents",
    title: "Introduction to Generative AI & Agents",
    issuer: "Microsoft · Azure AI",
    image: "/assets/img/certification/aii.png",
    highlighted: true,
  },
  {
    id: "cert-youngdev",
    title: "Frontend Web Developer Internship",
    issuer: "YoungDev Interns",
    image: "/assets/img/certification/frontend.jpg",
    highlighted: false,
  },
  {
    id: "cert-nextjs",
    title: "Next.js App Router & Architecture",
    issuer: "Modern Web Engineering",
    image: "/assets/img/certification/next-js-v4-1.png",
  },
  {
    id: "cert-ai-fullstack",
    title: "AI-Powered Full Stack Development",
    issuer: "Metaschool AI Engineering",
    image: "/assets/img/certification/Certificate-AI-Powered-Full-Stack-Development-and-Methods-to-Monetize-Naveed-1.png",
    highlighted: true,
  },
  {
    id: "cert-docker",
    title: "Docker for Developers",
    issuer: "Cloud Containerization & DevOps",
    image: "/assets/img/certification/Docker for Developers-1.png",
  },
  {
    id: "cert-verior",
    title: "Full Stack Developer Experience",
    issuer: "Verior Technology",
    image: "/assets/img/certification/Veiror-FullStack.png",
  },
  {
    id: "cert-typescript",
    title: "TypeScript for AI Applications",
    issuer: "Modern Type-Safe Architecture",
    image: "/assets/img/certification/typescript-ai-1.png",
  },
  {
    id: "cert-datascience",
    title: "Data Science & Analytics",
    issuer: "HP LIFE Technical Academy",
    image: "/assets/img/certification/Data Science  Analytics-1.png",
  },
  {
    id: "cert-react-internship",
    title: "React Developer Internship",
    issuer: "Digital Elliptical",
    image: "/assets/img/certification/React-InterShip-DE.jpg",
    highlighted: true,
  },
  {
    id: "cert-smit",
    title: "Diploma in MEAN Stack Development",
    issuer: "Alison Academy",
    image: "/assets/img/certification/Course Completion Record - Naveed Abbasi (1)-1.png",
  },
  {
    id: "cert-cpp",
    title: "C++ Essentials 1",
    issuer: "Cisco & Virtual University",
    image: "/assets/img/certification/C--_Essentials_1_certificate_bc250404099nha-vu-edu-pk_e490b21a-075b-40e3-b356-059927a3e712-1.png",
  },
  {
    id: "cert-strategic-ai",
    title: "Strategic Planning in the AI Age",
    issuer: "HP LIFE / Artificial Intelligence",
    image: "/assets/img/certification/Strategic Planning in the AI Age-1.png",
  },
  {
    id: "cert-dstp",
    title: "DigiSkills Technical Program",
    issuer: "DigiSkills & Ignite Pakistan",
    image: "/assets/img/certification/DSTP_Certificate_ HEZWB9EMK-1.png",
  },
];

// Row 1 Certificates (Marquee Moving LEFT — 8 items)
export const row1Certificates: CertificateItem[] = [
  certificatesData[0], // Google Cloud Generative AI
  certificatesData[1], // Microsoft Foundry SDK
  certificatesData[4], // Next.js App Router
  certificatesData[5], // Metaschool AI-Powered Full Stack
  certificatesData[6], // Docker for Developers
  certificatesData[7], // Verior Full Stack
  certificatesData[8], // TypeScript AI
  certificatesData[9], // Data Science & Analytics
];

// Row 2 Certificates (Marquee Moving RIGHT — 8 items)
export const row2Certificates: CertificateItem[] = [
  certificatesData[2], // Microsoft Generative AI & Agents
  certificatesData[3], // YoungDev Interns Frontend
  certificatesData[10], // React Internship DE
  certificatesData[11], // SMIT Course Completion
  certificatesData[12], // C++ Essentials
  certificatesData[13], // Strategic Planning in AI
  certificatesData[14], // DSTP DigiSkills
  certificatesData[0], // Google Cloud Generative AI
];

export interface ProjectGalleryItem {
  title: string;
  size: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  client: string;
  timeline: string;
  headline: string;
  subtext: string;
  description: string;
  fullDescription: string[];
  challenges: string[];
  solutions: string[];
  metrics: ProjectMetric[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  recommendedSize: string;
  accentColor: string;
  gallery: ProjectGalleryItem[];
}

export const projectsData: Project[] = [
  {
    id: "aurelia",
    title: "Aurelia",
    subtitle: "Algorithmic Trading Platform & OS",
    category: "FinTech & Trading",
    year: "©2025",
    role: "Lead Full Stack Architect",
    client: "FinTech Syndicate",
    timeline: "4 Months",
    headline: "AURELIA // TRADING OS",
    subtext: "Sub-10ms UI · WebSockets · 250k req/sec",
    description:
      "High-frequency analytics engine with real-time WebSockets, orderbook depth chart, and sub-10ms UI updates.",
    fullDescription: [
      "Aurelia is an institutional-grade financial trading interface and algorithmic analytics dashboard engineered for zero-latency execution and high-frequency data ingestion.",
      "The system handles millions of live ticks per minute over multiplexed WebSockets, streaming real-time orderbook depth, market maker spread differentials, and automated risk threshold alerts directly to the client browser without UI frame drops.",
      "Built with Next.js 15, Go microservices, and high-performance WebGL chart canvases, Aurelia achieves steady 60fps rendering even under peak market volatility."
    ],
    challenges: [
      "Handling 250,000+ incoming WebSocket price updates per second without freezing the browser main thread.",
      "Rendering complex multi-layer candlestick depth charts with millisecond responsiveness.",
      "Synchronizing client-side order status with distributed backend matching engines."
    ],
    solutions: [
      "Implemented Web Workers for off-main-thread data decompression, batching, and orderbook sorting.",
      "Utilized Canvas 2D / WebGL acceleration to render high-density charts with zero DOM node overhead.",
      "Engineered optimistic UI updates with automatic reconciliation against server confirmations."
    ],
    metrics: [
      { label: "Throughput", value: "250k req/s" },
      { label: "UI Latency", value: "<10 ms" },
      { label: "Frame Rate", value: "60 FPS steady" },
      { label: "Active Volume", value: "$40M+ / Day" },
    ],
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "WebSockets", "Go", "Redis", "Docker"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#E0A96D",
    gallery: [
      {
        title: "Trading Terminal & Orderbook",
        size: "1400 × 850 px (Desktop Terminal)",
        description: "Full-bleed dashboard with live depth chart, order execution ladder, and trade history."
      },
      {
        title: "Latency & Throughput Monitor",
        size: "900 × 600 px (Diagnostics View)",
        description: "Telemetry inspector showing microsecond tick ingestion and WebSocket connection health."
      },
      {
        title: "Mobile Responsive Execution",
        size: "600 × 900 px (Mobile Device)",
        description: "Adaptive mobile viewport for fast one-tap order placement and portfolio tracking."
      }
    ]
  },
  {
    id: "ilmcode",
    title: "IlmCode",
    subtitle: "Interactive EdTech & Code Sandbox Platform",
    category: "EdTech Platform",
    year: "©2025",
    role: "Founder & Full Stack Engineer",
    client: "IlmCode Community",
    timeline: "Ongoing",
    headline: "ILMCODE // DEVELOPER OS",
    subtext: "In-Browser Sandbox · 50k+ Active Learners",
    description:
      "Modern interactive coding platform featuring in-browser code compilation, real-time quizzes, and structured developer roadmaps.",
    fullDescription: [
      "IlmCode is an educational platform founded by Naveed Abbasi designed to democratize high-quality computer science and software engineering education for aspiring developers.",
      "The platform combines interactive in-browser Monaco code editors, automated code judge execution, and gamified progress tracking into a fluid, sub-second web application.",
      "Engineered from scratch using Next.js, Node.js, and secure Docker sandboxes, IlmCode allows students to write, compile, and debug JavaScript, Python, and SQL instantly without local setup."
    ],
    challenges: [
      "Safely executing untrusted user code in real time without compromising infrastructure security.",
      "Maintaining sub-second page transitions across thousands of nested lessons and exercises.",
      "Building an intuitive, distraction-free code editor with code completion and syntax highlighting."
    ],
    solutions: [
      "Engineered ephemeral Docker worker containers with tight CPU, memory, and network isolation limits.",
      "Implemented Next.js incremental static regeneration (ISR) for instant course chapter loads.",
      "Integrated lightweight Monaco editor with customized accessible themes and automated test harnesses."
    ],
    metrics: [
      { label: "Active Students", value: "50,000+" },
      { label: "Code Runs", value: "1.2M+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Avg Load Time", value: "0.45s" },
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Prisma ORM"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#10B981",
    gallery: [
      {
        title: "Interactive Code Sandbox Interface",
        size: "1400 × 850 px (Editor & Preview)",
        description: "Split-pane layout with Monaco editor, real-time console output, and test pass badges."
      },
      {
        title: "Student Progress & Analytics Dashboard",
        size: "900 × 600 px (LMS Analytics)",
        description: "Comprehensive student dashboard showing skill badges, completed modules, and streaks."
      },
      {
        title: "Mobile Responsive Learning View",
        size: "600 × 900 px (Mobile Interface)",
        description: "Clean mobile view allowing students to read technical articles and solve quizzes on the go."
      }
    ]
  },
  {
    id: "northwind",
    title: "Northwind",
    subtitle: "Accessible Enterprise Component System",
    category: "Design System",
    year: "©2025",
    role: "Design Systems Architect",
    client: "Enterprise SaaS Org",
    timeline: "3 Months",
    headline: "NORTHWIND // UI 2.0",
    subtext: "40+ Headless Primitives · Zero-Runtime CSS",
    description:
      "40+ accessible headless components built on Radix primitives with zero-runtime CSS tokens and automated docs.",
    fullDescription: [
      "Northwind is an enterprise-level component library and design token architecture created to unify UI consistency across multi-team engineering organizations.",
      "Built on top of accessible Radix primitives and Tailwind CSS with custom CSS variables, Northwind guarantees WCAG AAA accessibility, seamless dark/light theming, and full keyboard navigation across every modal, dropdown, slider, and data table.",
      "The package is published as an optimized npm package with automated Storybook documentation, visual regression tests, and zero runtime CSS overhead."
    ],
    challenges: [
      "Ensuring strict WCAG AAA accessibility standards across complex components like datepickers and comboboxes.",
      "Eliminating CSS bundle bloat and runtime style recalculation penalties.",
      "Providing frictionless developer DX with rigorous TypeScript type completions."
    ],
    solutions: [
      "Leveraged headless primitives with custom ARIA attributes and focus trap management.",
      "Adopted atomic utility CSS and design tokens mapped directly to Figma variables.",
      "Automated Storybook preview builds with Chromatic visual regression testing."
    ],
    metrics: [
      { label: "Components", value: "40+ Primitives" },
      { label: "Bundle Size", value: "<12 KB gzipped" },
      { label: "Accessibility", value: "WCAG AAA" },
      { label: "Adoption", value: "12 Team Repos" },
    ],
    tech: ["React", "Radix UI", "Tailwind CSS", "Storybook", "TypeScript", "npm"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#2563EB",
    gallery: [
      {
        title: "Component Catalog & Storybook Showcase",
        size: "1400 × 850 px (Storybook UI)",
        description: "Interactive component playground with variant switchers, token knobs, and code exports."
      },
      {
        title: "Design Token Architecture & Variables",
        size: "900 × 600 px (Token Map)",
        description: "Visual matrix of color tokens, typography scales, border radii, and spacing steps."
      },
      {
        title: "Form & Modal Micro-interactions",
        size: "600 × 900 px (Interaction States)",
        description: "Detailed view of focus rings, error animations, and accessible keyboard states."
      }
    ]
  },
  {
    id: "lumen",
    title: "Lumen Studio",
    subtitle: "Interactive 3D & WebGL Engine",
    category: "Creative Tech",
    year: "©2025",
    role: "Creative Developer",
    client: "Digital Agency",
    timeline: "2 Months",
    headline: "LUMEN // ENGINE",
    subtext: "Three.js · GLSL Post-Processing · 60fps",
    description:
      "Experimental generative portfolio showcase with Three.js WebGL shaders, kinetic typography, and fluid transitions.",
    fullDescription: [
      "Lumen Studio is an experimental digital showcase pushing the boundaries of WebGL, custom GLSL vertex/fragment shaders, and interactive physics on the web.",
      "Designed with an aesthetic focus on cinematic lighting, mouse-reactive fluid displacement, and magnetic kinetic typography, Lumen offers users a memorable sensory web experience.",
      "Engineered with Three.js, GSAP timeline choreography, and Next.js, the project incorporates smart GPU-tier detection to deliver silky 60fps performance across both high-end workstations and mobile phones."
    ],
    challenges: [
      "Maintaining smooth 60fps framerates on lower-powered mobile GPUs without draining battery.",
      "Preventing canvas memory leaks across page navigations and viewport resizing.",
      "Choreographing complex camera paths seamlessly linked with mouse scroll scrub."
    ],
    solutions: [
      "Implemented adaptive resolution scaling and dynamic shader quality downgrading for mobile devices.",
      "Built clean Three.js geometry and texture disposal lifecycles on component unmount.",
      "Integrated GSAP ScrollTrigger with custom inertial damping curves."
    ],
    metrics: [
      { label: "Target FPS", value: "60 FPS" },
      { label: "GPU Overhead", value: "Under 15%" },
      { label: "FWA Nominee", value: "Awarded" },
      { label: "Load Time", value: "<1.2s" },
    ],
    tech: ["Three.js", "WebGL", "GSAP", "GLSL Shaders", "Next.js", "TypeScript"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#E8461D",
    gallery: [
      {
        title: "Generative 3D Canvas & Particle Field",
        size: "1400 × 850 px (3D Canvas)",
        description: "Interactive particle mesh with mouse collision physics and real-time bloom lighting."
      },
      {
        title: "GLSL Shader Post-Processing Matrix",
        size: "900 × 600 px (Shader Breakdown)",
        description: "Visual breakdown of chromatic aberration, film grain, and displacement pass buffers."
      },
      {
        title: "Mobile Touch Particle Interaction",
        size: "600 × 900 px (Mobile Device)",
        description: "Gyroscope and multi-touch reactive physics on mobile screens."
      }
    ]
  },
  {
    id: "chronos",
    title: "Chronos Health & IoT",
    subtitle: "Smart Telemetry & Edge Fleet Hub",
    category: "IoT & Cloud",
    year: "©2025",
    role: "Backend & Systems Engineer",
    client: "Connected Health Tech",
    timeline: "5 Months",
    headline: "CHRONOS // HUB",
    subtext: "10k+ Live Nodes · MQTT Stream · Alert Bus",
    description:
      "Telemetry monitoring application tracking real-time health intervals, device metrics, and automated progress analytics.",
    fullDescription: [
      "Chronos is a distributed IoT hub and time-series telemetry processing portal engineered to ingest, visualize, and analyze high-frequency vital stats and hardware performance signals.",
      "The backend processes streaming data from over 10,000 active hardware devices over MQTT, indexing millions of data points into TimescaleDB with automated anomaly detection routines.",
      "A real-time React dashboard presents operations teams with live device geographic heatmaps, connection health diagnostics, and instant emergency push alerts."
    ],
    challenges: [
      "Ingesting high-volume burst traffic from distributed hardware without message loss.",
      "Aggregating gigabytes of time-series vitals into instant queryable dashboard charts.",
      "Triggering millisecond automated incident alerts when vitals exceed safety boundaries."
    ],
    solutions: [
      "Deployed a clustered MQTT broker with Kafka pipeline queueing to buffer unpredictable bursts.",
      "Configured TimescaleDB continuous aggregates with hypertable compression for 90% storage savings.",
      "Built a Redis pub/sub alert bus broadcasting critical events to web clients via Server-Sent Events."
    ],
    metrics: [
      { label: "Active Nodes", value: "10,000+ IoT" },
      { label: "Data Ingestion", value: "5M+ Daily" },
      { label: "Query Speed", value: "45ms Avg" },
      { label: "System Uptime", value: "99.99%" },
    ],
    tech: ["Node.js", "MQTT", "TimescaleDB", "PostgreSQL", "Docker", "AWS EC2", "Redis"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#8A38F5",
    gallery: [
      {
        title: "Fleet Operations Map & Health Matrix",
        size: "1400 × 850 px (Fleet Map View)",
        description: "Interactive world map displaying active IoT nodes, connectivity latency, and status markers."
      },
      {
        title: "Time-Series Telemetry & Anomaly Graphs",
        size: "900 × 600 px (Telemetry Charts)",
        description: "High-density time-series plots with dynamic zoom, pan, and automated alert flags."
      },
      {
        title: "Device Configuration & Diagnostics Panel",
        size: "600 × 900 px (Device Inspector)",
        description: "Deep-dive diagnostic view showing firmware versions, battery life, and MQTT logs."
      }
    ]
  },
  {
    id: "nexus-ai",
    title: "Nexus AI Platform",
    subtitle: "Enterprise LLM Agent & Workflow Engine",
    category: "AI & Distributed Systems",
    year: "©2024",
    role: "Full Stack AI Engineer",
    client: "Autonomous AI Lab",
    timeline: "3 Months",
    headline: "NEXUS // AGENTIC OS",
    subtext: "Multi-Agent Workflows · Vector DB · Streaming",
    description:
      "Autonomous agent workflow platform with visual drag-and-drop pipeline builder, streaming LLM outputs, and vector semantic retrieval.",
    fullDescription: [
      "Nexus AI is an enterprise platform for orchestrating multi-agent LLM reasoning workflows, RAG document indexing, and autonomous tool calling.",
      "The application features a node-based visual workflow builder where developers can chain models, custom Python execution sandboxes, and vector database semantic search into production pipelines.",
      "Engineered with Next.js 15, FastAPI, LangChain, and Pinecone, Nexus AI supports ultra-responsive token-by-token streaming, user permissions, and comprehensive prompt audit trails."
    ],
    challenges: [
      "Orchestrating long-running agentic tasks while providing instant token streaming to the UI.",
      "Managing complex graph-state transitions and cyclical agent retries.",
      "Indexing large enterprise PDF libraries into high-dimensional vector spaces with accurate retrieval."
    ],
    solutions: [
      "Implemented Server-Sent Events (SSE) streaming with background async task queues in Celery/Redis.",
      "Built a stateful DAG (Directed Acyclic Graph) executor tracking each agent's thought chain.",
      "Utilized hybrid dense-sparse vector search combining Pinecone with BM25 keyword matching."
    ],
    metrics: [
      { label: "Workflows Run", value: "350k+" },
      { label: "Token Speed", value: "75 tokens/s" },
      { label: "RAG Accuracy", value: "96.4%" },
      { label: "Cost Reduction", value: "42% via Caching" },
    ],
    tech: ["Next.js 15", "Python FastAPI", "LangChain", "Pinecone", "OpenAI", "Tailwind CSS"],
    liveUrl: "https://github.com/devnaveedabbasi",
    githubUrl: "https://github.com/devnaveedabbasi",
    recommendedSize: "1400 × 850 px (16:10)",
    accentColor: "#06B6D4",
    gallery: [
      {
        title: "Node-based Workflow Visual Canvas",
        size: "1400 × 850 px (Workflow Canvas)",
        description: "Infinite drag-and-drop canvas connecting LLM prompts, API connectors, and logic routers."
      },
      {
        title: "Real-time Agent Execution & Streaming Logs",
        size: "900 × 600 px (Execution Inspector)",
        description: "Live terminal view tracking agent thought chains, tool invocations, and output tokens."
      },
      {
        title: "Semantic Vector Search & Document Indexer",
        size: "600 × 900 px (Vector Search View)",
        description: "Document ingestion interface displaying vector chunk embeddings and retrieval scores."
      }
    ]
  }
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
