import Image from "next/image";
import { copy } from "@/lib/copy";
import HeroUtilityBar from "@/components/HeroUtilityBar";
import { ButtonLink } from "@/components/Button";

export default function Hero() {
  // перенос подзаголовка строго в 2 строки, текст берём из copy
  const subtitle = copy.hero.subtitle;
  const subtitleParts = subtitle.split(" в сердце ");
  const subtitleLine1 = subtitleParts[0] ?? subtitle;
  const subtitleLine2 = subtitleParts[1] ? `в сердце ${subtitleParts[1]}` : "";

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
            className="block text-[44px] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {copy.hero.titleLine1}
          </span>

          <span
            data-hero-title="2"
            data-reveal
            data-reveal-delay="2"
            className="block text-[44px] sm:text-6xl lg:text-[68px] xl:text-[76px] lg:whitespace-nowrap"
          >
            {copy.hero.titleLine2}
          </span>
        </h1>

        <p
          data-hero-subtitle
          data-reveal
          data-reveal-delay="2"
          className="subhead mt-6 text-white/80 uppercase tracking-[0.06em] text-base sm:text-xl lg:text-2xl lg:whitespace-nowrap"
        >
          <span className="block">{subtitleLine1}</span>
          {subtitleLine2 ? <span className="block">{subtitleLine2}</span> : null}
        </p>

        <div
          data-hero-actions
          data-reveal="up"
          data-reveal-delay="3"
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center uppercase"
        >
          {/* 1) фон кнопок в мобилке чуть белесее */}
<ButtonLink
  href="#tours"
  variant="accentOutline"
  size="md"
  className={[
    "w-full sm:w-auto",
    // mobile: толще рамка + заметнее стекло
    "border-2 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)]",
    "hover:bg-white/14",
    // sm+: обратно к более спокойному виду
    "sm:border",
    "sm:bg-transparent sm:shadow-none",
  ].join(" ")}
>
  {copy.hero.ctaTours}
</ButtonLink>

<ButtonLink
  href="#contacts"
  variant="soft"
  size="md"
  className={[
    "w-full sm:w-auto",
    // mobile: толще рамка + белёсее подложка
    "border-2 bg-white/12 ring-0 shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
    "hover:bg-white/16",
    // sm+: как было
    "sm:border",
    "sm:bg-white/8 sm:ring-white/20 sm:hover:bg-white/12",
    "sm:shadow-none",
  ].join(" ")}
>
  {copy.hero.ctaContacts}
</ButtonLink>

        </div>

        <div className="relative z-20">
          <HeroUtilityBar />
        </div>
      </div>
    </div>
  );
}
