import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { CommandIndex } from "@/components/ui/command-index";
import { portfolio } from "@/data/portfolio";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

// Fraunces with its SOFT axis at 100 (rounded, less sharp terminals), instanced and
// subset with fontTools: the roman keeps opsz 12–72 and weights 300–600; the italic
// is a display cut pinned at opsz 48. Latin plus Irish fadas and punctuation. OFL.
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "./fonts/fraunces-soft-roman.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/fraunces-soft-italic.woff2", weight: "300 500", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${portfolio.name}`,
  },
  description: siteDescription,
  applicationName: `${portfolio.name}`,
  authors: [{ name: portfolio.name, url: siteUrl }],
  creator: portfolio.name,
  keywords: [
    "Ryan Cullen",
    "Trinity College Dublin",
    "Computer Science and Business",
    "TheoryPrep",
    "Irish driving theory test",
    "software developer Dublin",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: portfolio.firstName,
    lastName: portfolio.lastName,
    username: portfolio.githubUsername,
    locale: "en_IE",
    url: "/",
    siteName: portfolio.name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  verification: {
    google: "PixwOgN0g50RGNFqMnkZzznRkTzyYZMeVPdH5Tj3EMU",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe4" },
    { media: "(prefers-color-scheme: dark)", color: "#12110e" },
  ],
};

// Runs before first paint so the saved edition never flashes the wrong theme.
const themeScript = `(()=>{try{var t=localStorage.getItem("portfolio-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IE"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <CommandIndex />
      </body>
    </html>
  );
}
