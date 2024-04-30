import React from "react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

export function InteractiveExperience() {
  const [currAnimalIdx, setCurrAnimalIdx] = React.useState(0);
  const [pageState, setPageState] = React.useState("start-experience");

  const animals = [
    {
      img_src: "/meerkat.jpg",
      color: "#DAA06D",
      name: "Meerkat",
      scientific_name: "Suricata, suricatta",
      found_in: "Africa",
      lifespan: "10 - 14 years",
      lifestyle: "Diurnal",
      most_distinctive_feature: "Dark bands around eyes and white face",
      group: "Mammal",
      skin_type: "Fur",
      top_speed: "20 mph",
      weight: "600g - 975g (1.3lbs - 2.1lbs)",
      height: "25cm - 35cm (10in - 14in)",
    },
    {
      name: "Cheetah",
      color: "#F3CF06",
      img_src: "/cheetah.jpg",
      scientific_name: "Acinonyx jubatus",
      found_in: "Africa",
      lifespan: "10 - 12 years",
      lifestyle: "Diurnal",
      most_distinctive_feature: "Yellowish fur covered in small black spots",
      group: "Mammal",
      skin_type: "Fur",
      top_speed: "70 mph",
      weight: "40kg - 65kg (88lbs - 140lbs)",
      height: "115cm - 136cm (45in - 53in)",
    },
    {
      name: "Lion",
      color: "#FFD800",
      img_src: "/lion.jpg",
      scientific_name: "Panthera leo",
      found_in: "Africa",
      lifespan: "8 - 15 years",
      lifestyle: "Diurnal/Nocturnal",
      most_distinctive_feature:
        "Long and thick hairy mane of the male around the face",
      group: "Mammal",
      skin_type: "Fur",
      top_speed: "35 mph",
      weight: "120kg - 249kg (264lbs - 550lbs)",
      height: "1.4m - 2.5m (4.7ft - 8.2ft)",
    },
    {
      name: "Tiger",
      color: "#C96C16",
      img_src: "/tiger-interactive.jpg",
      scientific_name: "Suricata, suricatta",
      found_in: "Africa",
      lifespan: "10 - 14 years",
      lifestyle: "Diurnal",
      most_distinctive_feature: "Dark bands around eyes and white face",
      group: "Mammal",
      skin_type: "Fur",
      top_speed: "20 mph",
      weight: "600g - 975g (1.3lbs - 2.1lbs)",
      height: "25cm - 35cm (10in - 14in)",
    },
    {
      name: "Turtle",
      color: "#10AAEC",
      img_src: "/turtle.jpg",
      scientific_name: "Dermochelys coriacea",
      found_in: "Africa",
      lifespan: "up to 50 years",
      lifestyle: "",
      most_distinctive_feature: "Leather-like skin",
      group: "Ridley",
      skin_type: "Leather",
      top_speed: "6 mph",
      weight: "500 pounds to over 1 ton",
      height: "7-8 feet",
    },
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setCurrAnimalIdx((prevIdx) =>
        prevIdx === animals.length - 1 ? 0 : prevIdx + 1
      );
    }, 10000);

    return () => {};
  }, [currAnimalIdx]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {pageState === "start-experience" ? (
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Start your experience</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  This is just a demonstration
                </AlertDialogTitle>
                <AlertDialogDescription>
                  No bluetooth functionality has actually been implemented as
                  this will need to be made in collaboration with the RZA
                  infrastructure staff
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gp-x-2">
                <AlertDialogAction onClick={() => setPageState("experience")}>
                  Start
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div>
          <div
            className={cn(
              `bg-[${animals[currAnimalIdx].color}]`,
              "h-1/2 w-full flex flex-col items-center justify-center pt-24"
            )}
          >
            <img
              src={animals[currAnimalIdx].img_src}
              alt="An animal"
              width={200}
              height={200}
            />
            <p className="text-background font-bold">
              You are now in the {animals[currAnimalIdx].name} habitat!!!
            </p>
          </div>
          <div className="flex flex-col p-10">
            <h1 className="self-start text-h1-sm md:text-h1-md lg:text-h1-lg font-bold">
              Details
            </h1>
            <div className="grid grid-cols-2 grid-rows-5 gap-4 ">
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Scientific Name</h3>
                <p>{animals[currAnimalIdx].scientific_name}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Found In</h3>
                <p>{animals[currAnimalIdx].found_in}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Lifespan</h3>
                <p>{animals[currAnimalIdx].lifespan}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Lifestyle</h3>
                <p>{animals[currAnimalIdx].lifestyle}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Distinctive Feauture</h3>
                <p>{animals[currAnimalIdx].most_distinctive_feature}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Group</h3>
                <p>{animals[currAnimalIdx].group}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Skin Type</h3>
                <p>{animals[currAnimalIdx].skin_type}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Top Speed</h3>
                <p>{animals[currAnimalIdx].top_speed}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Weight</h3>
                <p>{animals[currAnimalIdx].weight}</p>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <h3 className="font-bold">Height</h3>
                <p>{animals[currAnimalIdx].height}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
