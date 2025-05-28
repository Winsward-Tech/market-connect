import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  FileText,
  VolumeIcon as VolumeUp,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react";
import Link from "next/link";
import AudioPlayer from "@/components/audio-player";

export default function LearningDetailPage({ params }) {
  // This would normally fetch the specific learning content based on the slug
  const content = {
    title: "Financial Literacy Basics",
    description:
      "Learn how to manage your money, save, and plan for your business",
    type: "video",
    level: "Beginner",
    duration: "20 min",
    author: "Grace Addo",
    authorRole: "Financial Advisor",
    datePublished: "March 15, 2023",
    languages: ["English", "Twi", "Ewe", "Ga"],
    topics: ["Budgeting", "Saving", "Business Planning"],
    content: `
      <p>Welcome to Financial Literacy Basics! This course will help you understand how to manage your money effectively for your business.</p>
      
      <h3>What You Will Learn</h3>
      <ul>
        <li>How to create a simple budget for your business</li>
        <li>Ways to save money even when profits are small</li>
        <li>Understanding the difference between business and personal money</li>
        <li>Planning for unexpected expenses</li>
      </ul>
      
      <h3>Why Financial Literacy Matters</h3>
      <p>Many small businesses fail because of poor money management. By learning these basic skills, you can make your business more stable and successful.</p>
      
      <h3>Key Concepts</h3>
      <p>Before we begin, let's understand some important terms:</p>
      <ul>
        <li><strong>Income:</strong> Money coming into your business from sales</li>
        <li><strong>Expenses:</strong> Money going out of your business for supplies, rent, etc.</li>
        <li><strong>Profit:</strong> Money left after paying all expenses</li>
        <li><strong>Savings:</strong> Money set aside for future needs</li>
      </ul>
    `,
    relatedContent: [
      {
        title: "Pricing Your Products",
        type: "audio",
        level: "Beginner",
        duration: "15 min",
      },
      {
        title: "Record Keeping",
        type: "guide",
        level: "Intermediate",
        duration: "25 min",
      },
      {
        title: "Mobile Money for Business",
        type: "video",
        level: "Beginner",
        duration: "15 min",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/learning">
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
          <span className="hidden md:inline text-sm bg-green-600 px-2 py-1 rounded">
            Audio Enabled
          </span>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-white/90 hover:bg-white text-green-700 rounded-full h-16 w-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {content.type.toUpperCase()}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {content.level}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    {content.duration}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {content.title}
                </h1>
                <p className="text-gray-600 mb-4">{content.description}</p>

                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-green-700">
                      {content.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{content.author}</p>
                    <p className="text-sm text-gray-500">
                      {content.authorRole}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    Published: {content.datePublished}
                  </div>
                </div>

                <AudioPlayer
                  src="https://example.com/audio.mp3"
                  title="Listen to this lesson"
                />

                <div className="flex flex-wrap gap-2 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <Tabs defaultValue="content">
                  <TabsList className="mb-6">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                  </TabsContent>

                  <TabsContent value="transcript">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        This transcript is available in multiple languages:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {content.languages.map((language) => (
                          <Button
                            key={language}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {language}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p>
                        <strong>0:00</strong> - Welcome to Financial Literacy
                        Basics! I'm Grace Addo, and I'll be your guide through
                        this important topic.
                      </p>
                      <p>
                        <strong>0:15</strong> - Today we're going to learn about
                        managing money for your business. This is very important
                        for all market women and farmers.
                      </p>
                      <p>
                        <strong>0:30</strong> - First, let's talk about what
                        financial literacy means. It simply means understanding
                        how money works and how to manage it wisely.
                      </p>
                      <p>
                        <strong>1:00</strong> - Many businesses fail because
                        they don't keep track of their money. But yours won't be
                        one of them after this lesson!
                      </p>
                      {/* More transcript content would go here */}
                    </div>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            Simple Budget Template
                          </h3>
                          <p className="text-sm text-gray-600">
                            A printable sheet to track your income and expenses
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            Savings Plan Worksheet
                          </h3>
                          <p className="text-sm text-gray-600">
                            Plan how much to save each week or month
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 flex items-center">
                        <div className="bg-red-100 p-3 rounded-lg mr-4">
                          <Video className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Mobile Money Tutorial</h3>
                          <p className="text-sm text-gray-600">
                            How to use mobile money safely for your business
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Related Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.relatedContent.map((item) => (
                <Card
                  key={item.title}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.type === "video"
                            ? "bg-blue-100"
                            : item.type === "audio"
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {item.type === "video" ? (
                          <Video
                            className={`h-4 w-4 ${
                              item.type === "video"
                                ? "text-blue-600"
                                : item.type === "audio"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          />
                        ) : item.type === "audio" ? (
                          <VolumeUp
                            className={`h-4 w-4 ${
                              item.type === "video"
                                ? "text-blue-600"
                                : item.type === "audio"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          />
                        ) : (
                          <FileText
                            className={`h-4 w-4 ${
                              item.type === "video"
                                ? "text-blue-600"
                                : item.type === "audio"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          />
                        )}
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.level}</span>
                      <span>{item.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Topics Covered</h3>
                <div className="space-y-2">
                  {content.topics.map((topic) => (
                    <div key={topic} className="flex items-center">
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
                        className="h-4 w-4 mr-2 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <h3 className="font-bold mb-3">Available Languages</h3>
                <div className="space-y-2">
                  {content.languages.map((language) => (
                    <div key={language} className="flex items-center">
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
                        className="h-4 w-4 mr-2 text-blue-600"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <span>{language}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
