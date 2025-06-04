"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ClientWrapper } from "@/components/client-wrapper";
import { TranslationProvider } from "@/lib/TranslationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <TranslationProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </TranslationProvider>
      </body>
    </html>
  );
}
