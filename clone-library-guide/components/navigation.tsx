import Link from "next/link";
import { LibraryLogo } from "./library-logo";

export function Navigation() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-sm">
      <Link className="flex items-center gap-2" href="/">
        <LibraryLogo />
      </Link>
      <div className="flex items-center gap-4">
        <Link
          className="font-medium text-foreground text-sm transition-colors hover:text-foreground/80"
          href="#"
        >
          Talk to us
        </Link>
        <Link
          className="rounded-lg bg-[#8751E6] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#7040c9]"
          href="#"
        >
          Get early access
        </Link>
      </div>
    </nav>
  );
}
