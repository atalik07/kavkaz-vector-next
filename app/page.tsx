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

      {/* Hero без отступа — начинается от верхней границы экрана */}
      <Hero />

      {/* Всё остальное с отступом под fixed-хедер */}
      <main className="pt-16 sm:pt-[72px]">
        <Tours />
        <About />
        <Contacts />
        <Footer />
      </main>
    </>
  );
}
