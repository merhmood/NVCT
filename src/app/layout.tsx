import type { Metadata } from "next";
import "./globals.css";

import { satoshi } from "@/utils/font";

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
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
