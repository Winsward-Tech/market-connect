"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/home" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/Ghana Market-logo.png"
                alt="Market Connect Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-green-800">
              Market Connect
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Volume2 className="h-5 w-5 text-gray-600" />
            </Button>
            <Link href="/profile">
              <Button variant="outline" className="hidden md:flex">
                My Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
