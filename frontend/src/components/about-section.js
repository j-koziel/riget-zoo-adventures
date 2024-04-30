import { AboutItem } from "./about-item";

/**
 * The whole about section of the home page with the about cards
 *
 * @returns {React.JSX.Element}
 */
export function AboutSection() {
  // An array holding all the about section information
  const aboutItems = [
    {
      title: "Where are we?",
      content: "This is our address: Outer Cir, London, NW1 4RY",
      imageSrc: "/tiger.jpg",
      imageAlt: "Tiger in the grass in the daytime",
    },
    {
      title: "What exhibits do we have?",
      content:
        "We have a range of exhibits starting with monkeys and meerkats going all the way up to tigers and lions",
      imageSrc: "/panda.jpg",
      imageAlt: "A panda eating bamboo",
    },
    {
      title: "How are we different?",
      content:
        "We are different in many ways but our main outstanding aspect is the technology that we have incorporated into our experience. Not only will you enjoy it on site but also off site",
      imageSrc: "/macaw.jpg",
      imageAlt: "A blue and yellow macaw perching on a log",
    },
  ];

  return (
    <div className="min-h-screen p-10" id="about">
      <div>
        <h1 className="text-5xl font-bold">About</h1>
        <p role="doc-subtitle" className="opacity-70 mb-7">
          Find out what RZA is all about
        </p>
      </div>

      <div className="p-10 flex flex-col items-center justify-center gap-y-4">
        {aboutItems.map((item, i) => (
          <AboutItem
            key={i}
            aboutOptions={item}
            index={i}
            totalItems={aboutItems.length}
          />
        ))}
      </div>
    </div>
  );
}
