"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { SocialPill } from "@/components/HeroUtilityBar";

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

function FieldLabel({ children }: { children: string }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
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

    return `${copy.contacts.links.emailHref}?subject=${subject}&body=${body}`;
  }, []);

  return (
<section className="w-full bg-[#ddd6cc]/30 dark:bg-[#2d2f31]/50">
  <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* 1) Заголовок/eyebrow с отступом слева как в About/Advantages */}
      <div className="pl-10" data-reveal="up">
        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
          {copy.contacts.eyebrow}
        </div>
      </div>

      <div className="space-y-6">
      {/* 2) Верхняя карточка: заголовок сверху, 2 колонки, кнопка+текст снизу */}
{/* TOP: форма — без внешней рамки/карточности */}
<div className="p-6 sm:p-8" data-reveal="up">
  <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
    {copy.contacts.titleRight}
  </h3>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      window.open(telegramHref, "_blank", "noopener,noreferrer");
      setSent(true);
    }}
    className="mt-9"
  >
    {/* 2 колонки одинаковой высоты на lg */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
      {/* LEFT: поля */}
      <div className="grid grid-cols-1 gap-4">
        <label className="space-y-2">
          <div className="px-4 text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
            Обращение <span className="text-[color:var(--accent)]">*</span>
          </div>
          <input
            name="name"
            required
            placeholder={copy.contacts.form.namePlaceholder}
            aria-label={copy.contacts.form.name}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
          />
        </label>

        <label className="space-y-2">
          <div className="px-4 text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
            Телефон <span className="text-[color:var(--accent)]">*</span>
          </div>
          <input
            name="phone"
            required
            placeholder={copy.contacts.form.phonePlaceholder}
            aria-label={copy.contacts.form.phone}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
          />
        </label>

        <label className="space-y-2">
          <div className="px-4 text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
            Email{" "}
            <span className="font-normal normal-case tracking-normal">
              (необязательно)
            </span>
          </div>
          <input
            name="email"
            placeholder={copy.contacts.form.emailPlaceholder}
            aria-label={copy.contacts.form.email}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5"
          />
        </label>
      </div>

      {/* RIGHT: сообщение — растягиваем через flex на высоту строки */}
      <div className="h-full min-h-0">
        <div className="flex h-full min-h-0 flex-col gap-2">
          <div className="px-4 text-sm font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
            Сообщение{" "}
            <span className="font-normal normal-case tracking-normal">
              (необязательно)
            </span>
          </div>

          <textarea
            name="message"
            placeholder={copy.contacts.form.messagePlaceholder}
            aria-label={copy.contacts.form.message}
            className={[
              "w-full flex-1 min-h-0 rounded-xl border border-black/10 bg-white px-4 py-3 text-base outline-none",
              "focus:border-[color:var(--accent)] dark:border-white/15 dark:bg-white/5",
              "resize-none overflow-y-auto",
              "h-[220px] lg:h-auto",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
{/* divider */}
<div className="mt-6 h-px w-full bg-black/10 dark:bg-white/10" />

    {/* bottom row: кнопка + текст справа */}
    <div className="px-4 mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
      <button
        type="submit"
        className="inline-flex h-11 w-full sm:w-auto items-center justify-center ui-btn bg-[color:var(--accent)] px-10 text-base font-semibold text-black transition hover:opacity-95"
      >
        {copy.contacts.form.submit}
      </button>

      <div className="text-sm leading-relaxed text-black/60 dark:text-white/60 sm:max-w-[639px]">
        {copy.contacts.form.consent}
      </div>
    </div>

    {sent ? (
      <div className="mt-4 text-base text-black/60 dark:text-white/70">
        Сообщение можно отправить в Telegram или на Email. Для расчёта укажите позиции, партию,
        точку отгрузки и сроки.
      </div>
    ) : null}
  </form>
</div>

        

        {/* 3) Ниже две карточки: контакты слева, карта справа; одинаковая высота (ориентир — контакты) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-reveal="up">
          {/* LEFT: контакты */}
          <div className="ui-card border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {copy.contacts.titleLeft}
            </h2>

            <div className="mt-6 space-y-5 text-base">
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
                <div className="mt-1 text-base font-semibold text-black/85 dark:text-white/85">
                  {copy.contacts.values.address}
                </div>

              </div>

              <div>
                <FieldLabel>{copy.contacts.fields.hoursLabel}</FieldLabel>
                <div className="mt-1 text-base font-semibold text-black/85 dark:text-white/85">
                  {copy.contacts.values.hours}
                </div>
              </div>
            </div>

<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <a
    href={telegramHref}
    target="_blank"
    rel="noreferrer"
    onClick={() => setSent(true)}
    className="inline-flex h-11 w-full items-center justify-center gap-2 ui-btn bg-[color:var(--accent)] px-6 text-base font-semibold text-black transition hover:opacity-95 sm:w-auto sm:justify-start"
  >
    <IconTelegram className="h-4 w-4" />
    {copy.contacts.cta.telegramGroup}
  </a>

  <SocialPill className="self-center sm:self-auto shrink-0" />
</div>


          </div>

          {/* RIGHT: карта — делаем высоту как у карточки контактов */}
          <div className="ui-card border border-black/10 bg-white shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none overflow-hidden flex flex-col">
<div className="px-6 pt-6 pb-3">
  <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
    {copy.contacts.map.title}
  </h2>
</div>


            <div className="px-6 pb-6 flex-1">
              <div className="h-full overflow-hidden ui-card border border-black/10 dark:border-white/15">
                <iframe
                  title={copy.contacts.map.title}
                  src={copy.contacts.map.src}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* (мобилка) — по умолчанию всё уже будет друг под другом: форма, контакты, карта */}
      </div>
      </div>
    </section>
  );
}
