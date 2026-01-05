import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Tours from "@/components/sections/Tours";
import About from "@/components/sections/About";
import Contacts from "@/components/sections/Contacts";
import SnapScrollGsap from "@/components/SnapScrollGsap";

export default function HomePage() {
  return (
    <>
      {/* Менеджер поэкранного скролла для desktop */}
      <SnapScrollGsap untilId="contacts" />

      <Header />

      <Hero />

      <main className="pt-16 sm:pt-[72px]">
        <Tours />
        <About />
        <Contacts />
        <Footer />
      </main>
    </>
  );
}

