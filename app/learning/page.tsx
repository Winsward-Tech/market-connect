import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, VolumeIcon as VolumeUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">Learning Center</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <VolumeUp className="h-5 w-5" />
          </Button>
          <span className="hidden md:inline text-sm bg-green-600 px-2 py-1 rounded">Audio Enabled</span>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Learning Resources</h1>

        <p className="text-lg mb-8">
          Access educational content on business, farming, and health in your preferred language. All content includes
          audio narration for easy learning.
        </p>

        <Tabs defaultValue="business" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="business" className="text-lg py-3">
              Business
            </TabsTrigger>
            <TabsTrigger value="farming" className="text-lg py-3">
              Farming
            </TabsTrigger>
            <TabsTrigger value="health" className="text-lg py-3">
              Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Financial Literacy Basics"
                description="Learn how to manage your money, save, and plan for your business"
                type="video"
                level="Beginner"
                duration="20 min"
              />
              <LearningCard
                title="Pricing Your Products"
                description="How to set the right prices for your goods to maximize profit"
                type="audio"
                level="Beginner"
                duration="15 min"
              />
              <LearningCard
                title="Record Keeping"
                description="Simple methods to track your sales, expenses, and inventory"
                type="guide"
                level="Intermediate"
                duration="25 min"
              />
              <LearningCard
                title="Digital Marketing Basics"
                description="How to promote your business using mobile phones and social media"
                type="video"
                level="Beginner"
                duration="30 min"
              />
              <LearningCard
                title="Expanding Your Market"
                description="Strategies to find new customers and enter new markets"
                type="guide"
                level="Intermediate"
                duration="20 min"
              />
              <LearningCard
                title="Mobile Money for Business"
                description="How to use mobile money services safely for your business"
                type="video"
                level="Beginner"
                duration="15 min"
              />
            </div>
          </TabsContent>

          <TabsContent value="farming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Sustainable Farming Practices"
                description="Learn eco-friendly farming techniques that improve yield"
                type="video"
                level="Beginner"
                duration="25 min"
              />
              <LearningCard
                title="Crop Rotation Basics"
                description="How to plan crop rotation to maintain soil health"
                type="guide"
                level="Intermediate"
                duration="20 min"
              />
              <LearningCard
                title="Pest Management"
                description="Natural methods to control pests and protect your crops"
                type="video"
                level="Beginner"
                duration="30 min"
              />
              <LearningCard
                title="Water Conservation"
                description="Techniques to reduce water usage while maintaining crop health"
                type="audio"
                level="Beginner"
                duration="15 min"
              />
              <LearningCard
                title="Post-Harvest Handling"
                description="How to store and preserve your harvest to reduce losses"
                type="guide"
                level="Intermediate"
                duration="25 min"
              />
              <LearningCard
                title="Organic Fertilizers"
                description="How to make and use organic fertilizers for better crops"
                type="video"
                level="Beginner"
                duration="20 min"
              />
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Workplace Safety"
                description="How to stay safe and healthy while working at the market or farm"
                type="video"
                level="Beginner"
                duration="20 min"
              />
              <LearningCard
                title="Nutrition Basics"
                description="Understanding balanced diets and healthy eating habits"
                type="guide"
                level="Beginner"
                duration="15 min"
              />
              <LearningCard
                title="Heat Stress Prevention"
                description="How to protect yourself from heat-related illnesses while working"
                type="audio"
                level="Beginner"
                duration="10 min"
              />
              <LearningCard
                title="First Aid Essentials"
                description="Basic first aid skills for common injuries at work"
                type="video"
                level="Intermediate"
                duration="30 min"
              />
              <LearningCard
                title="Mental Health Awareness"
                description="Understanding stress and maintaining mental wellbeing"
                type="guide"
                level="Beginner"
                duration="20 min"
              />
              <LearningCard
                title="Safe Food Handling"
                description="Proper techniques for handling and storing food products"
                type="video"
                level="Beginner"
                duration="15 min"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-green-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Learning Paths</h2>
          <p className="mb-6">Follow these structured learning paths to build your skills step by step:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-green-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Success</h3>
              <p className="text-gray-600 mb-4">Learn how to manage money, price products, and grow your business</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Financial Literacy Basics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Pricing Your Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>Record Keeping</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-blue-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Farming Excellence</h3>
              <p className="text-gray-600 mb-4">Master sustainable farming techniques to improve your yield</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Sustainable Farming Practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Pest Management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>Post-Harvest Handling</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-red-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Health & Safety</h3>
              <p className="text-gray-600 mb-4">Protect yourself and your family with essential health knowledge</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Workplace Safety</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Nutrition Basics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>First Aid Essentials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LearningCard({ title, description, type, level, duration }) {
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-6 w-6 text-red-500" />
      case "audio":
        return <VolumeUp className="h-6 w-6 text-blue-500" />
      case "guide":
        return <FileText className="h-6 w-6 text-green-500" />
      default:
        return <BookOpen className="h-6 w-6 text-purple-500" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-700"
      case "audio":
        return "bg-blue-100 text-blue-700"
      case "guide":
        return "bg-green-100 text-green-700"
      default:
        return "bg-purple-100 text-purple-700"
    }
  }

  const getTypeBackground = () => {
    switch (type) {
      case "video":
        return "from-red-200 to-red-100"
      case "audio":
        return "from-blue-200 to-blue-100"
      case "guide":
        return "from-green-200 to-green-100"
      default:
        return "from-purple-200 to-purple-100"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className={`h-40 bg-gradient-to-r ${getTypeBackground()} flex items-center justify-center relative`}>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
        <div className="bg-white rounded-full p-4 shadow-md">{getTypeIcon()}</div>
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-500 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor()}`}>{type.toUpperCase()}</span>
          <div className="flex items-center">
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
              className="w-4 h-4 text-gray-500 mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs text-gray-500">{duration}</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-green-600 transition-colors">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 flex items-center">
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
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Level: {level}
          </span>
          <Button className="bg-green-600 hover:bg-green-700 transition-all">
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
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
