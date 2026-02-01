import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PixelDogProvider } from "@/contexts/PixelDogRefContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "Joost Kaan",
  description: "Personal website of Joost Kaan",
  openGraph: {
    title: "Joost Kaan",
    description: "Personal website of Joost Kaan",
    url: "https://joostkw.nl",
    siteName: "Joost Kaan",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-zinc-200`}
      >
        <PixelDogProvider>{children}</PixelDogProvider>
      </body>
    </html>
  );
}
