import { Card, CardContent } from "@/components/ui/card";

export default function LearningSidebar({ content }) {
  return (
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
        </CardContent>
      </Card>
    </div>
  );
}
