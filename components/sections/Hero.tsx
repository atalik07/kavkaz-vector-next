"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex flex-col gap-2 items-center pt-4">
      {Array.from({ length: count }).map((_, i) => {
        const on = i === active;
        return (
          <div
            key={i}
            className={[
              "h-2 w-2 rounded-full transition",
              on ? "bg-[color:var(--accent)]" : "bg-zinc-950/35 dark:bg-white/30",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  const slides = copy.hero.slides;

  // лучше потом заменить на .webp
  const slideImages = useMemo(
    () => ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"],
    []
  );

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

  const [active, setActive] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const SLIDE_MS = 8000;
  const FADE_MS = 900;

  const s = slides?.[active];

  return (
    <div data-hero data-observe="hero" data-inview="false" className="relative isolate overflow-hidden h-[100svh]">
      <div className="relative z-20 mx-auto grid h-[100svh] max-w-6xl grid-cols-1 gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:items-stretch">
        {/* LEFT */}
        <div className="min-h-0 lg:flex lg:items-center">
          <div ref={leftRef} className="w-full">
            <h1 className="font-extrabold uppercase text-zinc-950 dark:text-white leading-[0.94] tracking-tight">
              <span data-reveal data-reveal-delay="1" className="block text-[40px] sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                {copy.hero.titleLine1}
              </span>
              <span data-reveal data-reveal-delay="2" className="block text-[40px] sm:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                {copy.hero.titleLine2}
              </span>
            </h1>

            <p
              data-reveal
              data-reveal-delay="2"
              className="subhead mt-6 max-w-[48rem] text-zinc-950/80 dark:text-white/85 uppercase tracking-[0.06em] text-base sm:text-xl"
            >
              {copy.hero.subtitle}
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
            <div className="heroRCard">
              <div className="heroRInner">
                <Dots count={slides.length} active={active} />

                <div className="heroRSlide">
                  {/* BG swiper fade */}
                  <div className="heroRSlideBg">
                    <Swiper
                      modules={[EffectFade, Autoplay]}
                      effect="fade"
                      fadeEffect={{ crossFade: true }}
                      slidesPerView={1}
                      loop
                      speed={FADE_MS}
                      autoplay={{ delay: SLIDE_MS - FADE_MS, disableOnInteraction: false }}
                      // preloadImages
                      watchSlidesProgress
                      onSlideChange={(sw) => {
                        // realIndex — индекс без учёта loop-клонов
                        const idx = sw.realIndex % slides.length;
                        setActive(idx);

                        // синхронизация “drawer”: закрываем на смене и открываем через чуть-чуть
                        setDrawerOpen(false);
                        window.setTimeout(() => setDrawerOpen(true), 120);
                      }}
                      className="absolute inset-0"
                    >
                      {slideImages.map((src, i) => (
                        <SwiperSlide key={src + i}>
                          {/* Важно: обычный img — меньше шансов на дерганье, чем next/image в fade */}
                          <img
                            src={src}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-45"
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="heroRSlideOverlay" />
                  </div>

                  {/* TOP text */}
                  <div
                    className={[
                      "relative",
                      "transition-transform transition-opacity ease-out",
                      "duration-[480ms]",
                      drawerOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                    ].join(" ")}
                    style={{ zIndex: 1 }}
                  >
                    <div className="heroRSlideTop">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-current/65">{s?.kicker}</div>
                      <div className="mt-2 text-lg font-extrabold tracking-tight text-current">{s?.headline}</div>
                    </div>
                  </div>

                  {/* Bottom drawer */}
                  <div className={["heroRDrawer", drawerOpen ? "is-open" : ""].join(" ")}>
                    <div className="text-sm leading-relaxed text-current/80">{s?.text}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
