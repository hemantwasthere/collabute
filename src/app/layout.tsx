import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import { ThemeToolbar } from "@/components/dev/theme-toolbar";
import { SiteMotion } from "@/components/motion/site-motion";
import { themeBootstrap } from "@/lib/themes";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Collabute — Your context. In motion.",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Collabute — Your context. In motion.",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collabute — Your context. In motion.",
    description: site.description,
  },
};

export const viewport: Viewport = { themeColor: "#f8f9f4" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrap(
              process.env.NODE_ENV === "development" ||
                process.env.VERCEL_ENV === "preview" ||
                process.env.NEXT_PUBLIC_THEME_PREVIEW === "true",
            ),
          }}
        />
      </head>
      <body>
        {children}
        <SiteMotion />
        <ThemeToolbar />
      </body>
    </html>
  );
}
