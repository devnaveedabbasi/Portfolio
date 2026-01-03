// app/about/page.tsx - SERVER COMPONENT
import AboutClient from './AboutClient';
import { educations, experiences } from "@/constant/data";

export default function AboutPage() {
  // Server side par data fetch kar sakte ho
  const PersonalInfo = [
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

  const ExperinceData = [
    { years: 1, exper: "Year of experience" },
    { years: 18, exper: "Completed projects" },
    { years: 12, exper: "Happy customers" },
    { years: 10, exper: "Awards won" },
  ];

  // Static data pass karo client component ko
  return (
    <AboutClient
      personalInfo={PersonalInfo}
      experienceData={ExperinceData}
      educations={educations}
      experiences={experiences}
    />
  );
}