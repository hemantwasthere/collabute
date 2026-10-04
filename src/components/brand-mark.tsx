import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  variant,
}: {
  className?: string;
  variant?: "current" | "original";
}) {
  return (
    <span
      className={cn("brand-mark inline-flex size-8 shrink-0", className)}
      data-logo-variant={variant}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="brand-mark-current size-full"
      >
        <path
          d="M14 3H7v7H0v12h7v7h7v-9H9v-8h5V3Zm4 0h7v7h7v12h-7v7h-7v-9h5v-8h-5V3Z"
          fill="currentColor"
        />
      </svg>
      <Image
        src="/collabute-original.png"
        width={32}
        height={32}
        alt=""
        className="brand-mark-original size-full rounded-[25%]"
      />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[25px] font-semibold tracking-[-1.4px]",
        className,
      )}
    >
      <BrandMark className="size-7" />
      collabute<span className="mb-3 -ml-1 text-[10px] tracking-normal">®</span>
    </span>
  );
}
