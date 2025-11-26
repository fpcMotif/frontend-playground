import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative px-6 pt-32 pb-16">
      {/* Decorative labels */}
      <div className="absolute top-24 left-1/4 hidden items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-white text-xs lg:flex">
        <span className="font-mono">T</span>
        <span>Helvetica/H1</span>
      </div>
      <div className="absolute top-24 left-[45%] hidden items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1.5 text-xs lg:flex">
        <span className="h-3 w-3 rounded-sm bg-black" />
        <span>Text/Default</span>
      </div>

      {/* Main heading */}
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-serif text-5xl text-foreground tracking-tight md:text-7xl lg:text-8xl">
          A home for your
          <br />
          <span className="italic">design system</span>
        </h1>

        {/* Font label */}
        <div className="mt-4 hidden items-center justify-center gap-2 lg:flex">
          <div className="rounded bg-gray-800 px-3 py-1.5 font-mono text-white text-xs">
            T Reckless/H1
          </div>
        </div>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-gray-600 text-lg leading-relaxed md:text-xl">
          Library helps designers and engineers document and publish their
          design systems.
          <br />
          Made for people. Ready for AI. Built for the future.
        </p>

        {/* CTA Button */}
        <div className="relative mt-8 inline-block">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-[#8751E6] px-8 py-4 font-medium text-lg text-white transition-colors hover:bg-[#7040c9]"
            href="#"
          >
            Get early access
          </Link>
          <div className="-top-2 -right-16 absolute hidden text-gray-500 text-sm lg:block">
            Button
          </div>
        </div>
      </div>
    </section>
  );
}
