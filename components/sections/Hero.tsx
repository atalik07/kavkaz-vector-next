"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";
import HeroRSlider from "@/components/HeroRSlider";

export default function Hero() {
  const slides = copy.hero.slides;

  // лучше потом заменить на .webp
  const slideImages = useMemo(() => ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"], []);

  // высота правой карты = высоте левого контента
  const leftRef = useRef<HTMLDivElement | null>(null);
  const [rightH, setRightH] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = leftRef.current;
    if (!el) return;

    const measure = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      setRightH(h > 0 ? h : null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const activeBg = slideImages[0];

  return (
    <div data-hero data-observe="hero" data-inview="false" className="relative isolate overflow-hidden h-[100svh]">
      {/* SECTION BG (blurred) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-700"
          style={{
            backgroundImage: `url(${activeBg})`,
            filter: "blur(28px) saturate(1.15)",
            transform: "scale(1.08)",
            opacity: 0.1,
          }}
        />
        {/* затемнение/читабельность */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 dark:from-black/45 dark:to-black/55" />
        {/* легкое зерно */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay heroGrain" />
      </div>

      <div className="relative z-20 mx-auto grid h-[100svh] max-w-6xl grid-cols-1 gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:items-stretch">
        {/* LEFT */}
        <div className="min-h-0 lg:flex lg:items-center">
          <div ref={leftRef} className="w-full">
            <h1 className="font-extrabold uppercase text-zinc-950 dark:text-white leading-[0.94] tracking-tight">
              <span
                data-reveal
                data-reveal-delay="1"
                className="block text-[40px] sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
              >
                {copy.hero.titleLine1}
              </span>
              <span
                data-reveal
                data-reveal-delay="2"
                className="block text-[40px] sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
              >
                {copy.hero.titleLine2}
              </span>
            </h1>

            <p
              data-reveal
              data-reveal-delay="2"
              className="subhead mt-6 max-w-[48rem] text-zinc-950/80 dark:text-white/85 uppercase tracking-[0.06em] text-base sm:text-xl"
            >
              <span className="block">{copy.hero.subtitleLine1}</span>
              <span className="block">{copy.hero.subtitleLine2}</span>
            </p>

            <div data-reveal="up" data-reveal-delay="3" className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={copy.hero.ctaPrimaryHref}
                variant="accentOutline"
                size="md"
                className="uppercase tracking-[0.10em]"
                target="_blank"
                rel="noreferrer"
              >
                {copy.hero.ctaPrimary}
              </ButtonLink>

              <ButtonLink
                href={copy.hero.ctaSecondaryHref}
                variant="soft"
                size="md"
                className="uppercase tracking-[0.10em]"
              >
                {copy.hero.ctaSecondary}
              </ButtonLink>
            </div>

            <div data-reveal="up" data-reveal-delay="4" className="mt-6 flex flex-wrap gap-2">
              {copy.hero.trust.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border px-3 py-1 text-[11px] font-normal uppercase tracking-[0.08em] backdrop-blur border-zinc-900/10 bg-white/50 text-zinc-950/55 dark:border-white/10 dark:bg-black/10 dark:text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative z-20 mt-10">
              <HeroUtilityBar />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="hidden lg:flex lg:items-center">
          <div className="w-full" style={rightH ? { height: rightH } : undefined}>
            <HeroRSlider slides={slides} images={slideImages} dotsAlign="left" slideMs={8000} fadeMs={900} />
          </div>
        </aside>
      </div>
    </div>
  );
}
