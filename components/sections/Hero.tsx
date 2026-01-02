import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen scroll-mt-20">
            <Image
        src="/images/hero-elbrus.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Кавказ. Туры и впечатления.
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-white sm:text-lg">
          Каркас на Next.js + Tailwind. Дальше подключим Sanity, темы и анимации.
        </p>

        <div className="mt-8 flex gap-3">
          <a
            className="rounded-lg bg-[color:var(--primary-bg)] px-4 py-2 text-[color:var(--primary-fg)]"
            href="#tours"
          >
            Смотреть туры
          </a>

          <a
            className="rounded-lg border border-[color:var(--border)] px-4 py-2"
            href="#contacts"
          >
            Контакты
          </a>
        </div>
      </div>
    </section>
  );
}
