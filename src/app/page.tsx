import { FAQ } from "@/components/core/FAQ";
import { Features } from "@/components/core/Features";
import { Footer } from "@/components/core/Footer";
import { Hero } from "@/components/core/Hero";
import { HowItWorks } from "@/components/core/HowItWorks";
import { Pricing } from "@/components/core/Pricing";
import { ScrollToTop } from "@/components/core/ScrollToTop";
import { Services } from "@/components/core/Services";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import "./index.css";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Services />
      <Pricing />
      <FAQ />
      <Footer />
      {/* <ScrollToTop /> */}
    </main>
  );
}
