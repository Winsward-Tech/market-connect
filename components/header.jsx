"use client";

import Link from "next/link";
import { Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 h-16">
        <Link href="/home" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">MC</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </Link>
          
          <Link href="/select-language">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>

          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">AA</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
} 