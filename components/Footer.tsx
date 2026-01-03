import { copy } from "@/lib/copy";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-[color:var(--muted)]">
        {copy.footer.copyright.replace("{year}", String(year))}
      </div>
    </footer>
  );
}
