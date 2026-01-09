import { copy } from "@/lib/copy";

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* ABOUT / PRODUCTION */}
      <div data-reveal="up">
        <Eyebrow>{copy.about.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.about.title}</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
          <div className="space-y-4 text-sm text-black/70 leading-relaxed dark:text-white/70">
            {copy.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={copy.about.ctaHref}
              className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
            >
              {copy.about.ctaMore}
            </a>
          </div>
        </div>

        <div className="ui-card border border-black/10 bg-black/[0.02] p-6 shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:shadow-none">
          <div className="text-base font-semibold tracking-tight text-black dark:text-white">
            {/* {copy.terms.title} */}
          </div>
          <ul className="mt-4 space-y-3 text-sm text-black/70 dark:text-white/70">
            {copy.terms.items.slice(0, 5).map((it) => (
              <li key={it.title}>
                <div className="font-semibold text-black dark:text-white">{it.title}</div>
                <div className="mt-1">{it.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
