import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutProfileSection } from "@/components/sections/AboutProfileSection";
import { AboutBentoSection } from "@/components/sections/AboutBentoSection";
import { TickerRibbon } from "@/components/sections/TickerRibbon";
import { StackSection } from "@/components/sections/StackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FaqContactSection } from "@/components/sections/FaqContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutProfileSection />
        <AboutBentoSection />
        <TickerRibbon />
        <StackSection />
        <ProjectsSection />
        <CertificationsSection />
        <ExperienceSection />
        <FaqContactSection />
      </main>
      <Footer />
    </div>
  );
}
