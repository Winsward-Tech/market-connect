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
  Users,
  MessageCircle,
  Search,
  ThumbsUp,
  MessageSquare,
  ArrowLeft,
  VolumeIcon as VolumeUp,
} from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Users className="h-6 w-6" />
          <h1 className="text-xl font-bold">Community</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <VolumeUp className="h-5 w-5" />
        </Button>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Community Forum
        </h1>

        <p className="text-lg mb-8">
          Connect with other farmers and market women to share knowledge, ask
          questions, and build relationships.
        </p>

        <div className="flex items-center mb-8 relative">
          <Input
            placeholder="Search discussions..."
            className="pl-10 py-6 text-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Button className="ml-2 bg-blue-600 hover:bg-blue-700">Search</Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all" className="text-lg py-3">
                All Topics
              </TabsTrigger>
              <TabsTrigger value="farming" className="text-lg py-3">
                Farming
              </TabsTrigger>
              <TabsTrigger value="market" className="text-lg py-3">
                Market
              </TabsTrigger>
              <TabsTrigger value="questions" className="text-lg py-3">
                Questions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex justify-end mb-6">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            Start New Discussion
          </Button>
        </div>

        <div className="mb-8 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Featured Community Members
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl font-bold text-orange-600">AM</span>
              </div>
              <h3 className="font-bold">Ama Mensah</h3>
              <p className="text-sm text-gray-600">Market Woman, Kumasi</p>
              <p className="text-xs text-blue-600 mt-1">Top Contributor</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">KA</span>
              </div>
              <h3 className="font-bold">Kwame Asante</h3>
              <p className="text-sm text-gray-600">Farmer, Volta Region</p>
              <p className="text-xs text-green-600 mt-1">Farming Expert</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">AB</span>
              </div>
              <h3 className="font-bold">Abena Boateng</h3>
              <p className="text-sm text-gray-600">Farmer, Central Region</p>
              <p className="text-xs text-purple-600 mt-1">Most Helpful</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl font-bold text-red-600">KM</span>
              </div>
              <h3 className="font-bold">Kofi Mensah</h3>
              <p className="text-sm text-gray-600">Farmer, Eastern Region</p>
              <p className="text-xs text-red-600 mt-1">Rising Star</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <DiscussionCard
            title="Best practices for storing yams during rainy season?"
            author="Kofi Mensah"
            authorRole="Farmer, Eastern Region"
            date="2 days ago"
            content="I'm having trouble keeping my yams from rotting during the rainy season. Does anyone have advice on better storage methods that don't require expensive equipment?"
            replies={12}
            likes={24}
            category="Farming"
          />

          <DiscussionCard
            title="How to negotiate better prices with middlemen?"
            author="Ama Owusu"
            authorRole="Market Woman, Kumasi"
            date="1 week ago"
            content="I feel like I'm not getting fair prices from middlemen who buy my vegetables. How do other market women negotiate better deals? Any tips would be helpful."
            replies={18}
            likes={32}
            category="Market"
          />

          <DiscussionCard
            title="Mobile money vs. cash for market transactions"
            author="Kwame Asante"
            authorRole="Farmer, Volta Region"
            date="3 days ago"
            content="I'm thinking of accepting mobile money payments for my produce. Has anyone made this switch? What are the advantages and challenges?"
            replies={15}
            likes={27}
            category="Market"
          />

          <DiscussionCard
            title="Natural pesticides for tomato plants?"
            author="Abena Boateng"
            authorRole="Farmer, Central Region"
            date="5 days ago"
            content="My tomato plants are being attacked by insects, but I want to avoid chemical pesticides. Does anyone know effective natural solutions that work in our climate?"
            replies={9}
            likes={18}
            category="Farming"
          />
        </div>
      </div>
    </div>
  );
}

function DiscussionCard({
  title,
  author,
  authorRole,
  date,
  content,
  replies,
  likes,
  category,
}) {
  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "farming":
        return "bg-green-100 text-green-700";
      case "market":
        return "bg-orange-100 text-orange-700";
      case "questions":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case "farming":
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
            <path d="M20 20L4 4" />
            <path d="M20 4v16" />
          </svg>
        );
      case "market":
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
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "questions":
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
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-l-4 hover:border-l-8 border-l-blue-500 group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2 group-hover:text-blue-600">
              {title}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-gray-700">{author}</span>
              <span className="mx-2">•</span>
              <span>{authorRole}</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm flex items-center ${getCategoryColor()}`}
          >
            {getCategoryIcon()}
            {category}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{content}</p>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageSquare className="h-4 w-4 mr-1" />
            {replies}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
