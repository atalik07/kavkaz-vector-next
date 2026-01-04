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

export default function Tours() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const tours = useMemo(() => copy.tours.items, []);

  return (
    <section
      id="tours"
      className="min-h-screen scroll-mt-16 sm:scroll-mt-[72px] bg-[color:var(--background)]"
    >
      {/* ВАЖНО: max-w + px держат центр на ультравайдах */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {/* Верх — как в старом дизайне: больше воздуха */}
        <div className="text-center">
          <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
            {copy.tours.eyebrow}
          </div>

          {/* В старом макете визуально был крупнее/монолитнее заголовок */}
          <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase">
            {copy.tours.title}
          </h2>
        </div>

        {/* Слайдер */}
        <div className="relative mt-4 sm:mt-6">
          {/* РАМКА режет хвосты (строго) */}
          <div className="overflow-hidden">
            <Swiper
              modules={[A11y]}
              onSwiper={(s) => {
                swiperRef.current = s;
                setCanPrev(!s.isBeginning);
                setCanNext(!s.isEnd);
              }}
              onSlideChange={(s) => {
                setCanPrev(!s.isBeginning);
                setCanNext(!s.isEnd);
              }}
              onResize={(s) => {
                setCanPrev(!s.isBeginning);
                setCanNext(!s.isEnd);
              }}
              slidesPerView={1}
              spaceBetween={14}
              watchOverflow
              grabCursor
              touchStartPreventDefault={false}
              centeredSlides={false}
              autoHeight={false}
              className="!overflow-hidden"
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1200: { slidesPerView: 3, spaceBetween: 22 },
              }}
            >
              {tours.map((t) => (
                <SwiperSlide key={t.id} className="flex !h-auto">
                  {/* Карточки МОНОЛИТНЫЕ и одинаковой высоты:
                      - фиксируем min-height на desktop
                      - контент внутри растягиваем flex-ом
                      - описание строго 3 строки (line-clamp-3)
                  */}
                  <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_20px_70px_rgba(0,0,0,0.35)] min-[1200px]:min-h-[400px]">
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

                      {/* Как в старом: 3 строки и не меняем высоту карточки */}
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

          {/* Стрелки — ПОЛНОСТЬЮ СНАРУЖИ карточек по краям.
              Делается так:
              - расширяем "карман" внутри контейнера через padding-x на wrapper
              - стрелки ставим в этот карман (внутри секции), а не поверх карточек
              - рамка с overflow-hidden НЕ обрезает стрелки, потому что стрелки вне рамки
          */}
          <div className="pointer-events-none hidden min-[1200px]:block">
            <button
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={!canPrev}
              className={[
                "pointer-events-auto",
                "absolute left-0 top-1/2 -translate-y-1/2",
                // выносим за пределы сетки карточек, но в пределах контейнера страницы
                "-translate-x-[110%]",
                "z-10 h-11 w-11 grid place-items-center rounded-full",
                "border border-white/15 bg-black/25 text-white/80 backdrop-blur",
                "hover:bg-white/10 hover:text-white transition",
                "disabled:opacity-25 disabled:pointer-events-none",
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
                "absolute right-0 top-1/2 -translate-y-1/2",
                "translate-x-[110%]",
                "z-10 h-11 w-11 grid place-items-center rounded-full",
                "border border-white/15 bg-black/25 text-white/80 backdrop-blur",
                "hover:bg-white/10 hover:text-white transition",
                "disabled:opacity-25 disabled:pointer-events-none",
              ].join(" ")}
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>

        {/* Низ — больше воздуха как в старом */}
        <div className="mt-5 sm:mt-7 text-center text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[color:var(--muted)]">
          {copy.tours.bottomText}{" "}
          <Link
            href="/routes"
            className="text-[color:var(--accent)] hover:underline underline-offset-4"
          >
            {copy.tours.bottomLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
