import { HeroSection } from "./landing/hero-section"
import { FeaturesSection } from "./landing/features-section"
import { DemoSection } from "./landing/demo-section"
import { StatsSection } from "./landing/stats-section"
import { TestimonialsSection } from "./landing/testimonials-section"
import { PricingSection } from "./landing/pricing-section"
import { CTASection } from "./landing/cta-section"
import { FooterSection } from "./landing/footer-section"


export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <FooterSection />
      </div>
    </div>
  )
}
