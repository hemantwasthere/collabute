import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/landing/feature-sections";
import { site } from "@/lib/site";

const plans = [
  {
    name: "Free",
    description: "A little less busywork, just for you.",
    price: "$0",
    period: "/ forever",
    detail: "One seat. No credit card required.",
    features: [
      "30 meetings each month",
      "100 AI actions each month",
      "Meeting recaps and Q&A",
      "Google Calendar and Notion",
    ],
    cta: "Start for free",
    href: site.signup,
    featured: false,
  },
  {
    name: "Pro",
    description: "For teams ready to find their flow.",
    price: "$24",
    period: "/ seat / month",
    detail: "Billed monthly. 14-day free trial.",
    features: [
      "Everything in Free",
      "Unlimited meetings and AI actions",
      "Drafted tasks and follow-ups",
      "Slack, Linear, Jira, and Teams",
    ],
    cta: "Try Pro for free",
    href: site.signup,
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Your team’s scale. Your requirements.",
    price: "Let’s talk",
    period: "",
    detail: "Annual contracts. Volume pricing.",
    features: [
      "Custom integrations",
      "Dedicated success manager",
      "Uptime SLA",
      "Procurement and legal review",
    ],
    cta: "Talk to the team",
    href: "https://collabute.ai/pricing",
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-frame pricing-section">
      <SectionLabel number="04">ROOM TO GROW</SectionLabel>
      <div className="section-heading">
        <h2>
          Start small.
          <br />
          <span className="serif-accent">Move forward together.</span>
        </h2>
        <p>
          Find your flow for free.
          <br />
          Bring the whole team when you’re ready.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-card ${plan.featured ? "featured-plan" : ""}`}
          >
            <div className="flex items-center justify-between">
              <h3>{plan.name}</h3>
              {plan.featured && (
                <span className="popular-label">FOR YOUR TEAM</span>
              )}
            </div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              {plan.price}
              <span>{plan.period}</span>
            </div>
            <p className="plan-detail">{plan.detail}</p>
            <Button
              asChild
              variant={plan.featured ? "default" : "outline"}
              className="w-full justify-between"
            >
              <a href={plan.href}>
                {plan.cta}
                <ArrowUpRight />
              </a>
            </Button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Need SSO, security review, and priority support?{" "}
        <a href="https://collabute.ai/pricing">
          Explore Business <ArrowUpRight className="inline size-3" />
        </a>
      </p>
    </section>
  );
}
