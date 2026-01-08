// app/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Tours from "@/components/sections/Tours";
import About from "@/components/sections/About";
import Contacts from "@/components/sections/Contacts";
import InView from "@/components/InView";

export default function HomePage() {
  return (
    <>
      <Header />
      <InView />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="services">
          <Tours />
        </section>

        <section id="formats">
          {/* reuse Tours section content blocks already include segments/steps/terms.
              Formats will be added next if needed */}
        </section>

        <section id="production">
          <About />
        </section>

        <section id="logistics">
          {/* logistics already in About. Keep anchor for menu */}
        </section>

        <section id="portfolio">
          {/* portfolio will be added next */}
        </section>

        <section id="contacts">
          <Contacts />
        </section>
      </main>

      <Footer />
    </>
  );
}
