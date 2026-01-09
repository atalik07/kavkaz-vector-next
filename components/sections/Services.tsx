import { copy } from "@/lib/copy";

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="ui-card border border-black/10 bg-white p-5 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
      <div className="text-base font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-black/70 leading-relaxed dark:text-white/70">{text}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

export default function Services() {
  const tgHref = copy.contacts.social.telegram.href;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div data-reveal="up">
        <Eyebrow>{copy.tours.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.tours.title}</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.tours.items.map((it) => (
          <Card key={it.id} title={it.title} text={it.desc} />
        ))}
      </div>

      <div className="mt-8 ui-card border border-black/10 bg-black/[0.02] p-6 text-sm text-black/70 dark:border-white/15 dark:bg-white/[0.06] dark:text-white/70">
        <div className="font-semibold text-black dark:text-white">{copy.tours.bottomText}</div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={tgHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
          >
            {copy.tours.ctaMore}
          </a>
          <a
            href="#contacts"
            className="inline-flex h-11 items-center justify-center ui-btn border border-black/15 px-6 text-sm font-semibold transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            {copy.hero.ctaSecondary}
          </a>
        </div>
        <div className="mt-3">
          <a href={tgHref} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-80">
            {copy.tours.bottomLink}
          </a>
        </div>
      </div>
    </div>
  );
}
