import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-8 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10 z-0"></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            <img
              src="/images/Ghana Market-logo.png"
              alt="Market Connect Logo"
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
          Welcome to Market Connect
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
          A platform designed for Ghanaian market women and farmers to learn,
          connect, and grow their businesses
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="auth/login">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#about">
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg rounded-full"
            >
              Learn More
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-200 rounded-full opacity-20 z-0"></div>
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-200 rounded-full opacity-20 z-0"></div>
    </section>
  );
}
