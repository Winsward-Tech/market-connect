"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ShoppingBag, Users, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/HomeNavbar";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const defaultNavItems = [
  {
    href: "/learning",
    image: "/images/learn.jpg",
    label: "Learn",
    description: "Learn new farming and business skills",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    href: "/marketplace",
    image: "/images/advertise.jpg",
    label: "Buy & Sell",
    description: "Trade your products with others",
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    href: "/community",
    image: "/images/collaborate.png",
    label: "Talk to Others",
    description: "Connect with other farmers and traders",
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    href: "/profile",
    image: "/images/profile.png",
    label: "My Info",
    description: "View and update your information",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

function NavCard({ href, image, label, description, color, iconColor }) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className={`h-full min-h-[200px] p-4 shadow hover:shadow-lg cursor-pointer transition-all duration-300 ${color} hover:scale-[1.02]`}
      >
        <CardContent className="p-0 flex flex-col items-center justify-center h-full space-y-3">
          <div className="p-3 rounded-full transition duration-300">
            <div className="relative w-12 h-12">
              <Image src={image} alt={label} fill className="object-contain" />
            </div>
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
  const { toast } = useToast();
  const [welcomeText, setWelcomeText] = useState({
    title: "Welcome to Market Connect",
    description:
      "Your one-stop platform for farming, trading, and community engagement",
  });
  const [navItems, setNavItems] = useState(defaultNavItems);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleLanguageChange = async (event) => {
      const { language, translateFunction } = event.detail;

      if (language === "en") {
        // Reset to original text
        setWelcomeText({
          title: "Welcome to Market Connect",
          description:
            "Your one-stop platform for farming, trading, and community engagement",
        });
        setNavItems(defaultNavItems);
        return;
      }

      try {
        setIsTranslating(true);
        // Translate welcome text
        const [translatedTitle, translatedDescription] = await Promise.all([
          translateFunction(welcomeText.title, language),
          translateFunction(welcomeText.description, language),
        ]);

        setWelcomeText({
          title: translatedTitle,
          description: translatedDescription,
        });

        // Translate navigation items
        const translatedNavItems = await Promise.all(
          defaultNavItems.map(async (item) => {
            const [translatedLabel, translatedDescription] = await Promise.all([
              translateFunction(item.label, language),
              translateFunction(item.description, language),
            ]);

            return {
              ...item,
              label: translatedLabel,
              description: translatedDescription,
            };
          })
        );

        setNavItems(translatedNavItems);
      } catch (error) {
        console.error("Translation failed:", error);
        toast({
          title: "Translation Error",
          description: "Failed to translate content",
          variant: "destructive",
        });
      } finally {
        setIsTranslating(false);
      }
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/">
            <button
              aria-label="Back to Main"
              className="p-2 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <ArrowLeft className="h-6 w-6 text-green-800" />
            </button>
          </Link>
          <h2 className="flex-1 text-2xl md:text-3xl font-bold text-gray-900 text-center">
            {isTranslating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span>Translating...</span>
              </div>
            ) : (
              welcomeText.title
            )}
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isTranslating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span>Translating...</span>
            </div>
          ) : (
            welcomeText.description
          )}
        </p>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-12 grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block p-6 rounded-lg transition-all duration-200 hover:shadow-md",
                item.color
              )}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className={clsx("p-4 rounded-full", item.color)}>
                  <div className="relative w-32 h-32 sm:w-24 sm:h-24">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 128px, 96px"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-lg font-semibold text-gray-900">
                    {isTranslating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      </div>
                    ) : (
                      item.label
                    )}
                  </h3>
                  <p className="mt-2 text-base sm:text-sm text-gray-600">
                    {isTranslating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      </div>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
                <div
                  className={clsx(
                    "w-6 h-6",
                    isActive ? "text-green-700" : item.iconColor
                  )}
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
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
