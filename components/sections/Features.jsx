"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, ShoppingBag } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <BookOpen className="h-12 w-12 text-green-600" />,
    title: "Learning",
    description:
      "Access audio-visual lessons on business, farming, and health in your local language. Learn at your own pace with content designed for all education levels.",
    href: "/learning",
    color: "bg-yellow-100",
  },
  {
    icon: <Users className="h-12 w-12 text-blue-600" />,
    title: "Community",
    description:
      "Connect with other farmers and market women to share knowledge, ask questions, and build relationships. Get advice from experienced members.",
    href: "/community",
    color: "bg-blue-100",
  },
  {
    icon: <ShoppingBag className="h-12 w-12 text-red-600" />,
    title: "Marketplace",
    description:
      "Advertise your products and connect with buyers across Ghana. Expand your market reach and find new customers for your goods.",
    href: "/marketplace",
    color: "bg-red-100",
  },
];

function FeatureCard({ icon, title, description, href, color }) {
  return (
    <Link href={href}>
      <div
        className={`${color} rounded-xl p-6 text-center h-full transition-all hover:scale-105 hover:shadow-lg cursor-pointer shadow-md flex flex-col items-center`}
      >
        <div className="flex justify-center mb-4 bg-white p-4 rounded-full shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
}

export default function Features() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-red-600">
            Error loading features. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-8">
          Our Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
