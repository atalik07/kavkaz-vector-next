"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

type Mode = "system" | "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const mode = (theme ?? "system") as Mode;

  const base =
    "rounded-md px-2 py-1 text-xs border transition-colors select-none outline-none " +
    "focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-0";

  const on = "bg-white text-black border-transparent";
  const off = "bg-transparent text-white/80 border-white/20 hover:text-white hover:bg-white/10";

  const btn = (value: Mode) => `${base} ${mode === value ? on : off}`;

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur"
      role="group"
      aria-label="Theme"
    >
      <button type="button" onClick={() => setTheme("system")} className={btn("system")}>
        {copy.theme.system}
      </button>
      <button type="button" onClick={() => setTheme("light")} className={btn("light")}>
        {copy.theme.light}
      </button>
      <button type="button" onClick={() => setTheme("dark")} className={btn("dark")}>
        {copy.theme.dark}
      </button>
    </div>
  );
}
