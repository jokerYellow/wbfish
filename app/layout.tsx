import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navi from "./Navi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "latter",
  description: "read what you want",
};

export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 1,
  width:'device-width'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navi></Navi>
        <main className="container mx-auto mt-20 text-white">{children}</main>
      </body>
    </html>
  );
}
