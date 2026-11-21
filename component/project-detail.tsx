// Types + placeholder content for the project detail page.
// Replace `placeholderProject` with your real data later - every image below is
// a placeholder URL, swap it for your mockups.

export interface ProjectFeature {
  title: string;
  description: string;
  image: string;
}

export interface ProjectGalleryItem {
  src: string;
  caption?: string;
  /** desktop = shown in a browser frame, mobile = shown in a phone frame */
  kind: "desktop" | "mobile";
}

export interface ProjectDetailData {
  title: string;
  /** One-line outcome under the title. */
  tagline: string;
  projectType: string;
  timeline: string;
  role: string;
  client?: string;
  teamSize?: string;
  liveUrl?: string;
  tags: string[];
  heroImage: string;
  problem?: string;
  solution?: string;
  results?: { value: string; label: string }[];
  features?: ProjectFeature[];
  gallery?: ProjectGalleryItem[];
  challenges?: { title: string; description: string }[];
  testimonial?: { quote: string; author: string; role?: string };
}

export interface NextProjectData {
  title: string;
  href: string;
  image: string;
}

const ph = (w: number, h: number, text: string) =>
  `https://placehold.co/${w}x${h}/151515/8a8a8a?text=${encodeURIComponent(text)}`;

export const placeholderProject: ProjectDetailData = {
  title: "Project Name",
  tagline: "A B2B dashboard that cut the team's reporting time from hours to minutes.",
  projectType: "SaaS Platform",
  timeline: "3 months",
  role: "Full-stack Developer",
  client: "Client Name",
  teamSize: "Solo",
  liveUrl: "https://example.com",
  tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
  heroImage: ph(1600, 1000, "Hero mockup"),
  problem:
    "Placeholder: describe the client's real problem here. What was slow, manual or broken before this project existed?",
  solution:
    "Placeholder: describe your approach. What did you build, why this stack, and what made the solution a good fit?",
  results: [
    { value: "3x", label: "Faster reporting" },
    { value: "14", label: "Modules shipped" },
    { value: "8 wks", label: "Idea to launch" },
  ],
  features: [
    {
      title: "Role-based access",
      description:
        "Placeholder: explain how admins, managers and staff each get their own view and permissions.",
      image: ph(1400, 880, "Feature 1 - Roles"),
    },
    {
      title: "Live analytics",
      description:
        "Placeholder: explain the charts, filters and real-time numbers the team relies on every day.",
      image: ph(1400, 880, "Feature 2 - Analytics"),
    },
    {
      title: "Bulk import & export",
      description:
        "Placeholder: explain how large CSV files are validated and processed without blocking the UI.",
      image: ph(1400, 880, "Feature 3 - Import"),
    },
    {
      title: "Billing & invoices",
      description:
        "Placeholder: explain subscriptions, invoices and payment flows built into the platform.",
      image: ph(1400, 880, "Feature 4 - Billing"),
    },
  ],
  gallery: [
    { src: ph(1600, 1000, "Dashboard overview"), caption: "Dashboard overview", kind: "desktop" },
    { src: ph(800, 1600, "Mobile 1"), caption: "Mobile view", kind: "mobile" },
    { src: ph(800, 1600, "Mobile 2"), caption: "Mobile detail", kind: "mobile" },
    { src: ph(1600, 1000, "Settings page"), caption: "Settings", kind: "desktop" },
    { src: ph(1600, 1000, "Table view"), caption: "Data tables", kind: "desktop" },
  ],
  challenges: [
    {
      title: "Multi-tenant data",
      description:
        "Placeholder: how you kept every client's data isolated while sharing one codebase.",
    },
    {
      title: "Large tables, fast",
      description:
        "Placeholder: how pagination, indexing and caching kept big datasets snappy.",
    },
    {
      title: "Real-time updates",
      description:
        "Placeholder: how live changes reach every open dashboard without refreshes.",
    },
  ],
  testimonial: {
    quote: "Placeholder: a short line from the client about working with you.",
    author: "Client Name",
    role: "Founder, Company",
  },
};

export const placeholderNext: NextProjectData = {
  title: "Next Project",
  href: "/projects",
  image: ph(1600, 1000, "Next project"),
};