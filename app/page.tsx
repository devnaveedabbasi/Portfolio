import { Metadata } from "next";
import HomeClient from "@/app/home/HomeClient";
import AboutClient from "@/app/about/AboutClient";
import ProjectsClient from "@/app/projects/ProjectClient";
import BlogClient from "@/app/blog/BlogClient";
import ContactClient from "@/app/contact-us/ContactClient";
import { PortfolioData, educations, experiences } from "@/constant/data";

export const metadata: Metadata = {
  title: "Naveed Abbasi | Web Developer | devnaveedabbasi",
  description: "Explore the portfolio of Naveed Abbasi, also known as devnaveedabbasi — a Full Stack Web Developer creating fast, modern, and scalable websites with React, Next.js, Node.js, and MongoDB.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Naveed Abbasi | Web Developer | devnaveedabbasi",
    description: "Explore the work of Naveed Abbasi (devnaveedabbasi), a Full Stack Web Developer specializing in modern websites and web applications built with React, Next.js, Node.js, and MongoDB.",
    url: "https://naveedabbasi.vercel.app",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/meee2.png",
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
    images: ["https://naveedabbasi.vercel.app/assets/img/meee2.png"],
  },
  keywords: [
    "Naveed Abbasi",
    "devnaveedabbasi",
    "devnaveedabbasi portfolio",
    "Naveed Abbasi portfolio",
    "Naveed Abbasi developer",
    "Naveed Abbasi web developer",
    "developer",
    "web developer",
    "full stack web developer",
    "frontend developer",
    "backend developer",
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
  const personalInfo = [
    { firstName: "Naveed" },
    { lastName: "Abbasi" },
    { Age: "18 Years" },
    { Nationality: "Pakistan" },
    { Freelance: "Available" },
    { Address: "Sarfaraz Society Hyderabad" },
    { phone: "+92 311 1309060" },
    { Email: "naveedabbasi8651@gmail.com" },
    { languages: ["English", "Urdu"] },
  ];

  const experienceData = [
    { years: 1, exper: "Year of experience" },
    { years: 18, exper: "Completed projects" },
    { years: 12, exper: "Happy customers" },
    { years: 10, exper: "Awards won" },
  ];

  const socialIcons = [
    { icon: "ri:linkedin-fill", link: "https://www.linkedin.com/in/naveed-abbasi" },
    { icon: "ri:github-fill", link: "https://github.com/devnaveedabbasi" },
    { icon: "mdi:whatsapp", link: "https://wa.me/03111309060" },
    { icon: "ri:instagram-line", link: "https://www.instagram.com/naveed_abbasi316/" },
  ];

  return (
    <div className="scroll-smooth bg-[#111111]">
      <section id="home" className="relative z-0">
        <HomeClient />
      </section>
      <section id="about" className="relative z-10 scroll-mt-8 bg-[#111111]">
        <AboutClient
          personalInfo={personalInfo}
          experienceData={experienceData}
          educations={educations}
          experiences={experiences}
        />
      </section>
      <section id="projects" className="relative z-10 scroll-mt-8 bg-[#111111]">
        <ProjectsClient portfolioData={PortfolioData} />
      </section>
      <section id="blog" className="relative z-10 scroll-mt-8 bg-[#111111]">
        <BlogClient />
      </section>
      <section id="contact" className="relative z-10 scroll-mt-8 bg-[#111111]">
        <ContactClient socialIcons={socialIcons} />
      </section>
    </div>
  );
}