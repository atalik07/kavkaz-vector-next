import Image from "next/image";
import { copy } from "@/lib/copy";
import { ButtonLink } from "@/components/Button";

export default function About() {
  return (
    <div className="bg-[color:var(--background)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[color:var(--muted)]">
            {copy.about.eyebrow}
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase">
            {copy.about.title}
          </h2>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 md:items-stretch md:h-[65svh] md:min-h-0">
          {/* Left image */}
          <div className="relative overflow-hidden rounded-3xl bg-black/10 md:h-full">
            <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full">
              <Image
                src="/images/about-jeep.webp"
                alt={copy.about.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right text */}
          <div className="md:pt-6 lg:pt-7 md:flex md:flex-col md:min-h-0 md:h-full">
            {/* Text area: clipped to available space */}
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-4 text-[15px] leading-snug text-[color:var(--muted)]">
                {copy.about.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-balance">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Button stays visible */}
            <div className="mt-6 shrink-0">
              <ButtonLink
                href={copy.about.ctaHref}
                variant="outline"
                size="md"
                className="uppercase tracking-wide"
              >
                {copy.about.ctaMore}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
