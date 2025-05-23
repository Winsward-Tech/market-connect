import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, ShoppingBag, BookOpen, ArrowLeft, VolumeIcon as VolumeUp, Edit } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
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

      <div className="container mx-auto py-8 px-4">
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
              <h2 className="text-2xl font-bold">Ama Mensah</h2>
              <p className="text-gray-600 mb-2">Market Woman, Kumasi</p>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M2 22s4-2 8-2 8 2 8 2" />
                    <path d="M2 2s4 2 8 2 8-2 8-2" />
                    <path d="M12 12c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z" />
                    <path d="M12 12c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2z" />
                  </svg>
                  Vegetables
                </div>
                <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                  Fruits
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-1"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Retail
                </div>
              </div>

              <p className="text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                I sell fresh vegetables and fruits at Kumasi Central Market. I've been in this business for over 10
                years and joined Market Connect to expand my customer base.
              </p>
            </div>

            <div className="ml-auto hidden md:block">
              <Button className="bg-green-600 hover:bg-green-700 mb-2 w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:hidden">
            <Button className="bg-green-600 hover:bg-green-700 flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Contact
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">144</div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
            <div className="text-center bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">35</div>
              <div className="text-sm text-gray-600">Inquiries</div>
            </div>
            <div className="text-center bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
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
          <TabsContent value="products">{/* Products content here */}</TabsContent>
          <TabsContent value="reviews">{/* Reviews content here */}</TabsContent>
          <TabsContent value="settings">{/* Settings content here */}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
