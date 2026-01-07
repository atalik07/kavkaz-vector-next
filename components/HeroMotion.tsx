"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;

    const title1 = hero.querySelector<HTMLElement>('[data-hero-title="1"]');
    const title2 = hero.querySelector<HTMLElement>('[data-hero-title="2"]');
    const subtitle = hero.querySelector<HTMLElement>("[data-hero-subtitle]");
    const actions = hero.querySelector<HTMLElement>("[data-hero-actions]");
    const bar = hero.querySelector<HTMLElement>("[data-hero-bar]");

    if (!title1 || !title2 || !subtitle || !actions) return;

    // окно "стабилизации" после reload/layout shifts
    const initAt = performance.now();
    const STABILIZE_MS = 500;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });

    gsap.set([title1, title2, subtitle, actions, bar].filter(Boolean), {
      willChange: "transform,opacity",
    });

    tl.fromTo(subtitle, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.22 }, 0);
    tl.fromTo(title1, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, 0.08);
    tl.fromTo(title2, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, 0.18);
    tl.fromTo(actions, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.18);
    if (bar) tl.fromTo(bar, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.22);

    let delayed: gsap.core.Tween | null = null;
    let playedOnce = false;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top 85%",
      end: "bottom 15%",
      invalidateOnRefresh: true,

      onToggle: (self) => {
        delayed?.kill();
        delayed = null;

        const now = performance.now();
        const duringStabilize = now - initAt < STABILIZE_MS;

        if (self.isActive) {
          // Если на старте страницы из-за layout/scroll restore происходит второй "вход",
          // просто игнорируем его (первый уже дал интро).
          if (duringStabilize && playedOnce) return;

          const playNow = () => {
            tl.play(0);
            playedOnce = true;
          };

          if (self.direction === -1) {
            delayed = gsap.delayedCall(0.14, playNow);
          } else {
            playNow();
          }
        } else {
          // во время стабилизации не реверсим (это и вызывает "дергание" интро)
          if (duringStabilize) return;
          tl.reverse();
        }
      },
    });

    // важный момент: НЕ ставим progress(1) на старте — пусть интро проиграется один раз,
    // но уберём дёргание через стабилизационное окно выше.

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      delayed?.kill();
      st.kill();
      tl.kill();
    };
  }, []);

  return null;
}
