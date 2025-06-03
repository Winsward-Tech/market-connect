import { Button } from "@/components/ui/button";
import { BookOpen, VolumeIcon as VolumeUp, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LearningHeader({
  title,
  isAudioEnabled,
  onAudioToggle,
}) {
  return (
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
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onAudioToggle}
        >
          <VolumeUp className="h-5 w-5" />
        </Button>
        {isAudioEnabled && (
          <span className="hidden md:inline text-sm bg-green-600 px-2 py-1 rounded">
            Audio Enabled
          </span>
        )}
      </div>
    </header>
  );
}
