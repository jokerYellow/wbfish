import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "weibo history",
  description: "history of weibo hot events",
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
        <header className="bg-blue-500 text-white text-center p-4 fixed top-0 w-full z-10">
          <Link href="/people">
            <span className="text-white">tomorrow</span>
          </Link>
          {" | "}
          <Link href="/">
            <span className="text-white">events</span>
          </Link>
        </header>
        <main className="container mx-auto mt-20 text-white">{children}</main>
      </body>
    </html>
  );
}
