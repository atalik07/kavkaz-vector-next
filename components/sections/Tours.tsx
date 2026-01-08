import { copy } from "@/lib/copy";

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
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

export default function Tours() {
  const tgHref = copy.contacts.social.telegram.href;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* SERVICES (бывший каталог) */}
      <div data-reveal="up">
        <Eyebrow>{copy.tours.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.tours.title}</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.tours.items.map((it) => (
          <Card key={it.id} title={it.title} text={it.desc} />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-6 text-sm text-black/70 dark:border-white/15 dark:bg-white/[0.06] dark:text-white/70">
        <div className="font-semibold text-black dark:text-white">{copy.tours.bottomText}</div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={tgHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
          >
            {copy.tours.ctaMore}
          </a>
          <a
            href="#contacts"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-6 text-sm font-semibold transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
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

      {/* SEGMENTS */}
      <div className="mt-14" data-reveal="up">
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.segments.title}</h3>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {copy.segments.items.map((it) => (
          <Card key={it.title} title={it.title} text={it.text} />
        ))}
      </div>

      {/* STEPS */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.steps.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.steps.title}</h3>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {copy.steps.items.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-black/50 dark:text-white/60">
              Шаг {i + 1}
            </div>
            <div className="mt-2 text-base font-semibold tracking-tight">{s.title}</div>
            <div className="mt-2 text-sm text-black/70 leading-relaxed dark:text-white/70">{s.text}</div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <a
          href={tgHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
        >
          {copy.steps.cta}
        </a>
      </div>

      {/* TERMS */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.terms.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.terms.title}</h3>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.terms.items.map((it) => (
          <Card key={it.title} title={it.title} text={it.text} />
        ))}
      </div>
    </section>
  );
}
