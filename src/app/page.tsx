import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { VSLSection } from "@/components/sections/VSLSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { TargetAudienceSection } from "@/components/sections/TargetAudienceSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SystemOverviewSection } from "@/components/sections/SystemOverviewSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { AIAgentDemo } from "@/components/sections/AIAgentDemo";
import { DeliverablesSection } from "@/components/sections/DeliverablesSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { ImplementationSteps } from "@/components/sections/ImplementationSteps";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { faq } from "@/config/content";
import { SEO, SITE_URL } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "FATIMA — Immobilier Growth System",
      serviceType: "Système d'acquisition et de conversion de clients immobiliers",
      description: SEO.description,
      areaServed: { "@type": "Country", name: "Algérie" },
      url: SITE_URL,
      provider: { "@type": "Organization", name: "FATIMA", url: SITE_URL },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="contenu" className="relative">
        <HeroSection />
        <VSLSection />
        <TrustBar />
        <BeforeAfterSection />
        <TargetAudienceSection />
        <ProblemSection />
        <SystemOverviewSection />
        <ModulesSection />
        <JourneySection />
        <AIAgentDemo />
        <DeliverablesSection />
        <OfferSection />
        <ImplementationSteps />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
