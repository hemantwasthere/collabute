import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoDialog } from "@/components/landing/demo-dialog";
import { FaqSection } from "@/components/landing/faq-section";
import {
  ClosingCta,
  Features,
  HowItWorks,
  Integrations,
  Security,
  ToolStrip,
} from "@/components/landing/feature-sections";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProductPreview } from "@/components/landing/product-preview";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="page-shell">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <span className="hero-coordinate coordinate-left">
            01 / CONNECTED BY CONTEXT
          </span>
          <span className="hero-coordinate coordinate-right">
            BUILT FOR WHAT’S NEXT ↗
          </span>
          <div className="hero-copy">
            <a href="#how-it-works" className="hero-badge">
              <span className="status-dot" />
              Meet your team’s new AI teammate
              <ArrowUpRight className="size-3" />
            </a>
            <h1>
              Your team’s context.
              <br />
              <span className="serif-accent">Already in motion.</span>
            </h1>
            <p>
              The decisions, the details, the “did anyone follow up?”
              <br className="hidden sm:block" /> Collabute connects it all and
              moves the work forward.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href={site.signup}>
                  Start building momentum
                  <ArrowUpRight />
                </a>
              </Button>
              <DemoDialog />
            </div>
            <div className="hero-assurances">
              <span>
                <Check />
                Free to get started
              </span>
              <span>
                <Check />
                Works with your tools
              </span>
              <span>
                <Check />
                No meeting bots
              </span>
            </div>
          </div>
          <div className="hero-margin-label" aria-hidden="true">
            LESS FRICTION. MORE FLOW.
          </div>
          <ProductPreview />
          <a
            href="#how-it-works"
            className="hero-scroll"
            aria-label="Explore how Collabute works"
          >
            <ArrowDown className="size-3" />
          </a>
        </section>
        <ToolStrip />
        <HowItWorks />
        <Features />
        <Integrations />
        <Security />
        <PricingSection />
        <FaqSection />
        <ClosingCta />
        <SiteFooter />
      </main>
    </div>
  );
}
