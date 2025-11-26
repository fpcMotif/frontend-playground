export function FigmaSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-light text-4xl text-foreground md:text-5xl">
            Built for
          </span>
          <div className="flex items-center gap-3 rounded-xl bg-black px-4 py-2 text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 38 57">
              <title>Figma Logo</title>
              <path
                d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                fill="#1ABCFE"
              />
              <path
                d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                fill="#0ACF83"
              />
              <path
                d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                fill="#FF7262"
              />
              <path
                d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                fill="#F24E1E"
              />
              <path
                d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                fill="#A259FF"
              />
            </svg>
            <span className="font-medium text-2xl">Figma</span>
          </div>
        </div>
        <p className="max-w-xl text-gray-600 text-lg leading-relaxed md:text-xl">
          Generate component docs, descriptions, and usage examples — straight
          from your source of truth.
        </p>
      </div>
    </section>
  );
}
