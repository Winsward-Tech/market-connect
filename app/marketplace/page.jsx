"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Search,
  MapPin,
  Phone,
  ArrowLeft,
  VolumeIcon as VolumeUp,
  Plus,
  Camera,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MarketplacePage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Simple categories with clear icons and names
  const categories = [
    { id: "all", name: "All Products", icon: "🛍️" },
    { id: "vegetables", name: "Vegetables", icon: "🥬" },
    { id: "fruits", name: "Fruits", icon: "🍎" },
    { id: "grains", name: "Grains", icon: "🌾" },
    { id: "other", name: "Other", icon: "📦" },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <ShoppingBag className="h-6 w-6" />
          <h1 className="text-xl font-bold">Marketplace</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <VolumeUp className="h-5 w-5" />
        </Button>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-green-800 mb-4">
            Welcome to Marketplace
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Buy and sell your products easily. Find buyers or sellers near you.
          </p>
          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-lg py-6 px-8">
              <Camera className="mr-2 h-5 w-5" />
              Sell Your Products
            </Button>
            <Button variant="outline" className="text-lg py-6 px-8">
              <Info className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center mb-4">
            <Input
              placeholder="Type what you want to buy or sell..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Button className="ml-2 bg-green-600 hover:bg-green-700 text-lg py-6 px-8">
              Search
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Choose Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedTab === category.id ? "default" : "outline"}
                className={`text-lg py-6 ${
                  selectedTab === category.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "hover:bg-green-50"
                }`}
                onClick={() => setSelectedTab(category.id)}
              >
                <span className="text-2xl mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Popular Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeaturedProductCard
              title="Fresh Tomatoes"
              price="GH₵ 15 per kg"
              location="Kumasi Central Market"
              image="/placeholder.svg?height=200&width=300"
            />
            <FeaturedProductCard
              title="Organic Plantains"
              price="GH₵ 20 per bunch"
              location="Tamale"
              image="/placeholder.svg?height=200&width=300"
            />
            <FeaturedProductCard
              title="Local Rice"
              price="GH₵ 200 per 50kg bag"
              location="Accra"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </div>

        {/* All Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            All Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SimpleProductCard
              title="Fresh Tomatoes"
              seller="Ama Mensah"
              location="Kumasi Central Market"
              price="GH₵ 15 per kg"
              image="/placeholder.svg?height=200&width=300"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Organic Plantains"
              seller="Kofi Addo"
              location="Tamale"
              price="GH₵ 20 per bunch"
              image="/placeholder.svg?height=200&width=300"
              phone="+233 XX XXX XXXX"
            />
            <SimpleProductCard
              title="Local Rice"
              seller="Abena Boateng"
              location="Accra"
              price="GH₵ 200 per 50kg bag"
              image="/placeholder.svg?height=200&width=300"
              phone="+233 XX XXX XXXX"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedProductCard({ title, price, location, image }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/90">{price}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function SimpleProductCard({ title, seller, location, price, image, phone }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
          In Stock
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-green-600 font-bold text-lg mb-2">{price}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  );
}
