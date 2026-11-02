import CenturySection from "@/components/CenturySection";
import ExperienceRoot from "@/components/ExperienceRoot";
import IntroScene from "@/components/IntroScene";
import SiteFooter from "@/components/SiteFooter";
import StoryScene from "@/components/StoryScene";

export default function Home() {
  return (
    <main id="top">
      <ExperienceRoot>
        <IntroScene />
        <CenturySection />
        <StoryScene />
        <SiteFooter />
      </ExperienceRoot>
    </main>
  );
}
