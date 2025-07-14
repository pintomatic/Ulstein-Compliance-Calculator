import { HeroSection } from '@/components/landing/hero-section';
import { TimelineSection } from '@/components/landing/timeline-section';
import { EtsCalculatorSection } from '@/components/landing/ets-calculator-section';
import { RoiCalculatorSection } from '@/components/landing/roi-calculator-section';
import { CaseStudiesSection } from '@/components/landing/case-studies-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { TrustStripSection } from '@/components/landing/trust-strip-section';
import { CtaBannerSection } from '@/components/landing/cta-banner-section';
import { ResourcesSection } from '@/components/landing/resources-section';
import { PageFooter } from '@/components/landing/footer';
import { StickyCta } from '@/components/sticky-cta';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <HeroSection />
        <TimelineSection />
        <EtsCalculatorSection />
        <RoiCalculatorSection />
        <CaseStudiesSection />
        <HowItWorksSection />
        <PricingSection />
        <TrustStripSection />
        <div className="py-12 md:py-20">
          <Separator className="w-1/2 mx-auto" />
        </div>
        <CtaBannerSection />
        <ResourcesSection />
      </main>
      <PageFooter />
      <StickyCta />
    </div>
  );
}
