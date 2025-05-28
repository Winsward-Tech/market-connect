"use client";

import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { usePathname } from "next/navigation";

// List of paths that should not show the header and bottom nav
const publicPaths = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

export function NavigationLayout({ children }) {
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
