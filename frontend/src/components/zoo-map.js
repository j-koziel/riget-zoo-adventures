export function ZooMap() {
  return (
    <div className="min-h-screen p-10">
      <div>
        <h1 className="font-bold text-5xl">Zoo Map</h1>
        <p role="doc-subtitle">Find out how to get around our Zoo</p>
      </div>
      <img src="/zoo-map.webp" alt="A map of the zoo" className="p-14" />
      <div className="bg-destructive p-4 rounded-md">
        <p className="text-destructive-foreground font-bold">
          DISCLAIMER: A zoo map for RZA was not provided and the London Zoo map
          is being used here only as a placeholder
        </p>
      </div>
    </div>
  );
}
