import type { Metadata } from "next";
import {  Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import "./blog-styles.css";
import "quill/dist/quill.snow.css";
import StoreProvider from "@/app/storeProvider";
import Layout from "@/component/layout";
import SeoImageLinks from "@/component/SeoImageLInks";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { shouldShowSpeedInsights } from "@/utlis/environment";

export const metadata: Metadata = {
  metadataBase: new URL("https://naveedabbasi.vercel.app"),
  title: "Naveed Abbasi | Web Developer | devnaveedabbasi",
  description:
    "Official portfolio of Naveed Abbasi, also known as devnaveedabbasi — a Full Stack Developer specializing in React.js, Next.js, Node.js, and MERN stack development.",
  keywords: [
    "Naveed",
    "Naveed Abbasi",
    "devnaveedabbasi",
    "devnaveedabbasi portfolio",
    "Naveed Abbasi developer",
    "Naveed Abbasi web developer",
    "Naveed Abbasi full stack web developer",
    "developer",
    "web developer",
    "full stack web developer",
    "frontend developer",
    "backend developer",
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
  applicationName: "Naveed Abbasi Portfolio",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Naveed Abbasi | Web Developer | devnaveedabbasi",
    description:
      "Official portfolio of Naveed Abbasi (devnaveedabbasi), a Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    url: "https://naveedabbasi.vercel.app/",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/meee2.png",
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
    title: "Naveed Abbasi | Web Developer | Full Stack Developer",
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


export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',   // ✅ add this
});

export const openSans = Open_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans', // ✅ add this
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Official portfolio of Naveed Abbasi, also known as devnaveedabbasi." />

    
          {/* ✅ Google Site Verification Tag */}
          <meta
            name="google-site-verification"
            content="GLRNA_RX2DGYY9zeHaVbOA8BV2TGzG2eUQ37qLffT"
          />
          <meta name="author" content="Naveed Abbasi (devnaveedabbasi)" />
          <meta
            name="keywords"
            content="Naveed Abbasi, devnaveedabbasi, Naveed Abbasi developer, Naveed Abbasi web developer, developer, web developer, full stack web developer, frontend developer, backend developer, MERN Stack Developer, React Developer, Next.js Developer"
          />
          <meta
            name="description"
            content="Official portfolio of Naveed Abbasi (devnaveedabbasi) - Full Stack Developer specializing in React, Next.js, Node.js & MongoDB."
          />
          <meta name="robots" content="index, follow" />
        </head>
        <body
        className={`${poppins.variable} ${openSans.variable} antialiased`}>

         {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
        
          <Layout>
            {children}
            {/* ✅ Load SpeedInsights only in production */}
            {shouldShowSpeedInsights() && <SpeedInsights />}
          </Layout>
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
                  "devnaveedabbasi",
                  "Naveed",
                  "Naveed Hassan",
                  "Naveed Abbasi",
                  "Naveed Developer",
                ],
                url: "https://naveedabbasi.vercel.app",
                image: [
                  "https://naveedabbasi.vercel.app/assets/img/NaveedAbbasi.png",
                  "https://naveedabbasi.vercel.app/assets/img/meee2.png",
                  "https://naveedabbasi.vercel.app/assets/img/NaveedAbbasi.png",
                  "https://naveedabbasi.vercel.app/assets/img/consultation.png",
                  "https://naveedabbasi.vercel.app/assets/img/portfolio.png",
                ],
                jobTitle: [
                  "Full Stack Developer",
                  "Full Stack Web Developer",
                  "Web Developer",
                  "Frontend Developer",
                  "Backend Developer",
                  "ReactJs Developer",
                  "Nodejs Developer",
                  "JavaScript Developer",
                  "TypeScript Developer",
                  "MERN Stack Developer",
                  "Software Engineer",
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Naveed Abbasi Portfolio",
              alternateName: "devnaveedabbasi",
              url: "https://naveedabbasi.vercel.app",
              publisher: {
                "@type": "Person",
                name: "Naveed Abbasi",
              },
              }),
            }}
          />
        </body>
      </html>
    </StoreProvider>
  );
}
