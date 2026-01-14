"use client";

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

type Slide = { kicker: string; headline: string; text: string };

export function HeroRSliderDots({
  count,
  active,
  align = "left",
  className = "",
}: {
  count: number;
  active: number;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={[
        "flex flex-col gap-2 items-center pt-4",
        align === "right" ? "ml-auto" : "",
        className,
      ].join(" ")}
    >
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

export default function HeroRSlider({
  slides,
  images,
  dotsAlign = "left",
  dots = "inside",
  slideMs = 8000,
  fadeMs = 900,
  className = "",
  onActiveChange,
}: {
  slides: readonly Slide[];
  images: readonly string[];
  dotsAlign?: "left" | "right";
  dots?: "inside" | "none";
  slideMs?: number;
  fadeMs?: number;
  className?: string;
  onActiveChange?: (activeIndex: number) => void;
}) {
  const safeImages = useMemo(() => (images.length ? images : ["/images/1.jpg"]), [images]);
  const [active, setActive] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const s = slides?.[active];

  const handleSlideChange = (sw: any) => {
    const idx = sw.realIndex % slides.length;
    setActive(idx);
    onActiveChange?.(idx);
    setDrawerOpen(false);
    window.setTimeout(() => setDrawerOpen(true), 120);
  };

  const SlideBlock = (
    <div className="heroRSlide">
      {/* BG swiper fade */}
      <div className="heroRSlideBg">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop
          speed={fadeMs}
          autoplay={{ delay: slideMs - fadeMs, disableOnInteraction: false }}
          onSlideChange={handleSlideChange}
          className="h-full w-full"
        >
          {safeImages.map((src, i) => (
            <SwiperSlide key={src + i} className="h-full w-full">
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover opacity-45"
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
        <div className="text-base tracking-[0.02em] text-current/90">{s?.text}</div>
      </div>
    </div>
  );

  const DotsBlock =
    dots !== "none" ? <HeroRSliderDots count={slides.length} active={active} align={dotsAlign} /> : null;

  return (
<div className={["heroRCard", className].join(" ")}>
  <div
    className={[
      "heroRInner",
      dotsAlign === "right" ? "heroRInner--dotsRight" : "",
    ].join(" ")}
  >
    {dotsAlign === "right" ? (
          <>
            {SlideBlock}
            {DotsBlock}
          </>
        ) : (
          <>
            {DotsBlock}
            {SlideBlock}
          </>
        )}
      </div>
    </div>
  );
}
