import Image from "next/image";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[100svh]">
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

      <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 sm:px-6 pb-16 sm:pb-[72px] min-h-[100svh]">
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center uppercase">
          <ButtonLink
            href="#tours"
            variant="accentOutline"
            size="md"
            className="w-full sm:w-auto"
          >
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

        {/* Плашка под кнопками (десктоп/планшет), выравнивается по этому же контейнеру */}
        <HeroUtilityBar />
      </div>
    </div>
  );
}
