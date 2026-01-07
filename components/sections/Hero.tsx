import Image from "next/image";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";

export default function Hero() {
  return (
    <div
      data-hero
      data-observe="hero"
      data-inview="false"
      className="relative isolate overflow-hidden min-h-[100svh]"
    >
      <Image
        src="/images/hero-elbrus.webp"
        alt={copy.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* gradients BELOW content */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45svh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, color-mix(in srgb, var(--hero-fade) 6%, transparent) 55%, color-mix(in srgb, var(--hero-fade) 18%, transparent) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[18svh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, color-mix(in srgb, var(--hero-fade) 55%, transparent) 70%, var(--hero-fade) 100%)",
        }}
        aria-hidden="true"
      />

      {/* content ABOVE gradients */}
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col justify-end px-4 sm:px-6 pb-16 sm:pb-[72px] min-h-[100svh]">
        <h1 className="w-full font-extrabold uppercase text-white leading-[0.92] tracking-tight">
          <span
            data-hero-title="1"
            data-reveal
            data-reveal-delay="1"
            className="block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {copy.hero.titleLine1}
          </span>

          <span
            data-hero-title="2"
            data-reveal
            data-reveal-delay="2"
            className="block text-4xl sm:text-6xl lg:text-[68px] xl:text-[76px] lg:whitespace-nowrap"
          >
            {copy.hero.titleLine2}
          </span>
        </h1>

        <p
          data-hero-subtitle
          data-reveal
          data-reveal-delay="2"
          className="subhead mt-6 text-pretty text-white/80 uppercase tracking-[0.06em] text-base sm:text-xl lg:text-2xl lg:whitespace-nowrap"
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

          <ButtonLink
            href="#contacts"
            variant="soft"
            size="md"
            className="w-full sm:w-auto bg-white/8 ring-white/20 hover:bg-white/12"
          >
            {copy.hero.ctaContacts}
          </ButtonLink>
        </div>

        {/* make sure the bar is above gradients */}
        <div className="relative z-20">
          <HeroUtilityBar />
        </div>
      </div>
    </div>
  );
}
