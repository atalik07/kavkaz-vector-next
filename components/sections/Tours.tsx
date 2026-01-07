"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { ButtonLink } from "@/components/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import InView from "@/components/InView";

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      {dir === "left" ? (
        <path
          d="M14.5 5.5 8 12l6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.5 5.5 16 12l-6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function formatRub(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

/**
 * ВАЖНО:
 * 1) Tailwind group-data варианты мы УБИРАЕМ (они у тебя не генерятся, поэтому всё скрыто).
 * 2) Переходим на data-reveal + CSS (см. ниже).
 *
 * Добавь в globals.css:
 *
 * [data-observe] [data-reveal] {
 *   opacity: 0;
 *   transform: translate3d(0, 24px, 0);
 *   transition-property: transform, opacity;
 *   transition-duration: 700ms;
 *   transition-timing-function: ease;
 *   will-change: transform, opacity;
 * }
 * [data-observe][data-inview="true"] [data-reveal] {
 *   opacity: 1;
 *   transform: translate3d(0, 0, 0);
 * }
 * [data-observe] [data-reveal="up"] {
 *   transform: translate3d(0, -24px, 0);
 * }
 * [data-observe] [data-reveal="down-from-above"] {
 *   transform: translate3d(0, -16px, 0);
 * }
 * [data-observe][data-inview="true"] [data-reveal-delay="1"] { transition-delay: 60ms; }
 * [data-observe][data-inview="true"] [data-reveal-delay="2"] { transition-delay: 170ms; }
 * [data-observe][data-inview="true"] [data-reveal-delay="3"] { transition-delay: 260ms; }
 */
export default function Tours() {
  const tours = useMemo(() => copy.tours.items, []);
  const swiperRef = useRef<SwiperType | null>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncNavState = (s: SwiperType) => {
    setCanPrev(!s.isBeginning);
    setCanNext(!s.isEnd);
  };

  return (
    <div data-observe="tours" data-inview="false">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center">
          {/* eyebrow (последним сверху) */}
          <div data-reveal data-reveal-delay="3">
            <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
              {copy.tours.eyebrow}
            </div>
          </div>

          {/* title (лесенкой перед eyebrow) */}
          <h2
            data-reveal
            data-reveal-delay="2"
            className="mt-3 text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase"
          >
            {copy.tours.title}
          </h2>
        </div>

        {/* slider wrapper: появляется первым, снизу */}
        <div data-reveal data-reveal-delay="1" className="relative mt-4 sm:mt-6">
          <div className="swiper-clip">
            <Swiper
              modules={[A11y]}
              onSwiper={(s) => {
                swiperRef.current = s;
                syncNavState(s);
              }}
              onSlideChange={syncNavState}
              onResize={syncNavState}
              slidesPerView={1}
              spaceBetween={14}
              watchOverflow
              grabCursor
              touchStartPreventDefault={false}
              centeredSlides={false}
              autoHeight={false}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1200: { slidesPerView: 3, spaceBetween: 22 },
              }}
            >
              {tours.map((t) => (
                <SwiperSlide key={t.id} className="flex !h-auto">
                  <article
                    className={[
                      "flex w-full flex-col overflow-hidden rounded-3xl border",
                      "border-black/10 bg-white",
                      "dark:border-white/10 dark:bg-white/[0.06]",
                      "min-[1200px]:min-h-[400px]",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-4 sm:px-5 pt-3 sm:pt-4 pb-3 sm:pb-4">
                      <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                        {t.title}
                      </h3>

                      <p className="mt-2 text-sm sm:text-[15px] leading-snug text-[color:var(--muted)] line-clamp-3">
                        {t.desc}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4">
                        <div className="text-sm sm:text-base font-semibold whitespace-nowrap">
                          {copy.tours.priceFrom}&nbsp;{formatRub(t.priceFrom)}&nbsp;₽
                        </div>

                        <ButtonLink
                          href={`/tours/${t.id}`}
                          variant="outline"
                          size="md"
                          className="uppercase tracking-wide"
                        >
                          {copy.tours.ctaMore}
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="pointer-events-none hidden min-[1200px]:block">
            <button
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={!canPrev}
              className={[
                "pointer-events-auto",
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[110%]",
                "z-10 grid h-11 w-11 place-items-center rounded-full",
                "border border-black/10 bg-white/80 text-black/70 shadow-sm backdrop-blur",
                "hover:bg-white hover:text-black/90",
                "disabled:pointer-events-none disabled:opacity-25",
                "dark:border-white/15 dark:bg-black/25 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
              ].join(" ")}
            >
              <ArrowIcon dir="left" />
            </button>

            <button
              type="button"
              aria-label="Следующий слайд"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={!canNext}
              className={[
                "pointer-events-auto",
                "absolute right-0 top-1/2 -translate-y-1/2 translate-x-[110%]",
                "z-10 grid h-11 w-11 place-items-center rounded-full",
                "border border-black/10 bg-white/80 text-black/70 shadow-sm backdrop-blur",
                "hover:bg-white hover:text-black/90",
                "disabled:pointer-events-none disabled:opacity-25",
                "dark:border-white/15 dark:bg-black/25 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
              ].join(" ")}
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>

        {/* bottom text: синхронно с title, но "выехал вниз" из-под карусели */}
        <div
          data-reveal="down-from-above"
          data-reveal-delay="2"
          className="mt-5 sm:mt-7 text-center text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[color:var(--muted)]"
        >
          {copy.tours.bottomText}{" "}
          <Link
            href="/routes"
            className="text-[color:var(--accent)] hover:underline underline-offset-4"
          >
            {copy.tours.bottomLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
