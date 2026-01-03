"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

type Mode = "system" | "light" | "dark";

function Icon({ mode }: { mode: Mode }) {
  const common = "h-4 w-4 text-current";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="4" {...strokeProps} />
        <path d="M12 2v2" {...strokeProps} />
        <path d="M12 20v2" {...strokeProps} />
        <path d="M2 12h2" {...strokeProps} />
        <path d="M20 12h2" {...strokeProps} />
        <path d="M4.9 4.9 6.3 6.3" {...strokeProps} />
        <path d="M17.7 17.7 19.1 19.1" {...strokeProps} />
        <path d="M4.9 19.1 6.3 17.7" {...strokeProps} />
        <path d="M17.7 6.3 19.1 4.9" {...strokeProps} />
      </svg>
    );
  }

  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path
          d="M21 14.5A7.5 7.5 0 0 1 9.5 3.5 6.5 6.5 0 1 0 21 14.5Z"
          {...strokeProps}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <rect x="7" y="3" width="10" height="16" rx="2" {...strokeProps} />
      <path d="M9 21h6" {...strokeProps} />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const mode = (theme ?? "system") as Mode;

  // БАЗА: как было в dark (почти прозрачное стекло).
  // Дальше точечно переопределяем только для LIGHT после скролла,
  // и для LIGHT на hero убираем "белёсость" (делаем чуть темнее, но очень мягко).
  const group =
    "inline-flex items-center rounded-full border p-0.5 backdrop-blur transition-colors " +
    // default (работает и в dark): как было раньше
    "border-white/15 bg-white/5 " +
    // light + hero (scrolled=false): чуть менее белёсый (слегка темнее, но НЕ как black/25)
    // "group-data-[scrolled=false]:bg-black/10 " +
    // light + scrolled=true: под светлый хедер — поверхность из переменных
    "group-data-[scrolled=true]:border-[color:var(--border)] group-data-[scrolled=true]:bg-[color:var(--surface)]/90 " +
    // dark: всегда держим старый вариант, ничего не ломаем
    "dark:group-data-[scrolled=false]:bg-white/5 dark:group-data-[scrolled=true]:bg-white/5 dark:group-data-[scrolled=true]:border-white/15";

  const base =
    "inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent " +
    "appearance-none no-underline select-none outline-none transition-colors";

  const active =
    "bg-white/10 border-white/20 shadow-sm text-[color:var(--accent)] " +
    "group-data-[scrolled=true]:bg-black/10 group-data-[scrolled=true]:border-[color:var(--border)] " +
    "dark:group-data-[scrolled=true]:bg-white/10 dark:group-data-[scrolled=true]:border-white/20";

  const inactive =
    "hover:bg-white/10 " +
    // по умолчанию (hero и dark): белая иконка/линии читабельны
    "text-white/75 hover:text-white " +
    // после скролла в light: под светлый фон делаем нейтральные цвета
    "group-data-[scrolled=true]:text-[color:var(--muted)] group-data-[scrolled=true]:hover:text-[color:var(--foreground)] group-data-[scrolled=true]:hover:bg-black/5 " +
    // в dark после скролла оставляем как было
    "dark:group-data-[scrolled=true]:text-white/75 dark:group-data-[scrolled=true]:hover:text-white dark:group-data-[scrolled=true]:hover:bg-white/10";

  const btnClass = (value: Mode) => `${base} ${mode === value ? active : inactive}`;

  const labelFor = (value: Mode) =>
    value === "system"
      ? copy.theme.system
      : value === "light"
        ? copy.theme.light
        : copy.theme.dark;

  return (
    <div role="radiogroup" aria-label={copy.theme.label} className={group}>
      {(["system", "light", "dark"] as const).map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={mode === value ? "true" : "false"}
          onClick={() => setTheme(value)}
          className={btnClass(value)}
          title={labelFor(value)}
        >
          <Icon mode={value} />
          <span className="sr-only">{labelFor(value)}</span>
        </button>
      ))}
    </div>
  );
}
