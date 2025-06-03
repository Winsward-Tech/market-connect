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
            src="/images/financial.png"
            alt={content?.title || "Course thumbnail"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              {content?.type?.toUpperCase()}
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {content?.level}
            </span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              {content?.duration}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {content?.title}
          </h1>
          <p className="text-gray-600 mb-4">{content?.description}</p>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="font-bold text-green-700">
                {content?.author?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{content?.author}</p>
              <p className="text-sm text-gray-500">{content?.authorRole}</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              Published: {content?.datePublished}
            </div>
          </div>

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
                dangerouslySetInnerHTML={{ __html: content?.content }}
              />
            </TabsContent>

            <TabsContent value="transcript">
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {content?.transcript || "Transcript will be available soon."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                {content?.relatedContent?.map((item) => (
                  <div
                    key={item.title}
                    className="border rounded-lg p-4 flex items-center"
                  >
                    <div
                      className={`bg-${
                        item.type === "video"
                          ? "red"
                          : item.type === "audio"
                          ? "blue"
                          : "green"
                      }-100 p-3 rounded-lg mr-4`}
                    >
                      {item.type === "video" ? (
                        <Video
                          className={`h-6 w-6 text-${
                            item.type === "video"
                              ? "red"
                              : item.type === "audio"
                              ? "blue"
                              : "green"
                          }-600`}
                        />
                      ) : item.type === "audio" ? (
                        <VolumeUp
                          className={`h-6 w-6 text-${
                            item.type === "video"
                              ? "red"
                              : item.type === "audio"
                              ? "blue"
                              : "green"
                          }-600`}
                        />
                      ) : (
                        <FileText
                          className={`h-6 w-6 text-${
                            item.type === "video"
                              ? "red"
                              : item.type === "audio"
                              ? "blue"
                              : "green"
                          }-600`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Related Content</h2>
      <RelatedContent items={content?.relatedContent} />
    </div>
  );
}
