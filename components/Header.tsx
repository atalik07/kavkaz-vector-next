import ThemeToggle from "@/components/ThemeToggle";
import { copy } from "@/lib/copy";

export default function Header() {
  return (
<header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/20 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#hero" className="flex items-center gap-3 text-white">
            <img
              src="/images/logo.svg"
              alt={`${copy.brand.name} ${copy.brand.tagline}`}
              className="h-9 w-9"
            />
            <span className="flex flex-col">
              <span className="block text-base font-semibold tracking-tight text-white leading-none">
                {copy.brand.name}
              </span>
              <span className="block text-base font-semibold tracking-tight text-white leading-none">
                {copy.brand.tagline}
              </span>
            </span>
          </a>

        <nav className="flex gap-4 text-sm text-white/85">
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#tours">
            {copy.nav.tours}
          </a>
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#about">
            {copy.nav.about}
          </a>
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#contacts">
            {copy.nav.contacts}
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
