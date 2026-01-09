import { copy } from "@/lib/copy";

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div data-reveal="up">
        <Eyebrow>{copy.portfolio.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.portfolio.title}</h2>
        <p className="mt-4 max-w-2xl text-sm text-black/70 dark:text-white/70">
          {copy.portfolio.placeholder}
        </p>
      </div>

      <div className="mt-8 ui-card border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none">
        <div className="text-sm text-black/70 dark:text-white/70">
          Скоро добавим кейсы, фото и примеры изделий.
        </div>
      </div>
    </section>
  );
}
