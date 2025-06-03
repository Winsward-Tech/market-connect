"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MessageCircle,
  Search,
  ThumbsUp,
  MessageSquare,
  ArrowLeft,
  Play,
  Heart,
  Sprout,
  ShoppingBasket,
  HelpCircle,
  Mic,
  MicOff,
  Keyboard,
} from "lucide-react";
import HomeNavbar from "@/components/HomeNavbar";
import Link from "next/link";

// Separate the DiscussionCard component to reduce re-renders
const DiscussionCard = React.memo(function DiscussionCard({
  id,
  title,
  author,
  authorRole,
  location,
  date,
  content,
  replies,
  likes,
  category,
  hasAudio,
  onToggleAudio,
  isPlaying,
  onAnswer,
  isAnswerModalOpen,
  onAnswerModalChange,
  isVoiceMode,
  toggleVoiceMode,
  isRecording,
  startRecording,
  stopRecording,
}) {
  const categoryConfig = useMemo(() => {
    switch (category.toLowerCase()) {
      case "farming":
        return {
          color: "bg-green-100 text-[#15803D]",
          icon: <Sprout className="w-4 h-4 mr-1" />,
        };
      case "market":
        return {
          color: "bg-orange-100 text-orange-700",
          icon: <ShoppingBasket className="w-4 h-4 mr-1" />,
        };
      default:
        return {
          color: "bg-blue-100 text-blue-700",
          icon: <HelpCircle className="w-4 h-4 mr-1" />,
        };
    }
  }, [category]);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white rounded-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <CardTitle className="text-xl mb-2 text-gray-800 flex-1 pr-4">
            {title}
          </CardTitle>
          <div
            className={`px-3 py-1 rounded-full text-sm flex items-center ${categoryConfig.color}`}
          >
            {categoryConfig.icon}
            {category}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <div className="w-10 h-10 rounded-full bg-[#15803D]/10 flex items-center justify-center mr-3">
            <span className="text-[#15803D] font-bold text-sm">
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-800">{author}</span>
            <div className="text-xs text-gray-500">
              {authorRole} • {location} • {date}
            </div>
          </div>
        </div>

        {hasAudio && (
          <div className="mt-3">
            <Button
              onClick={onToggleAudio}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <Play className="h-3 w-3 mr-1" />
              Listen
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-base text-gray-700">{content}</p>
      </CardContent>

      <CardFooter className="bg-gray-50 border-t pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-red-500"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-500"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              {replies}
            </Button>
          </div>
          <Dialog open={isAnswerModalOpen} onOpenChange={onAnswerModalChange}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#15803D] hover:bg-green-800 text-white"
              >
                Help Answer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#15803D]">
                  Help Answer
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleVoiceMode}
                    className="text-gray-600 hover:text-[#15803D]"
                  >
                    {isVoiceMode ? (
                      <>
                        <Keyboard className="h-4 w-4 mr-2" />
                        Type
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Speak
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{content}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Answer</label>
                  {isVoiceMode ? (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="Speak your answer..."
                        className="min-h-[200px] text-lg"
                        disabled
                      />
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          variant={isRecording ? "destructive" : "outline"}
                          onClick={isRecording ? stopRecording : startRecording}
                          className="w-full"
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="h-5 w-5 mr-2" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="h-5 w-5 mr-2" />
                              Start Recording
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Textarea
                      placeholder="Share your knowledge and experience..."
                      className="min-h-[200px] text-lg"
                    />
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onAnswerModalChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#15803D] hover:bg-green-800">
                    Post Answer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
});

export default function CommunityPage() {
  const [isPlaying, setIsPlaying] = useState({});
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Memoize handlers to prevent unnecessary re-renders
  const toggleAudio = useCallback((postId) => {
    setIsPlaying((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  const toggleAnswerModal = useCallback((postId) => {
    setIsAnswerModalOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  const toggleVoiceMode = useCallback(() => {
    setIsVoiceMode((prev) => !prev);
    if (isRecording) {
      setIsRecording(false);
    }
  }, [isRecording]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const handleSearch = useCallback(() => {
    console.log("Searching for:", searchQuery);
  }, [searchQuery]);

  // Memoize the discussion posts data
  const discussionPosts = useMemo(
    () => [
      {
        id: "post1",
        title: "How do I keep my yams fresh when it rains?",
        author: "Kofi Mensah",
        authorRole: "Farmer",
        location: "Eastern Region",
        date: "2 days ago",
        content:
          "My yams always go bad when the rain comes. I don't have money for expensive storage. What simple ways work for you?",
        replies: 12,
        likes: 24,
        category: "Farming",
        hasAudio: true,
      },
      {
        id: "post2",
        title: "How to get better prices from buyers?",
        author: "Ama Owusu",
        authorRole: "Market Seller",
        location: "Kumasi",
        date: "1 week ago",
        content:
          "The buyers always give me small money for my vegetables. How do you other market women get good prices?",
        replies: 18,
        likes: 32,
        category: "Market",
        hasAudio: false,
      },
      {
        id: "post3",
        title: "Should I use mobile money or cash?",
        author: "Kwame Asante",
        authorRole: "Farmer",
        location: "Volta",
        date: "3 days ago",
        content:
          "Some buyers want to pay with mobile money for my crops. Is this safe? What are the good and bad things?",
        replies: 15,
        likes: 27,
        category: "Market",
        hasAudio: true,
      },
    ],
    []
  );

  // Paginate the discussion posts
  const paginatedPosts = discussionPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />

      {/* Header */}
      <header className="bg-[#15803D] text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto relative">
          <Link
            href="/home"
            className="flex items-center justify-center w-10 h-10 hover:bg-green-800/20 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <Users className="h-7 w-7" />
            <h1 className="text-2xl font-bold">Community</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4 max-w-6xl">
        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <div className="flex items-center gap-2">
                <Input
                  placeholder={
                    isVoiceMode
                      ? "Speak what you want to find..."
                      : "What would you like to know?"
                  }
                  className="pl-12 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-[#15803D]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isVoiceMode}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVoiceMode}
                  className="text-gray-600 hover:text-[#15803D]"
                >
                  {isVoiceMode ? (
                    <Keyboard className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
                {isVoiceMode && (
                  <Button
                    size="icon"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={isRecording ? stopRecording : startRecording}
                    className="h-10 w-10"
                  >
                    {isRecording ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button
              className="bg-[#15803D] hover:bg-green-800 px-8 py-4 text-lg rounded-xl"
              onClick={handleSearch}
            >
              Find
            </Button>
          </div>
        </div>

        {/* Discussion Posts */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {paginatedPosts.map((post) => (
            <DiscussionCard
              key={post.id}
              {...post}
              onToggleAudio={() => toggleAudio(post.id)}
              isPlaying={isPlaying[post.id]}
              onAnswer={() => toggleAnswerModal(post.id)}
              isAnswerModalOpen={isAnswerModalOpen[post.id]}
              onAnswerModalChange={(open) =>
                setIsAnswerModalOpen((prev) => ({ ...prev, [post.id]: open }))
              }
              isVoiceMode={isVoiceMode}
              toggleVoiceMode={toggleVoiceMode}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * postsPerPage >= discussionPosts.length}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
