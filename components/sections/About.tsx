import { copy } from "@/lib/copy";
import { ButtonLink } from "@/components/Button"; // если хочешь как в Hero, иначе <a>

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
      <div className="pl-10" data-reveal="up">
        <Eyebrow>{copy.about.eyebrow}</Eyebrow>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* LEFT: image with subtle frame */}
        <div className="overflow-hidden rounded-[0.4rem] border border-zinc-900/15 bg-white/65 p-[6px] dark:border-white/10 dark:bg-black/[0.02]">
          <div className="overflow-hidden rounded-[0.4rem]">
            <img
              src="/images/freework.jpg"
              alt="Производство"
              className="block w-full object-cover rounded-[0.4rem] aspect-[3/4] sm:aspect-[4/5]"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT: text */}
        <div className="lg:flex lg:items-stretch">
          <div className="py-4 lg:py-4 space-y-5 text-sm leading-relaxed text-black/70 dark:text-white/70">
            {copy.about.paragraphs.map((p, i) => {
              const isLast = i === copy.about.paragraphs.length - 1;

              return (
                <p key={i}>
                  {p}
                  {isLast && (
                    <>
                      {" "}
                      <span className="font-semibold text-[color:var(--accent)]/80">
                        {copy.about.closingAccent}
                      </span>
                    </>
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>

{/* CTA PANEL (same look as in Terms screenshot) */}
<div
  className="mt-10 ui-card border border-black/10 bg-[#ddd6cc]/30 p-6 text-sm text-black/70 dark:border-white/15 dark:bg-[#2d2f31]/50 dark:text-white/70 sm:p-8"
  style={{ borderRadius: "var(--radius-card)" }}
  data-reveal="up"
>
  <div className="text-lg sm:text-xl font-semibold tracking-[0.02em] leading-snug text-zinc-950 dark:text-white whitespace-pre-line">
    {copy.about.ctaPanel.text}
  </div>

  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
    {copy.about.ctaPanel.tgHref ? (
      <a
        href={copy.about.ctaPanel.tgHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
      >
        {copy.about.ctaPanel.button}
      </a>
    ) : (
      <button
        type="button"
        // disabled
        // title={copy.about.ctaPanel.tgHint}
        className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black opacity-60 cursor-not-allowed"
      >
        {copy.about.ctaPanel.button}
      </button>
    )}
  </div>
</div>

    </section>
  );
}
