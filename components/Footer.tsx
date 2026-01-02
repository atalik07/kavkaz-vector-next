export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-black/60">
        © {new Date().getFullYear()} Kavkaz Vector
      </div>
    </footer>
  );
}
