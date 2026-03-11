import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Menu from "@/components/Menu";
import Delivery from "@/components/Delivery";
import About from "@/components/About";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Menu />
      <Delivery />
      <About />
      <InquiryForm />
      <FAQ />
      <Footer />
    </main>
  );
}
