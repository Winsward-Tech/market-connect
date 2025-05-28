"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ShoppingBag, Users, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/home",
      label: "Home",
      icon: Home,
    },
    {
      href: "/learning",
      label: "Learn",
      icon: BookOpen,
    },
    {
      href: "/marketplace",
      label: "Market",
      icon: ShoppingBag,
    },
    {
      href: "/community",
      label: "Community",
      icon: Users,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 text-xs ${
                isActive
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "text-green-600" : ""}`} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
