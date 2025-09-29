import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
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
        className={`${inter.className} ${jost.variable} ${geistSans.variable} ${geistMono.variable} max-w-[1800px] mx-auto antialiased`}
      >
         <Toaster
            richColors
            toastOptions={{
              classNames: {
                success: 'bg-green-50 text-green-800 border border-green-300',
                error: 'bg-red-50 text-red-800 border border-red-300',
                info: 'bg-blue-50 text-blue-800 border border-blue-300',
                warning: 'bg-yellow-50 text-yellow-800 border border-yellow-300',
                default: 'bg-gray-50 text-gray-800 border border-gray-300',
              },
            }}
          />
        {children}
      </body>
    </html>
  );
}
