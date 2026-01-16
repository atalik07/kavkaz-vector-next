import { copy } from "@/lib/copy";

export default function Footer() {
  const year = new Date().getFullYear();
  const copyright = copy.footer.copyright.replace("{year}", String(year));

  return (
<footer className="w-full border-t border-black/10 bg-[#ddd6cc]/60 py-10 sm:py-7 lg:py-6 dark:border-white/15 dark:bg-[#2d2f31]/90">


    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">

        <div className="text-base tracking-[0.02em] text-black/70 dark:text-white/70">{copyright}</div>

        <div className="flex flex-wrap justify-center gap-5 sm:justify-end sm:gap-6 text-base">
          <a
            href={copy.footer.links.privacy.href}
            className="text-black/70 hover:text-[color:var(--accent)] dark:text-white/70"
          >
            {copy.footer.links.privacy.label}
          </a>

          <a
            href={copy.footer.links.personalData.href}
            className="text-black/70 hover:text-[color:var(--accent)] dark:text-white/70"
          >
            {copy.footer.links.personalData.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
