/**
 * Renders a card containing information about RZA
 * @param {{aboutOptions: any, index: number, totalItems: number}} props
 * @returns {React.JSX.Element}
 */
export function AboutItem({ aboutOptions, index, totalItems }) {
  const isEven = index % 2 === 0;
  const isLastItem = totalItems - 1 === index;

  return (
    <div
      id="about-item"
      className={`${isEven ? "mr-auto" : "ml-4"} ${
        isEven
          ? "bg-card text-card-foreground"
          : "bg-primary text-primary-foreground"
      } ${
        isLastItem ? "mb-4" : "mb-0"
      } flex flex-col gap-y-2 w-[219px] p-4 rounded-md border-2 border-border md:flex-row md:gap-x-2 md:w-[80%] md:p-0`}
    >
      <img
        src={aboutOptions.imageSrc}
        alt={aboutOptions.imageAlt}
        height={219}
        width={219}
        className="rounded-md md:rounded-l-md"
      />
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold p-2">
          {aboutOptions.title}
        </h2>
        <p className="text-lg md:text-xl p-2">{aboutOptions.content}</p>
      </div>
    </div>
  );
}
