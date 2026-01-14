// app/(...) or components/About.tsx (wherever your About lives)
"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import HeroRSlider from "@/components/HeroRSlider";

const slideImages = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/logistics.webp"] as const;

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function About() {
  const faqItems = useMemo(() => copy.faq.items, []);
  const [open, setOpen] = useState(false);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<number>(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      const h = Math.ceil(el.scrollHeight);
      setMaxH(h);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, [faqItems.length]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
<div className="pl-10" data-reveal="up">
  <h2 className="subhead font-extrabold uppercase tracking-[0.09em] leading-snug text-zinc-950 dark:text-white text-2xl sm:text-3xl">
    {copy.about.eyebrow}
  </h2>
</div>



      <div className="mt-8">
        {/* MOBILE: one continuous flow */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          <div className="w-full aspect-[3/4]">
            <HeroRSlider
              slides={copy.hero.slides}
              images={slideImages}
              dotsAlign="right"
              className="h-full"
            />
          </div>

          <div className="py-4 space-y-4 text-base tracking-[0.02em] text-black/70 dark:text-white/70">
            {copy.about.top.paragraphs.map((p, i) => (
              <p key={`m-top-p-${i}`}>{p}</p>
            ))}

            <ul className="list-disc pl-5 space-y-2">
              {copy.about.top.listAfterTraderHeader.map((it, i) => (
                <li key={`m-top-li-${i}`}>{it}</li>
              ))}
            </ul>

            {copy.about.top.tailParagraphs.map((p, i) => (
              <p key={`m-top-tail-${i}`}>{p}</p>
            ))}

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 pt-2">
              <Eyebrow>{copy.about.bottom.kicker}</Eyebrow>
              <div className="text-base tracking-[0.02em] text-black/70 dark:text-white/70">
                {copy.about.bottom.lead}
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {copy.about.bottom.columns.map((col, i) => (
                <div key={`m-col-${i}`} className="space-y-3">
                  <div className="pl-5 font-semibold text-zinc-950 dark:text-white">
                    {col.title}
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    {col.items.map((it, j) => (
                      <li key={`m-col-${i}-li-${j}`}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* {copy.about.bottom.afterColumnsParagraphs.map((p, i) => (
              <p key={`m-bottom-after-${i}`}>{p}</p>
            ))} */}

            <p>
              <span className="font-semibold text-[color:var(--accent)]/80">
                {copy.about.closingAccent}
              </span>
            </p>
          </div>
        </div>

        {/* DESKTOP: split layout */}
        <div className="hidden lg:block">
          <div className="space-y-10">
            {/* TOP ROW: slider + clipped right text */}
            <div className="grid grid-cols-2 gap-12 items-stretch">
              <div className="w-full aspect-[3/4]">
                <HeroRSlider
                  slides={copy.hero.slides}
                  images={slideImages}
                  dotsAlign="right"
                  className="h-full"
                />
              </div>

              <div className="h-full overflow-hidden">
                <div className="py-4 space-y-4 text-base tracking-[0.02em] text-black/70 dark:text-white/70">
                  {copy.about.top.paragraphs.map((p, i) => (
                    <p key={`d-top-p-${i}`}>{p}</p>
                  ))}

                  <ul className="list-disc pl-5 space-y-2">
                    {copy.about.top.listAfterTraderHeader.map((it, i) => (
                      <li key={`d-top-li-${i}`}>{it}</li>
                    ))}
                  </ul>

                  {copy.about.top.tailParagraphs.map((p, i) => (
                    <p key={`d-top-tail-${i}`}>{p}</p>
                  ))}

                  <p>
                    <span className="font-semibold text-[color:var(--accent)]/80">
                      {copy.about.closingAccent}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* BOTTOM: kicker+lead, then 3 columns with subtle dividers */}
            <div className="py-4 space-y-6 text-base tracking-[0.02em] text-black/70 dark:text-white/70 lg:px-10">

<div className="text-center">
  <div className="inline-flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
    <Eyebrow>{copy.about.bottom.kicker}</Eyebrow>
    <div className="text-base tracking-[0.02em]">{copy.about.bottom.lead}</div>
  </div>
</div>


              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
                {copy.about.bottom.columns.map((col, idx) => (
                  <div
                    key={`d-col-${idx}`}
                    className={[
                      "space-y-3",
                      "md:px-6",
                      idx === 0 ? "md:pl-0" : "",
                      idx === 2 ? "md:pr-0" : "",
                      idx > 0 ? "md:border-l md:border-black/10 md:dark:border-white/15" : "",
                    ].join(" ")}
                  >
                    <div className="pl-5 font-semibold text-zinc-950 dark:text-white">
                      {col.title}
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      {col.items.map((it, j) => (
                        <li key={`d-col-${idx}-li-${j}`}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CTA PANEL */}
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
              disabled
              className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black opacity-60 cursor-not-allowed"
            >
              {copy.about.ctaPanel.button}
            </button>
          )}
        </div>
      </div>

      {/* FAQ toggle row + slide-down list */}
      <div className="mt-6" data-reveal="up">
        <div className="flex items-center gap-3 text-base font-semibold tracking-[0.04em] text-[color:var(--accent)]/80">
          <span className="whitespace-nowrap">{copy.about.faqToggle.label}</span>

          <span
            aria-hidden="true"
            className="min-w-0 flex-1 opacity-70 dark:opacity-60"
            style={{
              height: 1,
              backgroundImage:
                "repeating-linear-gradient(to right, currentColor 0 4px, transparent 6px 12px)",
            }}
          />

          <button
            type="button"
            aria-expanded={open}
            aria-label={copy.about.faqToggle.aria}
            onClick={() => setOpen((v) => !v)}
            className={[
              "group inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
              "border-[color:var(--accent)]/70 text-[color:var(--accent)]",
              "bg-transparent hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40",
            ].join(" ")}
          >
            <IconChevronDown
              className={[
                "h-5 w-5 transition-transform duration-300 text-current group-hover:text-white",
                open ? "rotate-180" : "rotate-0",
              ].join(" ")}
            />
          </button>
        </div>

        <div
          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
          style={{
            maxHeight: open ? maxH : 0,
            opacity: open ? 1 : 0,
          }}
        >
          <div ref={innerRef} className="pt-4">
            <div className="ui-card border border-[color:var(--accent)]/30 bg-[#ddd6cc]/10 p-5 text-base text-black/70 tracking-[0.04em] dark:bg-[#2d2f31]/20 dark:text-white/70">
              <ul className="space-y-4">
                {faqItems.map((it, i) => (
                  <li key={`${it.q}-${i}`} className="space-y-1">
                    <div className="font-semibold text-zinc-950 dark:text-white">{it.q}</div>
                    <div className="leading-relaxed">{it.a}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
