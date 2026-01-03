import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
<header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/20 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#hero" className="flex items-center gap-3 text-white">
            <img
              src="/images/logo.svg"
              alt="Кавказский вектор"
              className="h-8 w-8"
            />
            <span className="font-semibold tracking-tight">Kavkaz Vector</span>
          </a>


        <nav className="flex gap-4 text-sm text-white/85">
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#tours">
            Tours
          </a>
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#about">
            About
          </a>
          <a className="rounded-md px-2 py-1 hover:text-white hover:bg-white/10 transition-colors" href="#contacts">
            Contacts
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
