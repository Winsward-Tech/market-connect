import { Card, CardContent } from "@/components/ui/card";
import { Video, FileText, VolumeIcon as VolumeUp } from "lucide-react";

export default function RelatedContent({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
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
  );
}
 