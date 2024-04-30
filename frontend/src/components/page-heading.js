/**
 * This is just a page heading which is shared by the article and quiz pages since their layout is so similar
 * @param {{title: string, description: string}} props The title and description of the page
 * @returns {React.JSX.Element}
 */
export function PageHeading({ title, description }) {
  return (
    <div role="heading" className="flex flex-col mb-10">
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold">
        {title}
      </h1>
      <p
        role="doc-subtitle"
        className="text-foreground/70 text-span-sm md:text-span-md lg:text-span-lg"
      >
        {description}
      </p>
    </div>
  );
}
