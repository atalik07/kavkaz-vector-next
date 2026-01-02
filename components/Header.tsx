import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
<header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/20 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#hero"
          className="font-semibold tracking-tight text-white"
        >
          Kavkaz Vector
        </a>

        <nav className="flex gap-4 text-sm text-[color:var(--muted)]">
          <a className="rounded-md px-2 py-1 hover:text-white" href="#tours">
            Tours
          </a>
          <a className="rounded-md px-2 py-1 hover:text-white" href="#about">
            About
          </a>
          <a
            className="rounded-md px-2 py-1 hover:text-white"href="#contacts">
            Contacts
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
