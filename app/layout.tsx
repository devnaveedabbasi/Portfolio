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
  title: "Portfolio",
  description: "Naveed Abbasi Portfolio",
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
            content="GLRNA_RX2DGYY9zeHaVbOA8BV2TGzG2eUQ37qLffTas"
          />
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
