import Image from "next/image";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";

export default function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] overflow-hidden scroll-mt-20">
      <Image
        src="/images/hero-elbrus.webp"
        alt={copy.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

{/* long soft fade (theme-aware) */}
<div
  className="pointer-events-none absolute inset-x-0 bottom-0 h-[45svh]"
  style={{
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, color-mix(in srgb, var(--hero-fade) 6%, transparent) 55%, color-mix(in srgb, var(--hero-fade) 18%, transparent) 100%)",
  }}
  aria-hidden="true"
/>

{/* strong bottom fade (theme-aware) */}
<div
  className="pointer-events-none absolute inset-x-0 bottom-0 h-[18svh]"
  style={{
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, color-mix(in srgb, var(--hero-fade) 55%, transparent) 70%, var(--hero-fade) 100%)",
  }}
  aria-hidden="true"
/>


      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 sm:px-6 pb-16 sm:pb-[72px]">
            <h1 className="w-full font-extrabold uppercase text-white leading-[0.92] tracking-tight">
              <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl">
                {copy.hero.titleLine1}
              </span>

              <span className="block text-4xl sm:text-6xl lg:text-[68px] xl:text-[76px] lg:whitespace-nowrap">
                {copy.hero.titleLine2}
              </span>
            </h1>

<p className="subhead mt-6 text-pretty text-white/80 uppercase tracking-[0.06em] text-base sm:text-xl lg:text-2xl lg:whitespace-nowrap">
              {copy.hero.subtitle}
            </p>



<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
  <a
    href="#tours"
    className="inline-flex w-full items-center justify-center rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition
               hover:bg-[color:var(--accent)] hover:text-white hover:ring-[color:var(--accent)]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto"
  >
    {copy.hero.ctaTours}
  </a>

  <a
    href="#contacts"
    className="inline-flex w-full items-center justify-center rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition
               hover:bg-[color:var(--accent)] hover:text-white hover:ring-[color:var(--accent)]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto"
  >
    {copy.hero.ctaContacts}
  </a>
</div>


        {/* Плашка под кнопками (десктоп/планшет), выравнивается по этому же контейнеру */}
        <HeroUtilityBar />
      </div>
    </section>
  );
}
