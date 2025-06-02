"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

export function ClientWrapper({ children }) {
  const pathname = usePathname();
  const shouldShowNav = pathname === "/home";

  return (
    <>
      <main className={shouldShowNav ? "pb-16" : ""}>{children}</main>
      {shouldShowNav && <BottomNav />}
    </>
  );
}
