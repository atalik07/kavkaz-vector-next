import { copy } from "@/lib/copy";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-[color:var(--muted)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {copy.footer.copyright.replace("{year}", String(year))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8 sm:justify-end">
            <a
              href={copy.footer.links.privacy.href}
              className="text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              {copy.footer.links.privacy.label}
            </a>

            <a
              href={copy.footer.links.personalData.href}
              className="text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              {copy.footer.links.personalData.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
