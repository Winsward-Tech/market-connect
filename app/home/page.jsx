"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomeScreen() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-green-50 flex flex-col items-center p-4">
      <div className="mt-4 flex flex-col items-center space-y-3">
        {/* Logo */}
        <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-3xl font-bold">↟</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Empowering Our Markets,
          </h1>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Growing Our Future
          </h1>
          <p className="text-yellow-600 text-sm md:text-base font-semibold mt-1">
            Sus. Gya. Yɛn Bom (Learn, Trade, Together)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-6xl px-4">
        <Link href="/learning" className="block">
          <Card className="h-full p-4 text-center shadow hover:shadow-md cursor-pointer transition hover:bg-green-50">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <div className="text-yellow-600 text-3xl md:text-4xl mb-3">
                📖
              </div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                Explore Learning Modules
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/marketplace" className="block">
          <Card className="h-full p-4 text-center shadow hover:shadow-md cursor-pointer transition hover:bg-green-50">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <div className="text-yellow-600 text-3xl md:text-4xl mb-3">
                🛒
              </div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                Browse Products
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/community" className="block">
          <Card className="h-full p-4 text-center shadow hover:shadow-md cursor-pointer transition hover:bg-green-50">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <div className="text-yellow-600 text-3xl md:text-4xl mb-3">
                👥
              </div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                Join the Community
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile" className="block">
          <Card className="h-full p-4 text-center shadow hover:shadow-md cursor-pointer transition hover:bg-green-50">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <div className="text-yellow-600 text-3xl md:text-4xl mb-3">
                👤
              </div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                Access Your Profile
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
