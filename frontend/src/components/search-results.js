import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

/**
 * Renders all the search results (either quiz or article search results)
 * @param {{results: React.JSX.Element[]}} props
 * @returns {React.JSX.Element}
 */
export function SearchResults({ results }) {
  return (
    <div id="search-results">
      <Carousel className="hidden md:block">
        <CarouselContent className="-ml-2 md:-ml-4">
          {results.map((result, i) => (
            <CarouselItem key={i} className="pl-2 md:pl-4 max-w-[300px]">
              {result}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex flex-col gap-y-2 md:hidden">{results}</div>
    </div>
  );
}
