"use client";

import ThemeToggle from "@/components/ThemeToggle";

export default function HeroUtilityBar() {
  return (
    <div className="mt-5 hidden md:block">
      {/* выравнивание по контейнеру hero делается тем, что ты вставляешь это внутри того же wrapper */}
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full border p-1 backdrop-blur",
          "border-white/15 bg-black/20 text-white",
          // в light теме на фото это ок; если захочешь — подстроим позже
          "dark:border-white/15 dark:bg-black/20 dark:text-white",
        ].join(" ")}
      >
        {/* ThemeToggle стиль не трогаем */}
        <ThemeToggle />

        {/* Language segmented (пока UI-заглушка) */}
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            className="h-7 rounded-full px-3 text-sm font-medium text-[color:var(--accent)] bg-white/10"
          >
            RU
          </button>
          <button
            type="button"
            className="h-7 rounded-full px-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
          >
            EN
          </button>
        </div>

        {/* Слабовидящие — крупнее */}
        <button
          type="button"
          className="h-9 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold hover:bg-white/15"
        >
          Версия для слабовидящих
        </button>
      </div>
    </div>
  );
}
