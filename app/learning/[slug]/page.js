"use client";

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
import LearningHeader from "./components/LearningHeader";
import LearningContent from "./components/LearningContent";
import LearningSidebar from "./components/LearningSidebar";
import { useLearningContent } from "./hooks/useLearningContent";
import { useAudioControls } from "./hooks/useAudioControls";

export default function LearningDetailPage({ params }) {
  const { content, isLoading, error } = useLearningContent(params.slug);
  const { isAudioEnabled, toggleAudio } = useAudioControls();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-green-50">
      <LearningHeader
        title={content.title}
        isAudioEnabled={isAudioEnabled}
        onAudioToggle={toggleAudio}
      />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <LearningContent content={content} />
          <LearningSidebar content={content} />
        </div>
      </div>
    </div>
  );
}
