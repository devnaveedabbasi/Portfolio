import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/constant/data";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { shouldShowSpeedInsights } from "@/utlis/environment";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SmoothCursor } from "@/components/ui/SmoothCursor";
import { Chatbot } from "@/components/ui/Chatbot";

const codeFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-code",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#040c1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://naveedabbasi.vercel.app"),
  title: `${personalInfo.name} | Full Stack Developer | devnaveedabbasi`,
  description:
    "Official portfolio of Naveed Abbasi (devnaveedabbasi) — Full Stack Developer specializing in Next.js, React, Node.js, TypeScript, and high-performance cloud architectures.",
  keywords: [
    "Naveed Abbasi",
    "devnaveedabbasi",
    "Naveed Abbasi developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Pakistan Web Developer",
    "Remote Software Engineer",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: `${personalInfo.name} | Full Stack Developer`,
    description:
      "Engineering scalable web applications, modern component design systems, and robust backend microservices.",
    url: "https://naveedabbasi.vercel.app/",
    siteName: "Naveed Abbasi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | Full Stack Developer`,
    description:
      "Engineering scalable web applications, modern component systems, and robust backend microservices.",
    creator: "@devnaveedabbasi",
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
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    alternateName: ["devnaveedabbasi", "Naveed Developer"],
    url: "https://naveedabbasi.vercel.app",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/devnaveedabbasi",
      "https://www.linkedin.com/in/naveed-abbasi",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Naveed Abbasi Portfolio",
    alternateName: "devnaveedabbasi",
    url: "https://naveedabbasi.vercel.app",
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
    },
  };

  return (
    <html
      lang="en"
      className={codeFont.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Clash Display and Satoshi, served by Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* requested separately: the combined URL returns a different body font */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="google-site-verification"
          content="GLRNA_RX2DGYY9zeHaVbOA8BV2TGzG2eUQ37qLffT"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className={`font-sans bg-[var(--bg-page)] text-[var(--text-primary)] antialiased transition-colors duration-200`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <SmoothCursor />
            {children}
            <Chatbot />
            {shouldShowSpeedInsights() && <SpeedInsights />}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
