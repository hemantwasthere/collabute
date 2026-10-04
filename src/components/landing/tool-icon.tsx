import { cn } from "@/lib/utils";

export type ToolName =
  "slack" | "linear" | "notion" | "meet" | "teams" | "calendar";

export function ToolIcon({
  name,
  className,
}: {
  name: ToolName;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      {name === "slack" && (
        <svg viewBox="0 0 24 24" fill="none" className="size-full">
          <path
            d="M9 2v7H2"
            stroke="#36C5F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M22 9h-7V2"
            stroke="#2EB67D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M15 22v-7h7"
            stroke="#ECB22E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M2 15h7v7"
            stroke="#E01E5A"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {name === "linear" && (
        <svg viewBox="0 0 24 24" className="size-full" fill="currentColor">
          <path d="M3.15 5.15a10 10 0 0 0-1.06 2.38l14.38 14.38a10 10 0 0 0 2.38-1.06L3.15 5.15Zm-1.6 4.67a10 10 0 0 0 .04 3.11l9.48 9.48a10 10 0 0 0 3.11.04L1.55 9.82Zm1.43 6.76a10.06 10.06 0 0 0 4.44 4.44l-4.44-4.44ZM5.16 3.16l15.68 15.68A10 10 0 0 0 5.16 3.16Z" />
        </svg>
      )}
      {name === "notion" && (
        <svg viewBox="0 0 24 24" className="size-full" fill="none">
          <rect
            x="3"
            y="2"
            width="18"
            height="20"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M7 18V6h3l7 12V6M6 6h5m3 0h4M6 18h4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )}
      {name === "meet" && (
        <svg viewBox="0 0 24 24" className="size-full">
          <path fill="#00832D" d="m15 8 7-5v18l-7-5z" />
          <path fill="#2684FC" d="M2 6h13v12H2z" />
          <path fill="#00AC47" d="M2 18h13v4H5a3 3 0 0 1-3-3z" />
          <path fill="#EA4335" d="M2 6V4a2 2 0 0 1 2-2h3v4z" />
          <path fill="#FFBA00" d="M7 2h8v4H7z" />
        </svg>
      )}
      {name === "teams" && (
        <svg viewBox="0 0 24 24" className="size-full">
          <circle cx="14" cy="5" r="4" fill="#7B83EB" />
          <circle cx="21" cy="7" r="2.5" fill="#5059C9" />
          <path d="M11 11h12v6a4 4 0 0 1-8 0v-1h-4z" fill="#5059C9" />
          <path d="M7 10h13v8a6.5 6.5 0 0 1-13 0z" fill="#7B83EB" />
          <rect x="0" y="7" width="13" height="13" rx="1" fill="#464EB8" />
          <path d="M3 11h7M6.5 11v6" stroke="white" strokeWidth="1.6" />
        </svg>
      )}
      {name === "calendar" && (
        <svg viewBox="0 0 24 24" className="size-full">
          <path fill="#4285F4" d="M3 2h18v20H3z" />
          <path fill="white" d="M6 6h12v12H6z" />
          <path fill="#34A853" d="m18 18 3-3v7h-7z" />
          <path fill="#FBBC04" d="M3 18h11v4H3z" />
          <path fill="#EA4335" d="M3 2h4v4H3z" />
          <text x="7" y="15" fontSize="8" fill="#4285F4" fontFamily="Arial">
            31
          </text>
        </svg>
      )}
    </span>
  );
}
