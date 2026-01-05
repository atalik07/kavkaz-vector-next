import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "accentOutline" | "soft";
type Size = "sm" | "md";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  // УЖАТЫЕ вертикальные паддинги: вместо py-3 делаем фикс высоты
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--primary-bg)] text-[color:var(--primary-fg)] ring-1 ring-white/10 " +
    "hover:bg-[color:var(--accent)] hover:text-white hover:ring-[color:var(--accent)]",

outline:
  "border border-black/20 bg-transparent text-[color:var(--foreground)] " +
  "dark:border-white/15 dark:bg-white/[0.02] " +
  "hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)]",


  ghost:
    "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur " +
    "hover:bg-white/15 hover:ring-white/30",

  // Кнопка "Смотреть туры" в хедере:
  // по умолчанию: акцентная рамка + акцентный текст
  // hover: фон акцентный, текст белый
  accentOutline:
    "border border-[color:var(--accent)] text-white/85 bg-white/[0.02] backdrop-blur-md " +
    "hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)]",

  // Вторая кнопка: как текущая в hero (white/15 заливка),
  // hover: акцентный текст + акцентная рамка, заливку НЕ меняем
  soft:
 // стеклянная подложка: очень лёгкая белая + blur + тонкая рамка
  "bg-white/[0.02] text-white/85 border border-white/18 backdrop-blur-md " +
  // hover: акцентный текст + акцентная рамка, заливку НЕ трогаем
  "hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] " +
  // чуть “подсветить” стекло на hover (но не делать акцентную заливку)
  "hover:bg-white/[0.08]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <button
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
