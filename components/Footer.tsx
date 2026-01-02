export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-[color:var(--muted)]">
        © {new Date().getFullYear()} Kavkaz Vector
      </div>
    </footer>
  );
}
