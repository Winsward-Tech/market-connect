import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Search, MapPin, Phone, ArrowLeft, VolumeIcon as VolumeUp, Plus } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-red-50">
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
        <h1 className="text-3xl font-bold text-red-800 mb-6">Marketplace</h1>

        <p className="text-lg mb-8">
          Browse products from farmers and market women across Ghana, or list your own products for sale.
        </p>

        <div className="flex items-center mb-8 relative">
          <Input placeholder="Search products..." className="pl-10 py-6 text-lg" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Button className="ml-2 bg-red-600 hover:bg-red-700">Search</Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all" className="text-lg py-3">
                All
              </TabsTrigger>
              <TabsTrigger value="vegetables" className="text-lg py-3">
                Vegetables
              </TabsTrigger>
              <TabsTrigger value="fruits" className="text-lg py-3">
                Fruits
              </TabsTrigger>
              <TabsTrigger value="grains" className="text-lg py-3">
                Grains
              </TabsTrigger>
              <TabsTrigger value="other" className="text-lg py-3">
                Other
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex justify-end mb-6">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            List Your Product
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-800 mb-4">Featured Products</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2 relative rounded-xl overflow-hidden h-64 md:h-auto">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs inline-block w-fit mb-2">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">Premium Organic Vegetables</h3>
                  <p className="text-white/90 mb-2">Fresh from Eastern Region farms</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">GH₵ 25 per kg</span>
                    <Button className="bg-white text-red-600 hover:bg-red-50">View Details</Button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">Market Trends</h3>
                  <p className="text-gray-700 mb-3">Current popular products in your area</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Tomatoes</span>
                      <span className="text-green-600">↑ 15%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Cassava</span>
                      <span className="text-green-600">↑ 8%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Rice</span>
                      <span className="text-red-600">↓ 3%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Plantains</span>
                      <span className="text-green-600">↑ 12%</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">Selling Tips</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
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
                        className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Add clear photos of your products</span>
                    </li>
                    <li className="flex items-start">
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
                        className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Set competitive prices</span>
                    </li>
                    <li className="flex items-start">
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
                        className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Respond quickly to inquiries</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            title="Fresh Tomatoes"
            seller="Ama Mensah"
            location="Kumasi Central Market"
            price="GH₵ 15 per kg"
            image="/placeholder.svg?height=200&width=300"
            category="Vegetables"
            phone="+233 XX XXX XXXX"
          />

          <ProductCard
            title="Organic Plantains"
            seller="Kofi Addo"
            location="Tamale"
            price="GH₵ 20 per bunch"
            image="/placeholder.svg?height=200&width=300"
            category="Fruits"
            phone="+233 XX XXX XXXX"
          />

          <ProductCard
            title="Local Rice"
            seller="Abena Boateng"
            location="Accra"
            price="GH₵ 200 per 50kg bag"
            image="/placeholder.svg?height=200&width=300"
            category="Grains"
            phone="+233 XX XXX XXXX"
          />

          <ProductCard
            title="Fresh Cassava"
            seller="Kwame Asante"
            location="Volta Region"
            price="GH₵ 30 per bundle"
            image="/placeholder.svg?height=200&width=300"
            category="Vegetables"
            phone="+233 XX XXX XXXX"
          />

          <ProductCard
            title="Pineapples"
            seller="Efua Mensah"
            location="Central Region"
            price="GH₵ 10 each"
            image="/placeholder.svg?height=200&width=300"
            category="Fruits"
            phone="+233 XX XXX XXXX"
          />

          <ProductCard
            title="Maize"
            seller="Yaw Osei"
            location="Eastern Region"
            price="GH₵ 150 per bag"
            image="/placeholder.svg?height=200&width=300"
            category="Grains"
            phone="+233 XX XXX XXXX"
          />
        </div>
      </div>
    </div>
  )
}

function ProductCard({ title, seller, location, price, image, category, phone }) {
  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "vegetables":
        return "bg-green-100 text-green-700"
      case "fruits":
        return "bg-orange-100 text-orange-700"
      case "grains":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case "vegetables":
        return (
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
        )
      case "fruits":
        return (
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
        )
      case "grains":
        return (
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        )
      default:
        return (
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
        )
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-2 right-2 ${getCategoryColor()} px-2 py-1 rounded-full text-xs font-medium flex items-center`}
        >
          {getCategoryIcon()}
          {category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-xl font-bold text-white">{price}</p>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl group-hover:text-red-600 transition-colors">{title}</CardTitle>
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">In Stock</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
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
                className="w-4 h-4 text-red-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-500">Seller</span>
              <p className="font-medium">{seller}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Location</span>
              <p className="font-medium">{location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Contact</span>
              <p className="font-medium">{phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 border-t">
        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
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
          Message
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <Phone className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  )
}
