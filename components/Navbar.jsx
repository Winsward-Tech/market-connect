"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/Ghana Market-logo.png"
                alt="Market Connect Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-green-800">
                Market Connect
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-green-800">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
