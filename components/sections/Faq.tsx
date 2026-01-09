import { copy } from "@/lib/copy";

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div data-reveal="up">
        <Eyebrow>{copy.faq.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.faq.title}</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {copy.faq.items.map((q) => (
          <details
            key={q.q}
            className="group ui-card border border-black/10 bg-white p-6 shadow-sm open:shadow-md dark:border-white/15 dark:bg-white/5 dark:shadow-none"
          >
            <summary className="cursor-pointer list-none text-base font-semibold tracking-tight">
              {q.q}
            </summary>
            <div className="mt-3 text-sm text-black/70 leading-relaxed dark:text-white/70">{q.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
