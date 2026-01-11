"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import HeroRSlider from "@/components/HeroRSlider";

const slideImages = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"] as const;


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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="pl-10" data-reveal="up">
        <Eyebrow>{copy.about.eyebrow}</Eyebrow>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-12">
{/* LEFT */}
<div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
  <HeroRSlider
    slides={copy.hero.slides}
    images={slideImages}
    dotsAlign="right"
    className="h-full"
  />
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

          {/* dotted line */}
          <span
            aria-hidden="true"
            className="min-w-0 flex-1 opacity-70 dark:opacity-60"
            style={{
              height: 1,
              backgroundImage:
                "repeating-linear-gradient(to right, currentColor 0 4px, transparent 6px 12px)",
            }}
          />
          {/* icon button */}

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

        {/* Slide-down container */}
        <div
          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
          style={{
            maxHeight: open ? maxH : 0,
            opacity: open ? 1 : 0,
          }}
        >
          <div ref={innerRef} className="pt-4">
           <div className="ui-card border border-[color:var(--accent)]/30 bg-[#ddd6cc]/10 p-5 text-sm text-black/70 tracking-[0.04em] dark:bg-[#2d2f31]/20 dark:text-white/70">             <ul className="space-y-4">
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
