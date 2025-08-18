import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/storeProvider";
import Layout from "@/component/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naveed Abbasi | Naveed Hassan | MERN Stack Developer",
  description:
    "Official portfolio of Naveed Abbasi (also known as Naveed Hassan) - MERN Stack Developer, React.js & Next.js Specialist. Explore my projects, skills, and experience in full-stack web development.",
  keywords: [
    "Naveed",
    "Naveed Abbasi",
    "Dev Naveed",
    "Naveed Hassan",
    "Naveed Abbasi Portfolio",
    "Naveed Hassan Portfolio",
    "Frontend Developer Naveed Abbasi",
    "React Developer Naveed Abbasi",
    "Next.js Developer Naveed Abbasi",
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
    title: "Naveed Abbasi | Naveed Hassan | MERN Stack Developer",
    description:
      "Portfolio of Naveed Abbasi (aka Naveed Hassan). MERN Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    url: "https://naveedabbasi.vercel.app/",
    siteName: "Naveed Abbasi Portfolio",
    images: [
      {
        url: "https://naveedabbasi.vercel.app/assets/img/Me.jpg",
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
    title: "Naveed Abbasi | MERN Stack Developer",
    description:
      "Official portfolio of Naveed Abbasi (aka Naveed Hassan) - MERN Stack Developer & React Specialist.",
    creator: "@naveedabbasi",
    images: ["https://naveedabbasi.vercel.app/assets/img/Me.jpg"],
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
            content="Portfolio of Naveed Abbasi (aka Naveed Hassan) - MERN Stack Developer specializing in React, Next.js, Node.js & MongoDB."
          />
          <meta name="robots" content="index, follow" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Layout>{children}</Layout>
        </body>
      </html>
    </StoreProvider>
  );
}
