// components/HeroUtilityBar.tsx
"use client";

import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { copy } from "@/lib/copy";

function IconTelegram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 14l11 -11" />
      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 .1l-3.5 -7l-7 -3.5a.55 .55 0 0 1 .1 -1z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M16.5 7.5l0 .01" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  );
}

export function SocialPill({ className = "" }: { className?: string }) {
  const social = [
    { href: copy.contacts.links.emailHref, label: "Email", icon: <IconMail className="block h-4 w-4" /> },
    {
      href: copy.contacts.social.telegram.href,
      label: copy.contacts.social.telegram.label,
      icon: <IconTelegram className="block h-4 w-4 scale-[0.92]" />,
    },
    {
      href: copy.contacts.social.instagram.href,
      label: copy.contacts.social.instagram.label,
      icon: <IconInstagram className="block h-4 w-4" />,
    },
  ];

  return (
    <div
      className={[
        "inline-flex items-center gap-0.5 rounded-full border p-[3px] backdrop-blur",
        "border-zinc-900/15 bg-white/70 text-zinc-950",
        "dark:border-white/15 dark:bg-black/20 dark:text-white",
        className,
      ].join(" ")}
    >
      {social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="inline-flex h-8 w-8 items-center justify-center text-current/85 hover:text-[color:var(--accent)]"
        >
          <span className="grid h-4 w-4 place-items-center">{s.icon}</span>
        </a>
      ))}
    </div>
  );
}

export default function HeroUtilityBar() {
  return (
    <div data-hero-bar data-reveal="up" data-reveal-delay="4" className="mt-5 hidden md:block">
      <div className="inline-flex items-center gap-1.5">
        <div
          className={[
            "inline-flex items-center gap-2 rounded-full border p-[3px] backdrop-blur",
            "border-zinc-900/15 bg-white/70 text-zinc-950",
            "dark:border-white/15 dark:bg-black/20 dark:text-white",
          ].join(" ")}
        >
          <ThemeToggle />
        </div>

        <SocialPill />
      </div>
    </div>
  );
}
