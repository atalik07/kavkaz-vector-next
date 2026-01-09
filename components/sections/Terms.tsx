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

export default function Terms() {
  const tgHref = copy.contacts.social.telegram.href;

return (
  <>
    {/* TOP full-bleed banner */}
    <section className="w-full bg-black/[0.03] dark:bg-white/[0.05]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14" data-reveal="up">
<p className="subhead text-zinc-950/80 dark:text-white/85 uppercase tracking-[0.09em] leading-snug text-lg sm:text-xl">
  {copy.terms.lead}
</p>

      </div>
    </section>

    {/* MAIN content (как было) */}
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">

{/* SEGMENTS intro */}
<div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-12" data-reveal="up">
  <h2 className="subhead font-extrabold text-zinc-950 dark:text-white uppercase tracking-[0.09em] leading-snug text-2xl sm:text-3xl lg:text-right lg:justify-self-end lg:max-w-[28rem]">
    {copy.terms.introTitle}
  </h2>

  <p className="text-base tracking-[0.02em] text-black/70 leading-relaxed dark:text-white/70 lg:text-left lg:justify-self-start lg:max-w-[30rem]">
    {copy.terms.introText}
  </p>
</div>


{/* SEGMENTS items */}
<div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
  {copy.segments.items.map((it) => (
    <Card key={it.title} title={it.title} text={it.text} />
  ))}
</div>


      {/* STEPS */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.steps.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {copy.steps.title}
        </h3>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {copy.steps.items.map((s, i) => (
          <li
            key={s.title}
            className="ui-card border border-black/10 bg-white p-5 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none"
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
          className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
        >
          {copy.steps.cta}
        </a>
      </div>

      {/* TERMS items */}
      <div className="mt-14" data-reveal="up">
        <Eyebrow>{copy.terms.itemsEyebrow}</Eyebrow>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.terms.items.map((it) => (
          <Card key={it.title} title={it.title} text={it.text} />
        ))}
      </div>
    </section>
  </>
);

}
