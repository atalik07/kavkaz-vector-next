"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { HEADER_H_DESKTOP, HEADER_H_MOBILE } from "@/lib/layout";


// регистрация плагина один раз
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
  // чтобы точно видеть, что модуль загрузился
  console.log("[SnapScrollGsap] gsap & ScrollToPlugin registered");
}

type SectionId = "hero" | "tours" | "about" | "contacts";

interface Props {
  untilId?: SectionId;
}

export default function SnapScrollGsap({ untilId = "contacts" }: Props) {
  useEffect(() => {
    const mqSmall = window.matchMedia("(min-width: 640px)");
    const getHeaderH = () =>
      mqSmall.matches ? HEADER_H_DESKTOP : HEADER_H_MOBILE;
    
    if (typeof window === "undefined") return;

    console.log("[SnapScrollGsap] effect start, untilId =", untilId);

    const mq = window.matchMedia("(min-width: 1024px)");
    console.log("[SnapScrollGsap] mq.matches =", mq.matches, "innerWidth =", window.innerWidth);
    if (!mq.matches) {
      console.log("[SnapScrollGsap] mq does NOT match, snap disabled");
      return;
    }

    const order: SectionId[] = ["hero", "tours", "about", "contacts"];

    const enabledIds =
      untilId && order.includes(untilId)
        ? order.slice(0, order.indexOf(untilId) + 1)
        : order;

    console.log("[SnapScrollGsap] enabledIds =", enabledIds);

    const getSectionTop = (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn("[SnapScrollGsap] section not found:", id);
        return null;
      }
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    };

    let isAnimating = false;

    const scrollToSection = (id: SectionId) => {
      const top = getSectionTop(id);
      console.log("[SnapScrollGsap] scrollToSection", id, "top =", top);
      if (top == null) return;

      isAnimating = true;

      gsap.to(document.documentElement, {
        scrollTo: { y: top, autoKill: true },
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          console.log("[SnapScrollGsap] animation complete ->", id);
          isAnimating = false;
        },
      });
    };


    const getCurrentIndex = () => {
      const scrollY = window.scrollY;
      const withPos = enabledIds
        .map((id) => {
          const top = getSectionTop(id);
          return top == null ? null : { id, top };
        })
        .filter(Boolean) as { id: SectionId; top: number }[];

      const current = withPos
        .filter((s) => s.top <= scrollY + 10)
        .sort((a, b) => b.top - a.top)[0];

      const idx = current ? enabledIds.indexOf(current.id) : 0;
      console.log("[SnapScrollGsap] getCurrentIndex ->", idx, "scrollY =", scrollY);
      return idx;
    };

    const onWheel = (e: WheelEvent) => {
      console.log("[SnapScrollGsap] wheel event", {
        deltaY: e.deltaY,
        scrollY: window.scrollY,
        isAnimating,
      });

      if (!mq.matches) return;
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (Math.abs(delta) < 5) return;

      const maxScrollY =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        window.innerHeight;

      const currentIndex = getCurrentIndex();

      const lastTop = getSectionTop(enabledIds[enabledIds.length - 1]);
      if (lastTop != null && window.scrollY > lastTop + window.innerHeight * 0.6) {
        console.log("[SnapScrollGsap] below last section, let browser scroll");
        return;
      }

      if (delta > 0) {
        if (window.scrollY >= maxScrollY) return;

        const nextIndex = Math.min(currentIndex + 1, enabledIds.length - 1);
        const nextId = enabledIds[nextIndex];

        if (nextIndex === currentIndex && nextId === untilId) {
          console.log("[SnapScrollGsap] at last section, let browser scroll down");
          return;
        }

        console.log("[SnapScrollGsap] SNAP DOWN ->", nextId);
        e.preventDefault();
        scrollToSection(nextId);
        return;
      }

      if (delta < 0) {
        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevId = enabledIds[prevIndex];

        const lastId = enabledIds[enabledIds.length - 1];
        const lastTopInner = getSectionTop(lastId);

        if (
          lastTopInner != null &&
          window.scrollY > lastTopInner + window.innerHeight * 0.6 &&
          delta < 0
        ) {
          console.log("[SnapScrollGsap] SNAP UP to last section ->", lastId);
          e.preventDefault();
          scrollToSection(lastId);
          return;
        }

        if (prevIndex === currentIndex) {
          console.log("[SnapScrollGsap] already at first section, let browser scroll up");
          return;
        }

        console.log("[SnapScrollGsap] SNAP UP ->", prevId);
        e.preventDefault();
        scrollToSection(prevId);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    console.log("[SnapScrollGsap] wheel listener attached");

    const onResize = () => {
      console.log("[SnapScrollGsap] resize, mq.matches =", mq.matches);
      if (!mq.matches) {
        window.removeEventListener("wheel", onWheel as any);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      console.log("[SnapScrollGsap] cleanup");
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("resize", onResize);
    };
  }, [untilId]);

  return null;
}
