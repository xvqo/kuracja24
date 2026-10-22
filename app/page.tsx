import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Clinics } from '@/components/Clinics';
import { Physio } from '@/components/Physio';
import { Nfz } from '@/components/Nfz';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clinics />
        <Physio />
        <Nfz />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
