// Temporary page to review the animated stack section before it goes on the home page.
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { StackAnimated } from "@/components/sections/StackAnimated";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <p className="flex h-[75vh] items-center justify-center px-6 text-center text-lg text-[var(--text-muted)]">
          Dheere dheere neeche scroll karein
        </p>
        <StackAnimated />
        <div className="h-[60vh]" />
      </main>
    </div>
  );
}
