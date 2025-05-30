"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

// List of paths that should not show the header and bottom nav
const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-pin"];

export function ClientWrapper({ children }) {
  const pathname = usePathname();
  const shouldShowNav = !publicPaths.includes(pathname);

  return (
    <>
      {shouldShowNav && <Header />}
      <main className={shouldShowNav ? "pt-16 pb-16" : ""}>{children}</main>
      {shouldShowNav && <BottomNav />}
    </>
  );
}
