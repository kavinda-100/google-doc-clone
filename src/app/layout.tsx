import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import React from "react";
import TanstackProvider from "../providers/TanstackProvider";

export const metadata: Metadata = {
  title: "Goggle Docs",
  description: "Goggle Docs clone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body>
        <TanstackProvider>
          {children}
          <Toaster closeButton />
        </TanstackProvider>
      </body>
    </html>
  );
}
