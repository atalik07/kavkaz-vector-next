import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Tours from "@/components/sections/Tours";
import About from "@/components/sections/About";
import Contacts from "@/components/sections/Contacts";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="tours">
          <Tours />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="contacts">
          <Contacts />
        </section>
      </main>

      <Footer />
    </>
  );
}
