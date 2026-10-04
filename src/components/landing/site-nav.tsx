"use client";

import * as React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLink } from "@/components/brand-link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <BrandLink home onNavigate={() => setOpen(false)} />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href="https://collabute.ai/login"
            className="nav-link hidden sm:block"
          >
            Log in
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={site.signup}>
              Get started <ArrowUpRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav lg:hidden"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <ArrowUpRight className="size-4" />
            </a>
          ))}
          <a href={site.docs}>
            Documentation
            <ArrowUpRight className="size-4" />
          </a>
          <a href="https://collabute.ai/login">
            Log in
            <ArrowUpRight className="size-4" />
          </a>
          <Button asChild className="mt-3">
            <a href={site.signup}>
              Get started <ArrowUpRight />
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
