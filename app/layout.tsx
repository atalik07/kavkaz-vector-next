import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const gilroyDisplay = localFont({
  variable: "--font-gilroy-display",
  src: [
    { path: "../public/fonts/gilroy-bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/gilroy-extrabold.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
});

const gilroySubhead = localFont({
  variable: "--font-gilroy-subhead",
  src: [{ path: "../public/fonts/gilroy-regular.ttf", weight: "400", style: "normal" }],
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: copy.seo.title,
    template: `%s — ${copy.seo.title}`,
  },
  description: copy.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
<body
    className={`${gilroyDisplay.variable} ${gilroySubhead.variable} 
    antialiased bg-[var(--background)] text-[var(--foreground)]`}
  >
  <ThemeProvider>{children}</ThemeProvider>
</body>

    </html>
  );

}
