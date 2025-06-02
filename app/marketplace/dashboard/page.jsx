"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart,
  MessageSquare,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("products");

  // Mock data - replace with your API data later
  const myProducts = [
    {
      id: 1,
      title: "Fresh Tomatoes",
      price: "GH₵ 15 per kg",
      status: "Active",
      views: 245,
      inquiries: 12,
    },
    {
      id: 2,
      title: "Organic Plantains",
      price: "GH₵ 20 per bunch",
      status: "Active",
      views: 189,
      inquiries: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/marketplace">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <ShoppingBag className="h-6 w-6" />
          <h1 className="text-xl font-bold">My Dashboard</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Products</p>
                  <h3 className="text-2xl font-bold">2</h3>
                </div>
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <h3 className="text-2xl font-bold">434</h3>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inquiries</p>
                  <h3 className="text-2xl font-bold">20</h3>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <h3 className="text-2xl font-bold">85%</h3>
                </div>
                <BarChart className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm">
          <Tabs defaultValue="products" className="w-full">
            <div className="border-b">
              <div className="container mx-auto px-4">
                <TabsList className="w-full justify-start h-14">
                  <TabsTrigger
                    value="products"
                    className="text-lg px-6"
                    onClick={() => setActiveTab("products")}
                  >
                    My Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="inquiries"
                    className="text-lg px-6"
                    onClick={() => setActiveTab("inquiries")}
                  >
                    Inquiries
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="text-lg px-6"
                    onClick={() => setActiveTab("analytics")}
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="container mx-auto p-4">
              <TabsContent value="products" className="mt-0">
                <div className="flex justify-end mb-4">
                  <Link href="/marketplace/dashboard/add-product">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {myProducts.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1">
                              {product.title}
                            </h3>
                            <p className="text-green-600 font-bold">
                              {product.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="text-sm text-gray-500">Views</p>
                              <p className="font-bold">{product.views}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">Inquiries</p>
                              <p className="font-bold">{product.inquiries}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inquiries" className="mt-0">
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Inquiries Yet</h3>
                  <p className="text-gray-500">
                    When buyers contact you about your products, they will
                    appear here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="text-center py-8">
                  <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    Track your product performance and buyer engagement here.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
