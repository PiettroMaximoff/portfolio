import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { ProjectBento } from "@/components/sections/ProjectBento";
import { StackSection } from "@/components/sections/StackSection";
import { baseOpenGraph, ogImage, siteDescription, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    images: [ogImage],
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectBento />
      <ExperienceSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
