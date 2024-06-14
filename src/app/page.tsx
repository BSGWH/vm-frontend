import Header from "@/components/customer/layout/header";
import { Hero } from "@/components/customer/core/Hero";
import { HowItWorks } from "@/components/customer/core/HowItWorks";
import { Features } from "@/components/customer/core/Features";
import { Services } from "@/components/customer/core/Services";
import { FAQ } from "@/components/customer/core/FAQ";
import { Footer } from "@/components/customer/core/Footer";
{/* import { ScrollToTop } from "@/components/core/ScrollToTop"; */}


import "./index.css";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Services />
      <FAQ />
      <Footer />
      {/* <ScrollToTop /> */}
    </main>
  );
}
