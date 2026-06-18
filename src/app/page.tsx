import Hero from "@/components/sections/hero"
import AboutSection from "@/components/sections/about-section"
import SkillSection from "@/components/sections/skill-section"
import ProjectSection from "@/components/sections/project-section"
import ContactSection from "@/components/sections/contact-section"
import { ScrollContainer } from "@/components/layout/scroll-container"
import SelectLanguage from "@/components/select-language"

export default function Home() {
  return (
    <>
      <ScrollContainer>
        <Hero />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <ContactSection />
      </ScrollContainer>
      <SelectLanguage />
    </>
  )
}
