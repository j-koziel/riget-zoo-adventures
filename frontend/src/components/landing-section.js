/**
 * This is the first page that people will see when they enter the site.
 * Just has a video in the background and a link to book zoo tickets
 * @returns {React.JSX.Element}
 */
export function LandingSection() {
  return (
    <div className="min-h-screen">
      <video
        id="home-video"
        src="/home-video.mp4"
        muted
        autoPlay
        loop
        className="h-screen w-full object-cover opacity-60 relative"
      />
      <div className="h-full w-full absolute top-0 flex flex-col items-center justify-center">
        <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold transition-all text-center">
          Experience wildlife like never before
        </h1>
        <a
          href="/booking/zoo"
          className="text-lg md:text-xl lg:text-3xl underline transition-all hover:text-primary"
        >
          Visit RZA today
        </a>
      </div>
    </div>
  );
}
