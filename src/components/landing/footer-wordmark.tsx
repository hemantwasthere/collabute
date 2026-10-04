"use client";

import * as React from "react";

export function FooterWordmark() {
  const ref = React.useRef<HTMLDivElement>(null);

  function followPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      document.documentElement.dataset.motion === "off" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
  }

  return (
    <div
      ref={ref}
      className="footer-wordmark"
      aria-hidden="true"
      onPointerMove={followPointer}
    >
      {"collabute".split("").map((letter, index) => (
        <span
          key={index}
          style={{ "--letter-index": index } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
