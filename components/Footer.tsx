import { copy } from "@/lib/copy";

export default function Footer() {
  const year = new Date().getFullYear();
  const copyright = copy.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-black/70 dark:text-white/70">
          <div className="font-semibold text-black dark:text-white">{copy.brand.name}</div>
          <div className="mt-1">{copyright}</div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={copy.contacts.social.telegram.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--accent)]"
          >
            {copy.contacts.social.telegram.label}
          </a>

          <a href={copy.contacts.links.emailHref} className="hover:text-[color:var(--accent)]">
            {copy.contacts.values.email}
          </a>

          <a href={copy.footer.links.privacy.href} className="hover:text-[color:var(--accent)]">
            {copy.footer.links.privacy.label}
          </a>

          <a href={copy.footer.links.personalData.href} className="hover:text-[color:var(--accent)]">
            {copy.footer.links.personalData.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
