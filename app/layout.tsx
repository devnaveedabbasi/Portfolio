import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./blog-styles.css";
import "quill/dist/quill.snow.css";
import StoreProvider from "@/app/storeProvider";
import Layout from "@/component/layout";
import SeoImageLinks from "@/component/SeoImageLInks";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naveed Abbasi | FullStack Developer | MERN Stack Developer",
  description:
    "Official portfolio of Naveed Abbasi - FullStack Developer, React.js & Next.js Specialist. Explore my projects, skills, and experience in full-stack web development.",
  keywords: [
    "Naveed",
    "Naveed Abbasi",
    "Dev Naveed",
    "Dev Naveed Abbasi",
    "Naveed Hassan",
    "Naveed Abbasi Portfolio",
    "Naveed Hassan Portfolio",
    "Frontend Developer Naveed Abbasi",
    "React Developer Naveed Abbasi",
    "Backend Developer Naveed Abbasi",
    "Next.js Developer Naveed Abbasi",
    "Node.js Developer Naveed Abbasi",
    "MERN Stack Developer Naveed Abbasi",
    "Full Stack Developer Naveed Abbasi",
    "Web Developer Naveed Abbasi",
    "Software Engineer Naveed Abbasi",
    "JavaScript Developer Naveed Abbasi",
    "TypeScript Developer Naveed Abbasi",
  ],
  authors: [{ name: "Naveed Abbasi" }, { name: "Naveed Hassan" }],
  creator: "Naveed Abbasi",
  publisher: "Naveed Abbasi",
  openGraph: {
    title: "Naveed Abbasi | Full Stack Developer | MERN Stack",
    description:
      "Portfolio of Naveed Abbasi - Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    url: "https://naveedabbasi.vercel.app/",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/Me.png",
        width: 1200,
        height: 630,
        alt: "Naveed Abbasi Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Abbasi | Full Stack Developer | MERN Stack",
    description:
      "Hire Naveed Abbasi — Full Stack Developer & Software Engineer.",
    creator: "@naveedabbasi",
    images: ["https://naveedabbasi.vercel.app/assets/img/Naveed_Abbasi.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          {/* ✅ Google Site Verification Tag */}
          <meta
            name="google-site-verification"
            content="GLRNA_RX2DGYY9zeHaVbOA8BV2TGzG2eUQ37qLffT"
          />
          <meta name="author" content="Naveed Abbasi, Naveed Hassan" />
          <meta
            name="keywords"
            content="Naveed, Naveed Abbasi, Naveed Hassan, Dev Naveed, Naveed Abbasi Portfolio, MERN Stack Developer, React Developer, Next.js Developer, Full Stack Developer"
          />
          <meta
            name="description"
            content="Portfolio of Naveed Abbasi - Full Stack Developer specializing in React, Next.js, Node.js & MongoDB."
          />
          <meta name="robots" content="index, follow" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Layout>
            {children}   
                 <SpeedInsights />
</Layout>
          {/* 🔥 Hidden SEO Image Links (NO UI) */}
          <SeoImageLinks />

          {/* 🔥 Person Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Naveed Abbasi",
                alternateName: [
                  "Naveed",
                  "Naveed Hassan",
                  "Naveed Abbasi",
                  "Naveed Developer",
                ],
                url: "https://naveedabbasi.vercel.app",
                image: [
                  "https://naveedabbasi.vercel.app/assets/img/NaveedAbbasi.png",
                  "https://naveedabbasi.vercel.app/assets/img/Me.png",
                  "https://naveedabbasi.vercel.app/assets/img/NaveedAbbasi.png",
                  "https://naveedabbasi.vercel.app/assets/img/consultation.png",
                  "https://naveedabbasi.vercel.app/assets/img/portfolio.png",
                ],
                jobTitle: [
                  "Full Stack Developer",
                  "ReactJs Developer",
                  "Nodejs Developer",
                  "JavaScript Developer",
                  "TypeScript Developer",
                  "MERN Stack Developer",
                  "Software Engineer",
                  "Web Developer",
                ],
                sameAs: [
                  "https://www.linkedin.com/in/naveed-abbasi",
                  "https://github.com/devnaveedabbasi",
                ],
                knowsAbout: [
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "MongoDB",
                  "Firebase",
                  "REST APIs",
                  "Web Development",
                ],
              }),
            }}
          />
        </body>
      </html>
    </StoreProvider>
  );
}
