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
  Eye,
  MoreVertical,
  Trash2,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "../services/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    preferredLanguage: "en",
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          router.push("/auth/login");
          return;
        }

        const response = await getCurrentUser();
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
          throw new Error("No user data received");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message || "Failed to fetch user details");
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
      if (response?.data?.data?.user) {
        setUser(response.data.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        throw new Error("Failed to update profile: Invalid response format");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-white p-0 mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/home">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              className="text-white p-0 mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/home">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
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
          <Button
            variant="ghost"
            className="text-white p-0 mr-2 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/home">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
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
        <aside
          className={`fixed md:static w-64 bg-white h-[calc(100vh-4rem)] top-16 shadow-md transition-transform duration-300 ease-in-out z-40 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4">
            <div className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNavigation("dashboard");
                  setIsSidebarOpen(false);
                }}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "analytics" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNavigation("analytics");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart3 className="h-5 w-5" />
                Analytics
              </Button>
              <Button
                variant={activeTab === "products" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNavigation("products");
                  setIsSidebarOpen(false);
                }}
              >
                <Store className="h-5 w-5" />
                My Products
                {user?.unreadMessages > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {user.unreadMessages}
                  </span>
                )}
              </Button>
              <Button
                variant={activeTab === "messages" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNavigation("messages");
                  setIsSidebarOpen(false);
                }}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
                {user?.unreadMessages > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {user.unreadMessages}
                  </span>
                )}
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNavigation("settings");
                  setIsSidebarOpen(false);
                }}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-sm font-semibold text-gray-500">
                Account
              </h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <User className="h-5 w-5" />
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => handleNavigation("settings")}
                >
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => handleNavigation("settings")}
                >
                  <Shield className="h-5 w-5" />
                  Privacy
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setShowLogoutConfirm(true)}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Add overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

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
                  onClick={() => setIsEditing(true)}
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

          {/* Add Analytics content */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      Sales Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      Views Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      Demographics Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      Revenue Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Replace Tabs with conditional rendering based on activeTab */}
          {activeTab === "dashboard" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="outline" className="text-green-600">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {user?.recentActivity?.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`bg-${activity.color}-100 p-2 rounded-full mr-4`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.value}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "products" && (
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

              {/* Product Filters */}
              <div className="flex gap-4 mb-6">
                <Button variant="outline" className="text-green-600">
                  All Products ({user?.totalProducts || 0})
                </Button>
                <Button variant="outline">
                  Active ({user?.activeProducts || 0})
                </Button>
                <Button variant="outline">
                  Sold ({user?.soldProducts || 0})
                </Button>
                <Button variant="outline">
                  Drafts ({user?.draftProducts || 0})
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user?.products?.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{product.name}</h3>
                        <span className="text-sm font-medium text-green-600">
                          GH₵{product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {product.views || 0}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {product.inquiries || 0}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm ${
                            product.status === "active"
                              ? "text-green-600"
                              : product.status === "sold"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {product.status?.charAt(0).toUpperCase() +
                            product.status?.slice(1)}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Messages</h2>
                <Button variant="outline" className="text-green-600">
                  Mark All as Read
                </Button>
              </div>
              <div className="space-y-4">
                {user?.messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-center p-4 rounded-lg ${
                      message.unread ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{message.sender}</p>
                          <p className="text-sm text-gray-500">
                            {message.preview}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {message.time}
                          </p>
                          {message.unread && (
                            <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Business Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Business Profile</p>
                    <p className="text-sm text-gray-500">
                      Manage your business information
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Product Preferences</p>
                    <p className="text-sm text-gray-500">
                      Configure your product posting settings
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
                  <Button variant="outline">Manage</Button>
                </div>
              </div>
            </div>
          )}

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
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  router.push("/");
                }}
              >
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
