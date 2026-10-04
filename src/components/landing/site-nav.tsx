"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
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
  const headerRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header" data-menu-open={open}>
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
            className="menu-toggle lg:hidden"
            ref={toggleRef}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-glyph" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </Button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className="mobile-nav lg:hidden"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <span className="mobile-nav-label">A LITTLE MORE CONNECTED</span>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight className="size-4" />
          </a>
        ))}
        <div className="mobile-nav-secondary">
          <a href={site.docs}>
            Documentation
            <ArrowUpRight className="size-4" />
          </a>
          <a href="https://collabute.ai/login">
            Log in
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <Button asChild className="mobile-nav-cta">
          <a href={site.signup}>
            Get started <ArrowUpRight />
          </a>
        </Button>
      </nav>
    </header>
  );
}
