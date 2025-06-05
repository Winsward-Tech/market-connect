"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getForumById, addComment, getComments } from "@/app/services/forum";
import { translateText, LANGUAGE_PAIRS, getLanguageName } from "@/app/services/translation";
import { useAuth } from "@/app/context/AuthContext";
import {
  MessageSquare,
  ThumbsUp,
  ArrowLeft,
  Heart,
  Sprout,
  ShoppingBasket,
  HelpCircle,
  Truck,
  Languages,
} from "lucide-react";
import HomeNavbar from "@/components/HomeNavbar";

export default function ForumPost({ params }) {
  const router = useRouter();
  const { token } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_PAIRS.ENGLISH_TO_TWI);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          toast.error("Please log in to view this post");
          router.push("/login");
          return;
        }

        const data = await getForumById(params.id, token);
        if (!data) {
          throw new Error("Post not found");
        }
        setPost(data);
        
        // Fetch comments
        const commentsData = await getComments(params.id, token);
        setComments(commentsData || []);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message || "Failed to fetch post");
        toast.error(error.message || "Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id, token, router]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please log in to add a comment");
      router.push("/login");
      return;
    }

    if (!commentContent.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setIsSubmittingComment(true);
      console.log('Submitting comment:', {
        forumId: params.id,
        content: commentContent,
        hasToken: !!token
      });

      const response = await addComment(params.id, { content: commentContent }, token);
      console.log('Comment submission response:', response);
      
      if (response.success) {
        // Refresh comments
        const commentsData = await getComments(params.id, token);
        console.log('Fetched comments after submission:', commentsData);
        
        setComments(commentsData || []);
        toast.success("Comment added successfully");
        setCommentContent("");
      } else {
        throw new Error(response.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.message || "Failed to add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleTranslate = async () => {
    if (!post?.content) return;

    try {
      setIsTranslating(true);
      const translated = await translateText(post.content, selectedLanguage);
      console.log('Translated text:', translated);
      setTranslatedContent(translated);
      toast.success(`Translated to ${getLanguageName(selectedLanguage.split('-')[1])}`);
    } catch (error) {
      console.error('Translation error:', error);
      toast.error(error.message || 'Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const categoryConfig = {
    farming: {
      color: "bg-green-100 text-[#15803D]",
      icon: <Sprout className="w-4 h-4 mr-1" />,
      label: "Farming Tips"
    },
    marketing: {
      color: "bg-orange-100 text-orange-700",
      icon: <ShoppingBasket className="w-4 h-4 mr-1" />,
      label: "Marketing Strategies"
    },
    logistics: {
      color: "bg-blue-100 text-blue-700",
      icon: <Truck className="w-4 h-4 mr-1" />,
      label: "Logistics & Distribution"
    },
    health: {
      color: "bg-red-100 text-red-700",
      icon: <Heart className="w-4 h-4 mr-1" />,
      label: "Health & Safety"
    },
    general: {
      color: "bg-gray-100 text-gray-700",
      icon: <HelpCircle className="w-4 h-4 mr-1" />,
      label: "General Discussion"
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15803D]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">Post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forum
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start mb-3">
              <CardTitle className="text-2xl text-gray-800 flex-1 pr-4">
                {post.title}
              </CardTitle>
              <div
                className={`px-3 py-1 rounded-full text-sm flex items-center ${
                  categoryConfig[post.category]?.color || categoryConfig.general.color
                }`}
              >
                {categoryConfig[post.category]?.icon || categoryConfig.general.icon}
                {categoryConfig[post.category]?.label || categoryConfig.general.label}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <div className="w-10 h-10 rounded-full bg-[#15803D]/10 flex items-center justify-center mr-3">
                <span className="text-[#15803D] font-bold text-sm">
                  {post.author?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "A"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-800">
                  {post.author?.name || "Anonymous"}
                </span>
                <div className="text-xs text-gray-500">
                  {post.author?.role || "User"} • Ghana •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <p className="text-base text-gray-700 whitespace-pre-wrap">
                {translatedContent || post.content}
              </p>

              <div className="flex items-center space-x-4 mt-4">
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_TWI}>Twi</SelectItem>
                    <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_GA}>Ga</SelectItem>
                    <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_EWE}>Ewe</SelectItem>
                    <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_FANTE}>Fante</SelectItem>
                    <SelectItem value={LANGUAGE_PAIRS.ENGLISH_TO_DAGBANI}>Dagbani</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  variant="outline"
                  className="flex items-center"
                >
                  <Languages className="h-4 w-4 mr-2" />
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>

                {translatedContent && (
                  <Button
                    onClick={() => setTranslatedContent(null)}
                    variant="ghost"
                    size="sm"
                  >
                    Show Original
                  </Button>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t pt-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-red-500"
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.likes?.length || 0}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-500"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {comments.length}
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>

          {/* Comment Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  placeholder="Write your comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="bg-[#15803D] hover:bg-green-800"
                  >
                    {isSubmittingComment ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#15803D]/10 flex items-center justify-center">
                      <span className="text-[#15803D] font-bold text-sm">
                        {comment.author?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "A"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">
                            {comment.author?.name || "Anonymous"}
                          </span>
                          <div className="text-xs text-gray-500">
                            {comment.author?.role || "User"} •{" "}
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {comments.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 