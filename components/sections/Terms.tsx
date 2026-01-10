import { copy } from "@/lib/copy";

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="ui-card border border-black/10 bg-white p-5 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
      <div className="text-base font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-black/70 leading-relaxed dark:text-white/70">
        {text}
      </div>
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

function TelegramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M9.04 15.47 8.86 19.4c.44 0 .63-.19.86-.41l2.06-1.97 4.27 3.12c.78.43 1.34.2 1.54-.72l2.79-13.11c.25-1.16-.42-1.62-1.2-1.33L2.63 9.27c-1.12.44-1.1 1.07-.19 1.35l4.56 1.42 10.6-6.69c.5-.31.96-.14.58.17L9.04 15.47Z"
      />
    </svg>
  );
}

export default function Terms() {
  const tgHref = copy.contacts.social.telegram.href;
  const catalogHref = copy.catalog?.href ?? "/catalog";

  return (
    <>
      {/* TOP full-bleed banner */}
      <section className="w-full bg-[#ddd6cc]/30 dark:bg-[#2d2f31]/50">
        <div
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14"
          data-reveal="up"
        >
          <p className="subhead text-zinc-950/80 dark:text-white/85 uppercase tracking-[0.09em] leading-snug text-lg sm:text-xl">
            {copy.terms.lead}
          </p>
        </div>
      </section>

      {/* MAIN content */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {/* SIMPLE: badge+text, then badge+text */}
        <div className="mt-4 space-y-10" data-reveal="up">
          {/* BLOCK 1 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            {/* LEFT title */}
            <div className="lg:justify-self-end lg:max-w-[28rem]">
              <h2 className="subhead font-extrabold text-zinc-950 dark:text-white uppercase tracking-[0.09em] leading-snug text-2xl sm:text-3xl lg:text-right">
                {copy.terms.introTitle}
              </h2>
            </div>

            {/* RIGHT text */}
            <div className="lg:justify-self-start lg:max-w-[30rem]">
              <p className="text-base tracking-[0.02em] text-black/70 leading-relaxed dark:text-white/70">
                {copy.terms.introText}
              </p>
            </div>
          </div>

          {/* subtle divider between blocks */}
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          {/* BLOCK 2 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            {/* LEFT label (bigger) */}
            <div className="lg:justify-self-end lg:max-w-[28rem] lg:text-right">
              <div className="text-xl sm:text-2xl font-semibold uppercase tracking-[0.14em] text-black/60 dark:text-white/70">
                {copy.segments.kicker}
              </div>
            </div>

            {/* RIGHT list */}
            <div className="lg:justify-self-start lg:max-w-[30rem]">
              <ul className="space-y-4 tracking-[0.02em]">
                {copy.segments.items.slice(0, 2).map((it) => (
                  <li key={it.title} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-black/60 dark:text-white/60">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <div>
                      <div className="text-base font-semibold tracking-[0.02em] text-zinc-950 dark:text-white">
                        {it.title}
                      </div>
                      <div className="mt-1 text-sm tracking-[0.02em] text-black/70 leading-relaxed dark:text-white/70">
                        {it.text}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* STEPS (wrapped in a single card/panel) */}
<section
  className="mt-14 ui-card border border-black/10 bg-[#ddd6cc]/30 p-6 shadow-none dark:border-white/15 dark:bg-[#2d2f31]/50 dark:shadow-none sm:p-8"
  style={{ borderRadius: "var(--radius-card)" }}
  data-reveal="up"
>

          <Eyebrow>{copy.steps.eyebrow}</Eyebrow>

          <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {copy.steps.title}
          </h3>

          <ol className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
            {copy.steps.items.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <div
                  className="shrink-0 text-black/25 dark:text-white/20"
                  aria-hidden="true"
                >
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 80 80"
                    className="h-18 w-18"
                  >
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="56"
                      fontWeight="900"
                      fill="currentColor"
                    >
                      {i + 1}
                    </text>
                  </svg>
                </div>

                <div>
                  <div className="text-base font-semibold tracking-tight">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm text-black/70 leading-relaxed dark:text-white/70">
                    {s.text}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* divider before CTAs */}
          <div className="mt-8 h-px w-full bg-black/10 dark:bg-white/10" />

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={tgHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
            >
              <TelegramIcon className="h-4 w-4" />
              {copy.steps.cta}
            </a>

            <a
              href={catalogHref}
              className="inline-flex h-11 items-center justify-center ui-btn border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-black/[0.03] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/[0.08]"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              {copy.steps.catalog}
            </a>
          </div>
        </section>

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
