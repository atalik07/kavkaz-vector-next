export default function Hero() {
  return (
    <section id="hero" className="min-h-screen scroll-mt-20">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Кавказ. Туры и впечатления.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-black/70 sm:text-lg">
          Каркас на Next.js + Tailwind. Дальше подключим Sanity, темы и анимации.
        </p>
        <div className="mt-8 flex gap-3">
          <a className="rounded-lg bg-black px-4 py-2 text-white" href="#tours">
            Смотреть туры
          </a>
          <a className="rounded-lg border border-black/20 px-4 py-2" href="#contacts">
            Контакты
          </a>
        </div>
      </div>
    </section>
  );
}
