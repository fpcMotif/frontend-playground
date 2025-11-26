export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-32">
      {/* Large watermark text */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="font-serif text-[20rem] text-gray-100 leading-none tracking-tighter md:text-[30rem]">
          library
        </span>
      </div>

      {/* Dashed border lines */}
      <div className="absolute top-1/4 right-0 left-0 border-gray-200 border-t border-dashed" />
      <div className="absolute right-0 bottom-1/4 left-0 border-gray-200 border-t border-dashed" />
      <div className="absolute top-0 bottom-0 left-1/4 border-gray-200 border-l border-dashed" />
      <div className="absolute top-0 right-1/4 bottom-0 border-gray-200 border-l border-dashed" />

      {/* Social icon */}
      <div className="absolute right-8 bottom-8">
        <a
          className="text-gray-400 transition-colors hover:text-gray-600"
          href="https://twitter.com"
          rel="noopener"
          target="_blank"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <title>Twitter</title>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
