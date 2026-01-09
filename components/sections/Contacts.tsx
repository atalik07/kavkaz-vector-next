"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";

function FieldLabel({ children }: { children: string }) {
  return <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">{children}</div>;
}

export default function Contacts() {
  const [sent, setSent] = useState(false);

  const telegramHref = copy.contacts.social.telegram.href;

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Запрос условий / расчёта — ОптМебельЮг");
    const body = encodeURIComponent(
      [
        "Здравствуйте!",
        "",
        "Хочу запросить условия/расчёт.",
        "",
        "1) Вы (ЮЛ/ИП) + город:",
        "2) Канал (маркетплейсы/опт/магазин/студия):",
        "3) Что нужно произвести (позиции):",
        "4) Объём/партия:",
        "5) Есть ли ТЗ/чертежи/ссылка на аналог:",
        "6) Требования к упаковке/маркировке (если есть):",
        "7) Точка отгрузки (ТК/склад/фулфилмент):",
        "8) Сроки:",
        "",
        "Контакты для связи:",
      ].join("\n")
    );

    // у тебя уже есть mailto в links.emailHref
    return `${copy.contacts.links.emailHref}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div data-reveal="up">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
          {copy.contacts.eyebrow}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* LEFT: контакты */}
        <div className="ui-card border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.contacts.titleLeft}</h2>

          <div className="mt-6 space-y-5 text-sm">
            <div>
              <FieldLabel>{copy.contacts.fields.phoneLabel}</FieldLabel>
              <a
                href={copy.contacts.links.phoneHref}
                className="mt-1 block text-base font-semibold text-black/85 hover:text-[color:var(--accent)] dark:text-white/85"
              >
                {copy.contacts.values.phone}
              </a>
            </div>

            <div>
              <FieldLabel>{copy.contacts.fields.emailLabel}</FieldLabel>
              <a
                href={copy.contacts.links.emailHref}
                className="mt-1 block text-base font-semibold text-black/85 hover:text-[color:var(--accent)] dark:text-white/85"
              >
                {copy.contacts.values.email}
              </a>
            </div>

            <div>
              <FieldLabel>{copy.contacts.fields.addressLabel}</FieldLabel>
              <div className="mt-1 text-black/70 dark:text-white/70">{copy.contacts.values.address}</div>
            </div>

            <div>
              <FieldLabel>{copy.contacts.fields.hoursLabel}</FieldLabel>
              <div className="mt-1 text-black/70 dark:text-white/70">{copy.contacts.values.hours}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={telegramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
              onClick={() => setSent(true)}
            >
              {copy.contacts.social.telegram.label}
            </a>

            <a
              href={mailto}
              className="inline-flex h-11 items-center justify-center ui-btn border border-black/15 px-6 text-sm font-semibold transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              onClick={() => setSent(true)}
            >
              Написать на Email
            </a>
          </div>

          {sent ? (
            <div className="mt-4 text-sm text-black/60 dark:text-white/70">
              Сообщение можно отправить в Telegram или на Email. Для расчёта укажите позиции, партию, точку отгрузки и сроки.
            </div>
          ) : null}
        </div>

        {/* RIGHT: форма + карта */}
        <div className="ui-card border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
          <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.contacts.titleRight}</h3>

          <form
            className="mt-6 grid grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Быстрое MVP: открываем Telegram группу (или можно собрать текст и открыть mailto)
              window.open(telegramHref, "_blank", "noopener,noreferrer");
              setSent(true);
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder={copy.contacts.form.namePlaceholder}
                aria-label={copy.contacts.form.name}
                className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
              />
              <input
                name="phone"
                placeholder={copy.contacts.form.phonePlaceholder}
                aria-label={copy.contacts.form.phone}
                className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
              />
            </div>

            <input
              name="email"
              placeholder={copy.contacts.form.emailPlaceholder}
              aria-label={copy.contacts.form.email}
              className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
            />

            <textarea
              name="message"
              placeholder={copy.contacts.form.messagePlaceholder}
              aria-label={copy.contacts.form.message}
              rows={5}
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
            />

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center ui-btn bg-[color:var(--accent)] px-6 text-sm font-semibold text-black transition hover:opacity-95"
            >
              {copy.contacts.form.submit}
            </button>

            <div className="text-xs text-black/60 dark:text-white/60">
              {copy.contacts.form.consent}
            </div>
          </form>

          <div className="mt-8 overflow-hidden ui-card border border-black/10 dark:border-white/15">
            <div className="px-4 py-3 text-sm font-semibold">{copy.contacts.map.title}</div>
            <iframe
              title={copy.contacts.map.title}
              src={copy.contacts.map.src}
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
