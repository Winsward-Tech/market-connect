"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SimpleProductCard } from "./components/ProductCard";
import { categories } from "./lib/categories";
import HomeNavbar from "@/components/HomeNavbar";
import { getAllProducts } from "@/app/services/advert";
import { toast } from "sonner";

export default function MarketplacePage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();

        if (response?.data?.data?.products) {
          const formattedProducts = response.data.data.products.map(
            (product) => ({
              id: product._id,
              title: product.name,
              category: product.category?.toLowerCase() || "uncategorized",
              unit: product.unit,
              price: product.price,
              quantity: product.quantity,
              description: product.description,
              seller: product.seller,
              location: product.location,
              isAvailable: product.isAvailable,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
            })
          );
          setProducts(formattedProducts);
        } else {
          setProducts([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryMatches = (productCategory, selectedCategory) => {
    const categoryMap = {
      "fruits-and-vegetables": ["fruits", "vegetables", "tubers"],
      "herbs-and-spices": ["herbs", "spices"],
      grains: ["grains", "legumes"],
    };

    if (selectedCategory === "all") return true;
    return categoryMap[selectedCategory]?.includes(productCategory) || false;
  };

  const filteredProducts = products.filter((product) => {
    const title = product?.name?.toLowerCase() || "";
    const category = product?.category?.toLowerCase() || "";
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = title.includes(searchLower);
    const matchesCategory = getCategoryMatches(category, selectedTab);

    return matchesSearch && matchesCategory;
  });

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">
              {selectedTab === "all"
                ? "All Items"
                : categories.find((c) => c.id === selectedTab)?.name}
            </h2>
            <span className="text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"} found
            </span>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button
                className="mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <SimpleProductCard
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  price={`GH₵ ${product.price} per ${product.unit}`}
                  quantity={`${product.quantity} ${product.unit}s available`}
                  location={product.location}
                  category={product.category}
                  isAvailable={product.isAvailable}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
