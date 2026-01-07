"use client";

import { useEffect } from "react";

type Props = {
  selector?: string;
  rootMargin?: string;
  threshold?: number | number[];
};

export default function InView({
  selector = "[data-observe]",
  rootMargin = "0px 0px -20% 0px",
  threshold = 0.15,
}: Props) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    // Сначала "выключаем" анимации, чтобы браузер применил стартовые стили
    nodes.forEach((n) => (n.dataset.ready = "false"));

    // Включаем на следующем кадре
    const raf = requestAnimationFrame(() => {
      nodes.forEach((n) => (n.dataset.ready = "true"));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          el.dataset.inview = e.isIntersecting ? "true" : "false";
        }
      },
      { root: null, rootMargin, threshold }
    );

    nodes.forEach((n) => io.observe(n));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [selector, rootMargin, threshold]);

  return null;
}
