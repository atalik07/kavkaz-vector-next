import { copy } from "@/lib/copy";

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/60">
      {children}
    </div>
  );
}

export default function Logistics() {
  return (
    <section id="logistics" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div data-reveal="up">
        <Eyebrow>{copy.logistics.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.logistics.title}</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {copy.logistics.items.map((text) => (
          <div
            key={text}
            className="ui-card border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5 dark:shadow-none"
          >
            <div className="text-sm text-black/70 dark:text-white/70">{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
