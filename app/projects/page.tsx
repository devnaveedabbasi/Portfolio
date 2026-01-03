// app/projects/page.tsx - SERVER COMPONENT
import ProjectsClient from './ProjectClient';
import { PortfolioData } from "@/constant/data";

export default function ProjectsPage() {

  return <ProjectsClient portfolioData={PortfolioData} />;
}