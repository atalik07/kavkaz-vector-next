"use client";

import Image from "next/image";
import { copy } from "@/lib/copy";
import { ButtonLink } from "@/components/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !eyebrow || !title || !image || !text) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        if (ctx.conditions?.reduce) return;

        const base = {
          duration: 0.9,
          ease: "power3.out",
        };

        const fromY = 14;

        // Десктоп: картинка слева, текст справа. Мобилка: всё снизу.
        const imageFrom = ctx.conditions?.isDesktop
          ? { autoAlpha: 0, x: -16, y: 0, filter: "blur(2px)" }
          : { autoAlpha: 0, x: 0, y: fromY, filter: "blur(2px)" };

        const textFrom = ctx.conditions?.isDesktop
          ? { autoAlpha: 0, x: 16, y: 0, filter: "blur(2px)" }
          : { autoAlpha: 0, x: 0, y: fromY, filter: "blur(2px)" };

        const tl = gsap.timeline({
          defaults: base,
          scrollTrigger: {
            trigger: image,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        });

tl.fromTo(
  image,
  imageFrom,
  { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" },
  0.0
)
  .fromTo(
    text,
    textFrom,
    { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" },
    0.08
  )
  .fromTo(
    title,
    // заголовок заметнее: больше "снизу вверх"
    { autoAlpha: 0, y: 22, filter: "blur(0px)" },
    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
    0.28
  )
  .fromTo(
    eyebrow,
    // подзаголовок/eyebrow последним и мягче
    { autoAlpha: 0, y: 12, filter: "blur(0px)" },
    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 },
    0.48
  );


        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div
            ref={eyebrowRef}
            className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]"
          >
            {copy.about.eyebrow}
          </div>
          <h2
            ref={titleRef}
            className="mt-3 text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase"
          >
            {copy.about.title}
          </h2>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 md:items-stretch md:h-[65svh] md:min-h-0">
          {/* Left image */}
          <div ref={imageRef} className="relative overflow-hidden rounded-3xl bg-black/10 md:h-full">
            <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full">
              <Image
                src="/images/about-jeep.webp"
                alt={copy.about.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right text */}
          <div ref={textRef} className="md:pt-6 lg:pt-7 md:flex md:flex-col md:min-h-0 md:h-full">
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-4 text-[15px] leading-snug text-[color:var(--muted)]">
                {copy.about.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-balance">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 shrink-0">
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
  );
}
