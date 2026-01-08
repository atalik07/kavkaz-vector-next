import Image from "next/image";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const trust = (copy.hero as any).trust as string[] | undefined;
  const slides =
    (copy.hero as any).slides as
      | { kicker: string; headline: string; text: string }[]
      | undefined;

  return (
    <section
      id="hero"
      data-hero
      data-observe="hero"
      data-inview="false"
      className="relative isolate overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-elbrus.webp"
          alt={copy.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* без нижнего “растворения”, только затемнение для читабельности */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55"
        />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-end gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pb-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-8 md:pt-24">
        {/* LEFT */}
        <div className="max-w-[46rem]">
          <h1 className="font-extrabold uppercase text-white leading-[0.94] tracking-tight">
            <span
              data-hero-title="1"
              data-reveal
              data-reveal-delay="1"
              className="block text-[44px] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {copy.hero.titleLine1}
            </span>
            <span
              data-hero-title="2"
              data-reveal
              data-reveal-delay="2"
              className="block text-[44px] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {copy.hero.titleLine2}
            </span>
          </h1>

          <p
            data-hero-subtitle
            data-reveal
            data-reveal-delay="2"
            className="mt-6 max-w-[44rem] text-white/85 uppercase tracking-[0.06em] text-base sm:text-xl"
          >
            {copy.hero.subtitle}
          </p>

          <div
            data-hero-actions
            data-reveal="up"
            data-reveal-delay="3"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center uppercase"
          >
            <ButtonLink href="#tours" variant="accentOutline" size="md" className="w-full sm:w-auto">
              {copy.hero.ctaTours}
            </ButtonLink>

            <ButtonLink href="#contacts" variant="soft" size="md" className="w-full sm:w-auto">
              {copy.hero.ctaContacts}
            </ButtonLink>
          </div>

          {trust?.length ? (
            <ul
              data-reveal="up"
              data-reveal-delay="4"
              className="mt-8 grid grid-cols-1 gap-3 text-white/90 sm:grid-cols-2"
            >
              {trust.slice(0, 4).map((t) => (
                <li key={t} className="flex items-start gap-2 rounded-xl bg-black/20 px-3 py-2 backdrop-blur">
                  <IconCheck className="mt-0.5 h-5 w-5 text-[color:var(--accent)]" />
                  <span className="text-sm sm:text-base">{t}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="relative z-20">
            <HeroUtilityBar />
          </div>
        </div>

        {/* RIGHT */}
        <aside className="hidden md:block">
          <div
            data-reveal="up"
            data-reveal-delay="4"
            className="rounded-2xl border border-white/15 bg-black/20 p-5 text-white backdrop-blur"
          >
            <div className="text-xs uppercase tracking-[0.14em] text-white/70">Кратко</div>

            <div className="mt-4 space-y-4">
              {(slides?.length ? slides : []).slice(0, 4).map((s) => (
                <div key={`${s.kicker}-${s.headline}`} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                    {s.kicker}
                  </div>
                  <div className="mt-2 text-lg font-semibold leading-snug">{s.headline}</div>
                  <div className="mt-2 text-sm text-white/80 leading-relaxed">{s.text}</div>
                </div>
              ))}

              {!slides?.length ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                  Добавь <code className="text-white/90">copy.hero.slides</code>, и тут появится мини‑презентация (4
                  карточки).
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
