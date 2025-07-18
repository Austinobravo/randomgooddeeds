import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost, Inter } from "next/font/google";
import "./globals.css";
// import '@richaadgigi/stylexui/css/xui.css'; // Core CSS


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Random Good Deeds | A Xnyder Initiative",
  description: "Welcome to the affiliate part of life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${jost.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
