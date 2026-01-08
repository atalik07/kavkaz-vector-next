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
              className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
            >
              {copy.about.ctaMore}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:shadow-none">
          <div className="text-base font-semibold tracking-tight text-black dark:text-white">
            {copy.terms.title}
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

      {/* LOGISTICS */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.logistics.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.logistics.title}</h3>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {copy.logistics.items.map((text) => (
          <div
            key={text}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none"
          >
            <div className="text-sm text-black/70 dark:text-white/70">{text}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.faq.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.faq.title}</h3>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {copy.faq.items.map((q) => (
          <details
            key={q.q}
            className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm open:shadow-md dark:border-white/15 dark:bg-white/5 dark:shadow-none"
          >
            <summary className="cursor-pointer list-none text-base font-semibold tracking-tight">
              {q.q}
            </summary>
            <div className="mt-3 text-sm text-black/70 leading-relaxed dark:text-white/70">{q.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
