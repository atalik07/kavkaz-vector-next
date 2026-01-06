import { copy } from "@/lib/copy";
import { Button } from "@/components/Button";

export default function Contacts() {
  const c = copy.contacts;

  return (
    <div className="bg-[color:var(--background)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
            {c.eyebrow}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 grid gap-6 lg:grid-cols-2">
          {/* LEFT: contacts + map */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur">
              <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-3 sm:pb-4">
                <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                  {c.titleLeft}
                </h3>

                <dl className="mt-2 grid gap-2 text-sm sm:text-[15px] leading-snug">
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
            </div>

            <div className="rounded-3xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)]/80">
              <iframe
                title={c.map.title}
                className="block h-[260px] w-full sm:h-[320px] lg:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={c.map.src}
              />
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur">
            <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                {c.titleRight}
              </h3>

              <form className="mt-3 sm:mt-4 grid gap-3 sm:gap-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="pl-3 text-sm text-[color:var(--muted)]">
                      {c.form.name}
                    </span>
                    <input
                      className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.namePlaceholder}
                      name="name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="pl-3 text-sm text-[color:var(--muted)]">
                      {c.form.phone}
                    </span>
                    <input
                      className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                      placeholder={c.form.phonePlaceholder}
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="pl-3 text-sm text-[color:var(--muted)]">
                    {c.form.email}
                  </span>
                  <input
                    className="h-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                    placeholder={c.form.emailPlaceholder}
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="pl-3 text-sm text-[color:var(--muted)]">
                    {c.form.message}
                  </span>
                  <textarea
                    className="h-[112px] resize-none rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-[color:var(--foreground)] outline-none focus:border-[color:var(--accent)]"
                    placeholder={c.form.messagePlaceholder}
                    name="message"
                  />
                </label>

                <div className="pt-1">
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
      </div>
    </div>
  );
}
