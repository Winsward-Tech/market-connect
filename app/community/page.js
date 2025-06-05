"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
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
  Truck,
  Languages,
  Pause,
  Reply,
  Bell,
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
import {
  translateText,
  LANGUAGE_PAIRS,
  getLanguageName,
} from "@/app/services/translation";
import {
  textToSpeech,
  SUPPORTED_LANGUAGES,
  getDefaultSpeaker,
  getLanguageCode,
  isLanguageSupportedForTTS,
} from "@/app/services/tts";
import { useRouter } from "next/navigation";

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
  selectedLanguage,
  isTranslating,
  handleTranslate,
  translatedContent,
  setTranslatedContent,
}) {
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const categoryConfig = useMemo(() => {
    switch (category.toLowerCase()) {
      case "farming":
        return {
          color: "bg-green-100 text-[#15803D]",
          icon: <Sprout className="w-4 h-4 mr-1" />,
          label: "Farming Tips",
        };
      case "marketing":
        return {
          color: "bg-orange-100 text-orange-700",
          icon: <ShoppingBasket className="w-4 h-4 mr-1" />,
          label: "Marketing Strategies",
        };
      case "logistics":
        return {
          color: "bg-blue-100 text-blue-700",
          icon: <Truck className="w-4 h-4 mr-1" />,
          label: "Logistics & Distribution",
        };
      case "health":
        return {
          color: "bg-red-100 text-red-700",
          icon: <Heart className="w-4 h-4 mr-1" />,
          label: "Health & Safety",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: <HelpCircle className="w-4 h-4 mr-1" />,
          label: "General Discussion",
        };
    }
  }, [category]);

  const handlePlayAudio = async () => {
    try {
      if (!audioUrl) {
        const text = translatedContent?.content || content;
        const language = getLanguageCode(selectedLanguage.split("-")[1]);
        const speaker = getDefaultSpeaker(language);

        const url = await textToSpeech(text, language, speaker);
        setAudioUrl(url);
      }

      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to play audio",
      });
    }
  };

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white rounded-lg">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
          <CardTitle className="text-xl text-gray-800 flex-1">
            <Link
              href={`/community/${id}`}
              className="hover:text-[#15803D] transition-colors"
            >
              {translatedContent?.title || title}
            </Link>
          </CardTitle>
          <div
            className={`px-3 py-1 rounded-full text-sm flex items-center ${categoryConfig.color}`}
          >
            {categoryConfig.icon}
            {categoryConfig.label}
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
        <div className="space-y-4">
          <p className="text-base text-gray-700">
            {translatedContent?.content || content}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Select
              value={selectedLanguage}
              onValueChange={(value) => handleTranslate(id, value)}
            >
              <SelectTrigger className="w-full sm:w-[200px] border-[#15803D]/20 focus:border-[#15803D] focus:ring-[#15803D]/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_TWI}>
                  Twi
                </SelectItem>
                <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_GA}>Ga</SelectItem>
                <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_EWE}>
                  Ewe
                </SelectItem>
                <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_FANTE}>
                  Fante
                </SelectItem>
                <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_DAGBANI}>
                  Dagbani
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => handleTranslate(id, selectedLanguage)}
              disabled={isTranslating}
              variant="outline"
              className="flex-1 sm:flex-none items-center border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white transition-colors"
            >
              <Languages className="h-4 w-4 mr-2" />
              {isTranslating ? "Translating..." : "Translate"}
            </Button>

            {translatedContent && (
              <>
                {isLanguageSupportedForTTS(selectedLanguage.split("-")[1]) && (
                  <Button
                    onClick={handlePlayAudio}
                    variant="outline"
                    className="flex-1 sm:flex-none items-center border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? "Pause" : "Listen"}
                  </Button>
                )}

                <Button
                  onClick={() => setTranslatedContent(null)}
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none text-[#15803D] hover:bg-[#15803D]/10"
                >
                  Show Original
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <div className="flex flex-wrap items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 sm:flex-none items-center text-gray-600 hover:text-[#15803D] hover:bg-[#15803D]/10"
            onClick={() => handleLike(id)}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${likes > 0 ? "text-[#15803D]" : ""}`}
            />
            {likes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 sm:flex-none items-center text-gray-600 hover:text-[#15803D] hover:bg-[#15803D]/10"
            onClick={() => toggleComments(id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {replies}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 sm:flex-none items-center text-gray-600 hover:text-[#15803D] hover:bg-[#15803D]/10"
            onClick={() => handleAnswer(id)}
          >
            <Reply className="h-4 w-4 mr-1" />
            Answer
          </Button>
        </div>
      </CardFooter>

      {showComments && (
        <div className="px-6 pb-4">
          <div className="space-y-4">
            {isLoadingComments ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15803D] mx-auto"></div>
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#15803D]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#15803D] font-bold text-sm">
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-800 truncate">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No comments yet</p>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Input
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="flex-1 border-[#15803D]/20 focus:border-[#15803D] focus:ring-[#15803D]/20"
              />
              <Button
                onClick={() => handleCommentSubmit(id)}
                disabled={isSubmittingComment || !commentContent.trim()}
                className="bg-[#15803D] hover:bg-[#15803D]/90 text-white"
              >
                {isSubmittingComment ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
    </Card>
  );
});

const categories = [
  { value: "general", label: "General Discussion" },
  { value: "farming", label: "Farming Tips" },
  { value: "marketing", label: "Marketing Strategies" },
  { value: "logistics", label: "Logistics & Distribution" },
  { value: "health", label: "Health & Safety" },
];

export default function CommunityPage() {
  const { toast } = useToast();
  const router = useRouter();
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
  const postsPerPage = 5;
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(null);
  const [currentForumId, setCurrentForumId] = useState(null);
  const [comments, setComments] = useState({});
  const [isLoadingComments, setIsLoadingComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGE_PAIRS.ENGLISH_TO_TWI
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedPosts, setTranslatedPosts] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = forumPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(forumPosts.length / postsPerPage);

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

        let response;
        if (selectedCategory === "all") {
          response = await getAllForums(token);
        } else {
          response = await getForumsByCategory(selectedCategory, token);
        }

        if (!response || !response.success || !response.data.forums) {
          throw new Error("No data received from server");
        }

        // Transform the data to match the expected format
        const transformedData = response.data.forums.map((post) => ({
          id: post._id,
          title: post.title,
          content: post.content,
          category: post.category,
          author: post.author?.name || "Anonymous",
          authorRole: post.author?.role || "User",
          location: "Ghana",
          date: new Date(post.createdAt).toLocaleDateString(),
          replies: 0,
          likes: post.likes?.length || 0,
          hasAudio: false,
        }));

        console.log("Transformed forum data:", transformedData);
        setForumPosts(transformedData);
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
    if (!commentContent.trim()) return;

    try {
      setIsSubmittingComment(forumId);
      const token = localStorage.getItem("token");

      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to add a comment",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        "https://translation-api.ghananlp.org/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            forumId,
            content: commentContent.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to post comment");
      }

      const data = await response.json();

      // Update the comments for this forum
      setComments((prev) => ({
        ...prev,
        [forumId]: [
          ...(prev[forumId] || []),
          {
            id: data._id,
            content: data.content,
            author: data.author,
            date: new Date().toLocaleDateString(),
          },
        ],
      }));

      // Clear the comment input
      setCommentContent("");

      // Show success message
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(null);
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

  const handleTranslate = async (postId, langPair) => {
    const post = forumPosts.find((f) => f.id === postId);
    if (!post) return;

    try {
      setIsTranslating(true);
      setSelectedLanguage(langPair);

      // Translate title
      const translatedTitle = await translateText(post.title, langPair);

      // Translate content
      const translatedContent = await translateText(post.content, langPair);

      setTranslatedPosts((prev) => ({
        ...prev,
        [postId]: {
          title: translatedTitle,
          content: translatedContent,
        },
      }));

      toast({
        title: "Success",
        description: `Translated to ${getLanguageName(langPair.split("-")[1])}`,
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Translation failed",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAnswer = (forumId) => {
    setIsAnswerModalOpen((prev) => ({
      ...prev,
      [forumId]: true,
    }));
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://translation-api.ghananlp.org/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `https://translation-api.ghananlp.org/api/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://translation-api.ghananlp.org/api/notifications/read-all",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
    // Set up polling for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <Link href="/home">
                <button
                  aria-label="Back to Home"
                  className="p-2 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <ArrowLeft className="h-6 w-6 text-green-800" />
                </button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Community Forum
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Connect with other farmers and share your experiences
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex-1 sm:flex-none">
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px] border-[#15803D]/20 focus:border-[#15803D] focus:ring-[#15803D]/20"
              />
            </div>
            <div className="flex-1 sm:flex-none">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px] border-[#15803D]/20 focus:border-[#15803D] focus:ring-[#15803D]/20">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => router.push("/community/create-post")}
              className="w-full sm:w-auto bg-[#15803D] hover:bg-[#15803D]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {currentPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or create a new post
              </p>
            </div>
          ) : (
            currentPosts.map((post) => (
              <DiscussionCard
                key={post.id}
                {...post}
                onToggleAudio={() => toggleAudio(post.id)}
                isPlaying={isPlaying[post.id]}
                onAnswer={() => handleAnswer(post.id)}
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
                isSubmittingComment={isSubmittingComment === post.id}
                selectedLanguage={selectedLanguage}
                isTranslating={isTranslating}
                handleTranslate={handleTranslate}
                translatedContent={translatedPosts[post.id]}
                setTranslatedContent={() => {
                  setTranslatedPosts((prev) => {
                    const newPosts = { ...prev };
                    delete newPosts[post.id];
                    return newPosts;
                  });
                }}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {forumPosts.length > postsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D]/10"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-[#15803D] hover:bg-[#15803D]/90 text-white"
                        : "border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D]/10"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D]/10"
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Community Forum
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() =>
                    setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                  }
                  className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                            onClick={() =>
                              markNotificationAsRead(notification.id)
                            }
                          >
                            <p className="text-sm text-gray-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
