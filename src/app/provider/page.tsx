import Header from "@/components/provider/nav/header";
import { Hero } from "@/components/provider/homepage/Hero";
import { HowItWorks } from "@/components/provider/homepage/HowItWorks";
import { Pricing } from "@/components/provider/homepage/Pricing";
import { FAQ } from "@/components/provider/homepage/FAQ";
import { Footer } from "@/components/customer/core/Footer";
import "./index.css";
// import { ScrollToTop } from "@/components/core/ScrollToTop";
// import { Button } from "@/components/ui/button";


export default function Home() {
    return (
        <main>
            <Header /> 
            <Hero />
            <HowItWorks />
            <Pricing />
            <FAQ />
            <Footer />
            {/* <ScrollToTop /> */}
        </main>
    );
}
