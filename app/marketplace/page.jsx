"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Search,
  VolumeIcon as VolumeUp,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SimpleProductCard } from "./components/ProductCard";
import { categories } from "./lib/categories";
import HomeNavbar from "@/components/HomeNavbar";

export default function MarketplacePage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-green-50">
      <HomeNavbar />
      {/* Header */}
      <header className="bg-[#15803D] text-white p-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" className="text-white p-0 mr-3">
              <ArrowLeft className="h-7 w-7" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
          <ShoppingBag className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Marketplace</h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center mb-4">
            <Input
              placeholder="What do you want to buy or sell?"
              className="pl-12 py-7 text-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button className="ml-3 bg-green-600 hover:bg-green-700 text-xl py-7 px-8">
              Find
            </Button>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-8">
          <Link href="/marketplace/dashboard/add-product">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-xl py-7">
              <Plus className="h-6 w-6 mr-3" />
              Add Your Product
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Choose What You Want
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedTab === category.id ? "default" : "outline"}
                className={`text-xl py-7 ${
                  selectedTab === category.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "hover:bg-green-50"
                }`}
                onClick={() => setSelectedTab(category.id)}
              >
                <span className="text-3xl mr-3">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-green-800 mb-6">All Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SimpleProductCard
              title="Fresh Tomatoes"
              seller="Ama Mensah"
              location="Kumasi Central Market"
              price="GH₵ 15 per kg"
              image="/images/tomatoes.jpeg"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Organic Plantains"
              seller="Kofi Addo"
              location="Tamale"
              price="GH₵ 20 per bunch"
              image="/images/plaintain.jpg"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Local Rice"
              seller="Abena Boateng"
              location="Accra"
              price="GH₵ 200 per 50kg bag"
              image="/images/Local_rice.png"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Fresh Cassava"
              seller="Kwame Asante"
              location="Volta Region"
              price="GH₵ 30 per bundle"
              image="/images/cassava.jpg"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Pineapples"
              seller="Efua Mensah"
              location="Central Region"
              price="GH₵ 10 each"
              image="/images/pineapples.jpg"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Maize"
              seller="Yaw Osei"
              location="Eastern Region"
              price="GH₵ 150 per bag"
              image="/images/bags-of-maize.jpg"
              phone="+233 XX XXX XXXX"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
