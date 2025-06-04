"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
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
  Loader2,
  Plus,
} from "lucide-react";
import HomeNavbar from "@/components/HomeNavbar";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllForums,
  getForumsByCategory,
  addComment,
  getComments,
} from "@/app/services/forum";

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
  showComments,
  toggleComments,
  comments,
  isLoadingComments,
  commentContent,
  setCommentContent,
  handleCommentSubmit,
  isSubmittingComment,
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
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-2">
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
                onClick={() => toggleComments(id)}
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
                            onClick={
                              isRecording ? stopRecording : startRecording
                            }
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
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        disabled={isSubmittingComment}
                      />
                    )}
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => onAnswerModalChange(false)}
                      disabled={isSubmittingComment}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#15803D] hover:bg-green-800"
                      onClick={() => handleCommentSubmit(id)}
                      disabled={isSubmittingComment}
                    >
                      {isSubmittingComment ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Answer"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 border-t pt-4">
              {isLoadingComments ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-[#15803D]" />
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {comments?.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#15803D]/10 flex items-center justify-center">
                          <span className="text-[#15803D] font-bold text-sm">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="font-medium text-sm text-gray-900">
                              {comment.author}
                            </div>
                            <p className="text-sm text-gray-700">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{comment.date}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-500"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#15803D]/10 flex items-center justify-center">
                      <span className="text-[#15803D] font-bold text-sm">
                        CU
                      </span>
                    </div>
                    <Input
                      placeholder="Write a comment..."
                      className="flex-1"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit(id);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      className="bg-[#15803D] hover:bg-green-800"
                      onClick={() => handleCommentSubmit(id)}
                      disabled={!commentContent.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
});

export default function CommunityPage() {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState({});
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forumPosts, setForumPosts] = useState([]);
  const postsPerPage = 3;
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [currentForumId, setCurrentForumId] = useState(null);
  const [comments, setComments] = useState({});
  const [isLoadingComments, setIsLoadingComments] = useState({});
  const [showComments, setShowComments] = useState({});

  // Fetch forum posts
  useEffect(() => {
    const fetchForums = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view forum posts");
          toast({
            title: "Authentication Required",
            description: "Please log in to view forum posts",
            variant: "destructive",
          });
          return;
        }

        let data;
        if (selectedCategory === "all") {
          data = await getAllForums(token);
        } else {
          data = await getForumsByCategory(selectedCategory, token);
        }

        if (!data) {
          throw new Error("No data received from server");
        }

        setForumPosts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error("Error fetching forums:", error);
        setError(error.message || "Failed to fetch forum posts");
        toast({
          title: "Error",
          description: error.message || "Failed to fetch forum posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchForums();
  }, [toast, selectedCategory]);

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

  const toggleVoiceMode = () => setIsVoiceMode(!isVoiceMode);

  const startRecording = () => setIsRecording(true);

  const stopRecording = () => setIsRecording(false);

  const handleSearch = useCallback(() => {
    console.log("Searching for:", searchQuery);
  }, [searchQuery]);

  // Filter and paginate the discussion posts
  const filteredPosts = useMemo(() => {
    return forumPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [forumPosts, searchQuery]);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCommentSubmit = async (forumId) => {
    try {
      setIsSubmittingComment(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to add a comment",
          variant: "destructive",
        });
        return;
      }

      if (!commentContent.trim()) {
        toast({
          title: "Error",
          description: "Please enter a comment",
          variant: "destructive",
        });
        return;
      }

      await addComment(forumId, { content: commentContent }, token);

      toast({
        title: "Success",
        description: "Your comment has been posted",
      });

      // Reset form
      setCommentContent("");
      setIsAnswerModalOpen((prev) => ({ ...prev, [forumId]: false }));

      // Refresh forum posts to show new comment
      const data =
        selectedCategory === "all"
          ? await getAllForums(token)
          : await getForumsByCategory(selectedCategory, token);
      setForumPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to post comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Add function to fetch comments
  const fetchComments = async (forumId) => {
    try {
      setIsLoadingComments((prev) => ({ ...prev, [forumId]: true }));
      const token = localStorage.getItem("token");

      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view comments",
          variant: "destructive",
        });
        return;
      }

      const commentsData = await getComments(forumId, token);
      setComments((prev) => ({ ...prev, [forumId]: commentsData }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setIsLoadingComments((prev) => ({ ...prev, [forumId]: false }));
    }
  };

  // Add function to toggle comments
  const toggleComments = (forumId) => {
    setShowComments((prev) => {
      const newState = { ...prev, [forumId]: !prev[forumId] };
      if (newState[forumId] && !comments[forumId]) {
        fetchComments(forumId);
      }
      return newState;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#15803D]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button
            className="mt-4 bg-[#15803D] hover:bg-green-800"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <Link href="/community/create-post">
            <Button className="bg-[#15803D] hover:bg-green-800 text-white">
              Create Post
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={
              selectedCategory === "all"
                ? "bg-[#15803D] hover:bg-green-800"
                : ""
            }
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "farming" ? "default" : "outline"}
            onClick={() => setSelectedCategory("farming")}
            className={
              selectedCategory === "farming"
                ? "bg-[#15803D] hover:bg-green-800"
                : ""
            }
          >
            <Sprout className="h-4 w-4 mr-2" />
            Farming
          </Button>
          <Button
            variant={selectedCategory === "market" ? "default" : "outline"}
            onClick={() => setSelectedCategory("market")}
            className={
              selectedCategory === "market"
                ? "bg-[#15803D] hover:bg-green-800"
                : ""
            }
          >
            <ShoppingBasket className="h-4 w-4 mr-2" />
            Market
          </Button>
          <Button
            variant={selectedCategory === "general" ? "default" : "outline"}
            onClick={() => setSelectedCategory("general")}
            className={
              selectedCategory === "general"
                ? "bg-[#15803D] hover:bg-green-800"
                : ""
            }
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            General
          </Button>
        </div>

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
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or create a new post
              </p>
            </div>
          ) : (
            paginatedPosts.map((post) => (
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
                showComments={showComments[post.id]}
                toggleComments={() => toggleComments(post.id)}
                comments={comments[post.id]}
                isLoadingComments={isLoadingComments[post.id]}
                commentContent={commentContent}
                setCommentContent={setCommentContent}
                handleCommentSubmit={() => handleCommentSubmit(post.id)}
                isSubmittingComment={isSubmittingComment}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
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
              disabled={currentPage * postsPerPage >= filteredPosts.length}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
