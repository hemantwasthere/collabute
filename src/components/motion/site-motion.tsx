"use client";

import * as React from "react";

export function SiteMotion() {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle("is-in-view", isIntersecting);
          if (isIntersecting) target.classList.add("has-entered");
        });
      },
      { threshold: 0.08 },
    );
    const targets = document.querySelectorAll(
      ".section-frame, .tool-strip, .closing-cta, .site-footer, .product-showcase",
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
