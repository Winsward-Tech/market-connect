"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  ShoppingBag,
  BookOpen,
  ArrowLeft,
  VolumeIcon as VolumeUp,
  Edit,
  Plus,
  BarChart3,
  Package,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Users,
  Home,
  Store,
  Bell,
  CreditCard,
  Shield,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../services/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    preferredLanguage: "en",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Check if we're in the browser environment
        if (typeof window === "undefined") {
          return;
        }

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        console.log("Retrieved userId:", userId); // Debug log

        if (!token) {
          console.error("No token found"); // Debug log
          router.push("/auth/login");
          return;
        }

        if (!userId) {
          console.error("No userId found"); // Debug log
          router.push("/auth/login");
          return;
        }

        const response = await getUserById(userId);
        console.log("API Response:", response); // Debug log

        if (response?.data?.data?.user) {
          setUser(response.data.data.user);
          setError(null);
          setFormData({
            name: response.data.data.user.name || "",
            location: response.data.data.user.location || "",
            preferredLanguage:
              response.data.data.user.preferredLanguage || "en",
          });
        } else {
          console.error("Invalid response structure:", response); // Debug log
          throw new Error("No user data received");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message || "Failed to fetch user details");
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await updateUser(userId, formData);
      if (response?.data?.data) {
        setUser(response.data.data);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <User className="h-6 w-6" />
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
        </header>
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <User className="h-6 w-6" />
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
        </header>
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-red-500">{error}</p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/auth/login")}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <User className="h-6 w-6" />
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <VolumeUp className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-[calc(100vh-4rem)] sticky top-16 shadow-md hidden md:block">
          <div className="p-4">
            <div className="space-y-1">
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile/products">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Store className="h-5 w-5" />
                  My Products
                </Button>
              </Link>
              <Link href="/profile/orders">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Orders
                </Button>
              </Link>
              <Link href="/profile/messages">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </Button>
              </Link>
              <Link href="/profile/notifications">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </Button>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-sm font-semibold text-gray-500">
                Settings
              </h3>
              <div className="mt-2 space-y-1">
                <Link href="/profile/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="h-5 w-5" />
                    Account Settings
                  </Button>
                </Link>
                <Link href="/profile/payments">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </Button>
                </Link>
                <Link href="/profile/privacy">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Shield className="h-5 w-5" />
                    Privacy
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  router.push("/auth/login");
                }}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <User className="h-16 w-16 text-white" />
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 rounded-full h-10 w-10 shadow-md"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
                <p className="text-gray-600 mb-2">
                  {user?.role || "User"}, {user?.location || "Location"}
                </p>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  {user?.categories?.map((category, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center mr-2"
                    >
                      <Package className="w-4 h-4 mr-1" />
                      {category}
                    </div>
                  ))}
                </div>

                <p className="text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                  {user?.bio || "No bio available"}
                </p>
              </div>

              <div className="ml-auto hidden md:block">
                <Button
                  className="bg-green-600 hover:bg-green-700 mb-2 w-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:hidden">
              <Button
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 flex-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredLanguage">
                      Preferred Language
                    </Label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="en">English</option>
                      <option value="tw">Twi</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <h3 className="text-2xl font-bold">
                    ₵{user?.totalSales || "0"}
                  </h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  +{user?.salesGrowth || "0"}% from last month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Products</p>
                  <h3 className="text-2xl font-bold">
                    {user?.activeProducts || "0"}
                  </h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  +{user?.newProducts || "0"} new this week
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <h3 className="text-2xl font-bold">
                    {user?.totalViews || "0"}
                  </h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-purple-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  +{user?.viewsGrowth || "0"}% from last week
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-bold">
                    {user?.totalOrders || "0"}
                  </h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-orange-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  +{user?.ordersGrowth || "0"}% from last month
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="dashboard" className="text-lg py-3">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="products" className="text-lg py-3">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg py-3">
                <BookOpen className="mr-2 h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-lg py-3">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Activity</h2>
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-200"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New Sale</p>
                      <p className="text-sm text-gray-500">Tomatoes - 5kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₵120</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New Inquiry</p>
                      <p className="text-sm text-gray-500">
                        About your vegetables
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Products</h2>
                  <Link href="/profile/products/add">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample Product Cards */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-medium">Fresh Tomatoes</h3>
                    <p className="text-sm text-gray-500 mb-2">₵5.99/kg</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">In Stock</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-medium">Green Beans</h3>
                    <p className="text-sm text-gray-500 mb-2">₵3.99/kg</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">In Stock</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-medium">Sweet Potatoes</h3>
                    <p className="text-sm text-gray-500 mb-2">₵4.50/kg</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">In Stock</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
                  <p className="text-gray-500">
                    Your customers haven't left any reviews yet. Keep providing
                    great service!
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-500">
                        Manage your notification preferences
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Privacy</p>
                      <p className="text-sm text-gray-500">
                        Manage your privacy settings
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-gray-500">
                        Manage your payment options
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
