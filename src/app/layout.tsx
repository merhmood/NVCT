import type { Metadata } from "next";
import "./globals.css";

import { satoshi } from "@/utils/font";
import PopUnderAds from "@/components/PopUnderAds";
import BannerAds from "@/components/BannerAds";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      <body
        className={`${satoshi.className} bg-[#181717] text-white flex flex-col justify-between h-screen`}
      >
        <Navigation />
        <div className="w-11/12 lg:w-5/6 max-w-5xl h-fit mx-auto">
          {children}
        </div>
        <Footer />
        <PopUnderAds />
      </body>
    </html>
  );
}
