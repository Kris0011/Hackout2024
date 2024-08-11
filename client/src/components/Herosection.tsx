
const HeroSection = () => {
  

  return (
    <div>
      <section
        className="relative isolate px-6 pt-14 lg:px-8 flex bg-cover"
      >
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:pb-56 lg:pt-32">
          <div className="text-center px-10 py-20 h-full w-full bg-gray-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
            <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
              Cultivating a Brighter Future for Agriculture
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways." – John F. Kennedy
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/detection/crop"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Select Fertilizer
              </a>
              <a
                href="/docs"
                className="text-sm font-semibold leading-6 text-gray-300"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </section>
    </div>
  );
};

export default HeroSection;
