"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand-mark";

export function BrandLink({
  home = false,
  onNavigate,
}: {
  home?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={home ? "/#top" : "#top"}
      aria-label={home ? "Collabute home" : "Collabute — back to top"}
      className="text-primary"
      onClick={(event) => {
        onNavigate?.();
        if (!home || pathname === "/") {
          event.preventDefault();
          const reduced =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            document.documentElement.dataset.motion === "off";
          window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
          const url = new URL(window.location.href);
          url.hash = "top";
          window.history.replaceState(null, "", url);
        }
      }}
    >
      <Wordmark />
    </Link>
  );
}
