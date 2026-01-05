import { copy } from "@/lib/copy";
import { Button } from "@/components/Button";

export default function Contacts() {
  const c = copy.contacts;

  return (
    <section
      id="contacts"
      className="bg-[color:var(--background)] min-h-[calc(100svh-var(--header-h))] scroll-mt-[var(--header-h)]"
    >
      {/* 3 строки по высоте: top (фикс), center (растягивается), bottom (фикс) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-72px)] grid grid-rows-[auto_1fr_auto]">
        <div id="contacts-anchor" className="h-px w-full" />

        {/* TOP */}
        <div className="pt-16 sm:pt-20">
          <div className="text-center">
            <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
              {c.eyebrow}
            </div>
          </div>

          {/* расстояние до контента */}
          <div className="mt-6 sm:mt-8" />
        </div>

        {/* CENTER (растягиваемый) */}
        <div className="min-h-0">
          <div className="h-full min-h-0 grid gap-6 lg:grid-cols-2 items-stretch">
            {/* LEFT: контакты (фикс) + карта (растягивается) */}
            <div className="h-full min-h-0 flex flex-col gap-6">
              {/* Контакты */}
              <div className="rounded-[32px] sm:rounded-[40px] border border-[color:var(--border)] bg-[color:var(--panel)]/80 backdrop-blur p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide text-[color:var(--foreground)]">
                  {c.titleLeft}
                </h3>

                <dl className="mt-5 grid gap-3 text-[15px] leading-snug">
                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.phoneLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.phone}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.emailLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.email}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.addressLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.address}</dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[color:var(--muted)]">{c.fields.hoursLabel}</dt>
                    <dd className="text-[color:var(--foreground)]">{c.values.hours}</dd>
                  </div>
                </dl>
              </div>

              {/* Карта — ДОБИРАЕТ остаток высоты до низа формы */}
              <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[color:var(--border)] bg-[color:var(--panel)]/80 flex-1 min-h-0">
                <iframe
                  title={c.map.title}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={c.map.src}
                />
              </div>
            </div>

            {/* RIGHT: форма — занимает всю высоту CENTER */}
            <div className="rounded-[32px] sm:rounded-[40px] border border-[color:var(--border)] bg-[color:var(--panel)]/80 backdrop-blur p-6 sm:p-8 h-full min-h-0 flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide text-[color:var(--foreground)]">
                {c.titleRight}
              </h3>

              <form className="mt-6 flex flex-col gap-4 flex-1 min-h-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm text-[color:var(--foreground)]/80">
                      {c.form.name}
                    </span>
                    <input
                      className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--input)] px-4 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.namePlaceholder}
                      name="name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm text-[color:var(--foreground)]/80">
                      {c.form.phone}
                    </span>
                    <input
                      className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--input)] px-4 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.phonePlaceholder}
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm text-[color:var(--foreground)]/80">
                    {c.form.email}
                  </span>
                  <input
                    className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--input)] px-4 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                    placeholder={c.form.emailPlaceholder}
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                {/* Растягиваемая зона под сообщение */}
                <label className="grid gap-2 flex-1 min-h-0">
                  <span className="text-sm text-[color:var(--foreground)]/80">
                    {c.form.message}
                  </span>
                  <textarea
                    className="h-full min-h-[140px] resize-none rounded-2xl border border-[color:var(--border)] bg-[color:var(--input)] px-4 py-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                    placeholder={c.form.messagePlaceholder}
                    name="message"
                  />
                </label>

                <div className="pt-2">
                  <Button type="submit" className="w-full uppercase tracking-wide">
                    {c.form.submit}
                  </Button>
                </div>

                <p className="text-xs leading-5 text-[color:var(--muted)]">
                  {c.form.consent}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pb-16 sm:pb-20" />
      </div>
    </section>
  );
}
