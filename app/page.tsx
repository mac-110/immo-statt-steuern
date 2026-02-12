import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import TruthSection from "@/components/TruthSection";
import SystemSection from "@/components/SystemSection";
import Testimonials from "@/components/Testimonials";
import Steps from "@/components/Steps";
import ForWhom from "@/components/ForWhom";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Calculator />
      <TruthSection />
      <SystemSection />
      <Testimonials />
      <Steps />
      <ForWhom />
      <LeadForm />
      <Footer />
    </main>
  );
}
