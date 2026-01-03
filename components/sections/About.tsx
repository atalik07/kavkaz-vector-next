import { copy } from "@/lib/copy";

export default function About() {
  return (
    <section id="about" className="min-h-screen scroll-mt-16 sm:scroll-mt-[72px]" >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.about.title}
        </h2>

        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
          {copy.about.descriptionPlaceholder}
        </p>
      </div>
    </section>
  );
}
