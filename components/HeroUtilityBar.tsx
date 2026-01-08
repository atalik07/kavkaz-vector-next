"use client";

import ThemeToggle from "@/components/ThemeToggle";

export default function HeroUtilityBar() {
  return (
    <div data-hero-bar data-reveal="up" data-reveal-delay="4" className="mt-5 hidden md:block">
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full border p-1 backdrop-blur",
          "border-white/15 bg-black/20 text-white",
          "dark:border-white/15 dark:bg-black/20 dark:text-white",
        ].join(" ")}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
