import type { Metadata } from "next";
import "./globals.css";

import { satoshi } from "@/utils/font";
import PopUnderAds from "@/components/PopUnderAds";
import BannerAds from "@/components/BannerAds";

export const metadata: Metadata = {
  title: "Nutty Vibes",
  description: "Best website for your amazing Adult content",
  icons: "/logo.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="6a97888e-site-verification"
          content="96a5010eea1435db6f7abdbdb276d15e"
        ></meta>
      </head>
      <body className={`${satoshi.className} bg-[#181717] text-white`}>
        {children}
        <PopUnderAds />
      </body>
    </html>
  );
}
