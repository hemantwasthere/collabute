import { ArrowUpRight } from "lucide-react";
import { BrandLink } from "@/components/brand-link";
import { FooterWordmark } from "@/components/landing/footer-wordmark";
import { site } from "@/lib/site";

const groups = [
  {
    title: "PRODUCT",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About us", href: "https://collabute.ai/about" },
      { label: "Our thesis", href: "https://collabute.ai/thesis" },
      { label: "Get started", href: site.signup },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation", href: site.docs },
      { label: "Developers", href: `${site.docs}/developers` },
      { label: "Questions & answers", href: "#faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <BrandLink />
          <p>
            A little more connected.
            <br />A lot more possible.
          </p>
          <span className="footer-location">
            <span className="status-dot" />
            Built for teams that build.
          </span>
        </div>
        <div className="footer-links">
          {groups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                  {link.href.startsWith("https") && <ArrowUpRight />}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Collabute. All rights reserved.
        </span>
        <div>
          <a href="https://collabute.ai/privacy-policy">Privacy</a>
          <a href="https://collabute.ai/terms-and-conditions">Terms</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <FooterWordmark />
    </footer>
  );
}
