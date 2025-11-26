import Link from "next/link";

export function CTASection() {
  return (
    <section className="px-6 py-24 text-center">
      <h2 className="font-serif text-4xl text-foreground md:text-6xl lg:text-7xl">
        Ready to <span className="font-bold italic">document?</span>
      </h2>
      <p className="mt-6 text-gray-600 text-lg md:text-xl">
        Built for devs. Beloved by design systems.
      </p>
      <div className="mt-8">
        <Link
          className="inline-flex items-center justify-center rounded-xl bg-[#8751E6] px-8 py-4 font-medium text-lg text-white transition-colors hover:bg-[#7040c9]"
          href="#"
        >
          Get early access
        </Link>
      </div>
    </section>
  );
}
