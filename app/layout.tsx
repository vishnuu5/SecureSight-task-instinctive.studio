import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureSight - CCTV Monitoring Dashboard",
  description:
    "Advanced CCTV monitoring software with AI-powered threat detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 min-h-screen w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
