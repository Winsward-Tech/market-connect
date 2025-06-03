"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

export function ClientWrapper({ children }) {
  const pathname = usePathname();
  const shouldShowNav =
    pathname === "/home" ||
    pathname === "/marketplace" ||
    pathname === "/learning" ||
    pathname === "/community" ||
    pathname === "/profile";

  return (
    <>
      <main className={shouldShowNav ? "pb-16" : ""}>{children}</main>
      {shouldShowNav && <BottomNav />}
    </>
  );
}
