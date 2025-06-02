import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  FileText,
  VolumeIcon as VolumeUp,
  Download,
  Share2,
} from "lucide-react";
import AudioPlayer from "@/components/audio-player";
import RelatedContent from "./RelatedContent";

export default function LearningContent({ content }) {
  return (
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
              <p className="text-sm text-gray-500">{content.authorRole}</p>
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
                  <strong>0:00</strong> - Welcome to Financial Literacy Basics!
                  I'm Grace Addo, and I'll be your guide through this important
                  topic.
                </p>
                <p>
                  <strong>0:15</strong> - Today we're going to learn about
                  managing money for your business. This is very important for
                  all market women and farmers.
                </p>
                <p>
                  <strong>0:30</strong> - First, let's talk about what financial
                  literacy means. It simply means understanding how money works
                  and how to manage it wisely.
                </p>
                <p>
                  <strong>1:00</strong> - Many businesses fail because they
                  don't keep track of their money. But yours won't be one of
                  them after this lesson!
                </p>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Simple Budget Template</h3>
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
                    <h3 className="font-medium">Savings Plan Worksheet</h3>
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
      <RelatedContent items={content.relatedContent} />
    </div>
  );
}
