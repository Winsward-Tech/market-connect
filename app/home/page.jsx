"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ShoppingBag, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/HomeNavbar";
import clsx from "clsx";

const navItems = [
  {
    href: "/learning",
    icon: BookOpen,
    label: "Learn",
    description: "Learn new farming and business skills",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    href: "/marketplace",
    icon: ShoppingBag,
    label: "Buy & Sell",
    description: "Trade your products with others",
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    href: "/community",
    icon: Users,
    label: "Talk to Others",
    description: "Connect with other farmers and traders",
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    href: "/profile",
    icon: User,
    label: "My Info",
    description: "View and update your information",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

function NavCard({ href, icon: Icon, label, description, color, iconColor }) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className={`h-full min-h-[200px] p-4 shadow hover:shadow-lg cursor-pointer transition-all duration-300 ${color} hover:scale-[1.02]`}
      >
        <CardContent className="p-0 flex flex-col items-center justify-center h-full space-y-3">
          <div className="p-3 rounded-full transition duration-300">
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {label}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function HomeScreen() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HomeNavbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome to Market Connect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your one-stop platform for farming, trading, and community
              engagement
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {navItems.map((item) => (
              <NavCard key={item.href} {...item} />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={`Go to ${item.label}`}
                className="flex flex-col items-center justify-center py-2 space-y-1"
              >
                <item.icon
                  className={clsx(
                    "h-6 w-6",
                    isActive ? "text-green-700" : item.iconColor
                  )}
                />
                <span
                  className={clsx(
                    "text-xs font-medium",
                    isActive ? "text-green-700" : "text-gray-600"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
