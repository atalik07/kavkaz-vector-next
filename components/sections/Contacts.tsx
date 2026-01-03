import { copy } from "@/lib/copy";

export default function Contacts() {
  return (
    <section
      id="contacts"
      className="min-h-screen scroll-mt-20 bg-[color:var(--background)]"
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.contacts.title}
        </h2>

        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
          {copy.contacts.descriptionPlaceholder}
        </p>
      </div>
    </section>
  );
}
