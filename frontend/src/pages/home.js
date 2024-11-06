import { HomeSections } from "../components/home-sections";
import { LandingSection } from "../components/landing-section";
import { AboutSection } from "../components/about-section";
import { ZooMap } from "../components/zoo-map";

export function Home() {
  // Array holding all the sections of the home page
  const homeSections = [
    <LandingSection key={0} />,
    <AboutSection key={1} />,
    <ZooMap key={2} />,
  ];

  return (
    <div id="home-container">
      <HomeSections sections={homeSections} />
    </div>
  );
}
