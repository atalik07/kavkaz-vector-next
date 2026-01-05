// src/components/About.tsx
import Image from "next/image";
import { copy } from "@/lib/copy";
import { ButtonLink } from "@/components/Button";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[color:var(--background)] min-h-[calc(100svh-var(--header-h))] scroll-mt-[var(--header-h)]"
    >
      {/* Делаем 3 строки по высоте: top (фикс), center (растягивается), bottom (фикс) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-72px)] grid grid-rows-[auto_1fr_auto]">
        
        <div id="about-anchor" className="h-px w-full" />
        {/* TOP: отступы и заголовок — как в Tours */}
        <div className="pt-16 sm:pt-20">
          <div className="text-center">
            <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
              {copy.about.eyebrow}
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase">
              {copy.about.title}
            </h2>
          </div>

          {/* Расстояние от заголовка до контента — как в Tours (mt-4 sm:mt-6) */}
          <div className="mt-4 sm:mt-6" />
        </div>

        {/* CENTER: растягиваемый блок. Тут должно влезать всё; лишнее режем по тексту */}
        <div className="min-h-0">
          <div className="h-full min-h-0 grid gap-6 md:gap-0 md:grid-cols-[1fr_32px_1fr] items-stretch">
            {/* Left image (НЕ квадрат, возвращаем как было в референсе — более “широкая”) */}
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-black/10 md:col-start-1">
              <div className="relative aspect-[4/3] lg:aspect-[1/1] w-full">
                <Image
                  src="/images/about-jeep.webp"
                  alt={copy.about.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Spacer column (the "gap") */}
            <div className="hidden md:block md:col-start-2" />

            {/* Right text: режем только текст, кнопку оставляем как есть */}
            <div className="min-h-0 md:col-start-3">
              <div className="flex h-full min-h-0 flex-col overflow-hidden md:pt-10 md:pb-10">
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-4 text-[15px] leading-snug text-[color:var(--muted)]">
                    {copy.about.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-balance">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 md:mt-auto md:pt-5">
                  <ButtonLink
                    href={copy.about.ctaHref}
                    variant="outline"
                    size="md"
                    className="uppercase tracking-wide"
                  >
                    {copy.about.ctaMore}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: такой же отступ как сверху (как в Tours) */}
        <div className="pb-16 sm:pb-20" />
      </div>
    </section>
  );
}
