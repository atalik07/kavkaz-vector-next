export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="font-semibold tracking-tight">
          Kavkaz Vector
        </a>

        <nav className="flex gap-4 text-sm">
          <a className="hover:underline" href="#tours">Tours</a>
          <a className="hover:underline" href="#about">About</a>
          <a className="hover:underline" href="#contacts">Contacts</a>
        </nav>
      </div>
    </header>
  );
}
