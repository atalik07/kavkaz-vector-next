"use client";

import { copy } from "@/lib/copy";
import { Button } from "@/components/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contacts() {
  const c = copy.contacts;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const left = leftCardRef.current;
    const right = rightCardRef.current;

    if (!section || !eyebrow || !left || !right) return;

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

        // Десктоп: карточки от краёв. Мобилка: обе снизу.
        const leftFrom = ctx.conditions?.isDesktop
          ? { autoAlpha: 0, x: -16, y: 0, filter: "blur(2px)" }
          : { autoAlpha: 0, x: 0, y: fromY, filter: "blur(2px)" };

        const rightFrom = ctx.conditions?.isDesktop
          ? { autoAlpha: 0, x: 16, y: 0, filter: "blur(2px)" }
          : { autoAlpha: 0, x: 0, y: fromY, filter: "blur(2px)" };

        const tl = gsap.timeline({
          defaults: base,
          scrollTrigger: {
            trigger: left, // как в About: триггерим по "главному" блоку, чтобы анимация читалась
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        });

        // 1) карточки (раньше)
        tl.fromTo(left, leftFrom, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" }, 0.0)
          .fromTo(right, rightFrom, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" }, 0.08)

          // 2) заголовок (позже)
          .fromTo(
            eyebrow,
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
            {c.eyebrow}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* LEFT: contacts + map */}
          <div
            ref={leftCardRef}
            className="flex flex-col gap-6 lg:min-h-0 lg:h-full"
          >
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur">
              <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-3 sm:pb-4">
                <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                  {c.titleLeft}
                </h3>

                <dl className="mt-2 grid gap-2 text-sm sm:text-[15px] leading-snug">
                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.phoneLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.phone}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.emailLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.email}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.addressLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.address}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.hoursLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.hours}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)]/80 lg:flex-1 lg:min-h-0">
              <iframe
                title={c.map.title}
                className="block h-[260px] w-full sm:h-[320px] lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={c.map.src}
              />
            </div>
          </div>

          {/* RIGHT: form */}
          <div
            ref={rightCardRef}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur lg:h-full"
          >
            <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-2 sm:pb-3">
              <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                {c.titleRight}
              </h3>

              <form className="mt-3 sm:mt-4 grid gap-3 sm:gap-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="pl-3 text-sm text-[color:var(--muted)]">
                      {c.form.name}
                    </span>
                    <input
                      className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.namePlaceholder}
                      name="name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="pl-3 text-sm text-[color:var(--muted)]">
                      {c.form.phone}
                    </span>
                    <input
                      className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.phonePlaceholder}
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="pl-3 text-sm text-[color:var(--muted)]">
                    {c.form.email}
                  </span>
                  <input
                    className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.emailPlaceholder}
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                    />
                </label>

                <label className="grid gap-2">
                  <span className="pl-3 text-sm text-[color:var(--muted)]">
                    {c.form.message}
                  </span>
                  <textarea
                    className="h-[112px] resize-none rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                    placeholder={c.form.messagePlaceholder}
                    name="message"
                  />
                </label>

                <div className="pt-0">
                  <Button type="submit" className="w-full sm:w-auto uppercase tracking-wide">
                    {c.form.submit}
                  </Button>
                </div>

                <p className="mt-2 text-xs leading-5 text-[color:var(--foreground)]/70">
                  {c.form.consent}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
