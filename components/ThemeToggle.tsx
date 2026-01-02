"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const mode = (theme ?? "system") as Mode;

  const base =
    "rounded-md px-2 py-1 text-xs border transition-colors select-none outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]";


  const on =
    "bg-[color:var(--primary-bg)] text-[color:var(--primary-fg)] border-transparent";

  const off =
    "bg-transparent text-[color:var(--muted)] border-[color:var(--border)] hover:text-[color:var(--foreground)]";

  const btn = (value: Mode) =>
    `${base} ${mode === value ? on : off}`;

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-1 backdrop-blur"
      role="group"
      aria-label="Theme"
    >
      <button type="button" onClick={() => setTheme("system")} className={btn("system")}>
        System
      </button>
      <button type="button" onClick={() => setTheme("light")} className={btn("light")}>
        Light
      </button>
      <button type="button" onClick={() => setTheme("dark")} className={btn("dark")}>
        Dark
      </button>
    </div>
  );
}
