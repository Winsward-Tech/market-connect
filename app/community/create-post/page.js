"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, MicOff, Keyboard, ArrowLeft, Loader2 } from "lucide-react";
import HomeNavbar from "@/components/HomeNavbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createForum } from "@/app/services/forum";
import { useToast } from "@/components/ui/use-toast";

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");

  const toggleVoiceMode = () => setIsVoiceMode(!isVoiceMode);
  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get token from localStorage or your auth context
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const forumData = {
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
      };

      await createForum(forumData, token);

      toast({
        title: "Success",
        description: "Your post has been created successfully",
      });

      router.push("/community");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />

      {/* Header */}
      <header className="bg-[#15803D] text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto relative">
          <Link
            href="/community"
            className="flex items-center justify-center w-10 h-10 hover:bg-green-800/20 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold">Create Post</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceMode}
                className="text-gray-600 hover:text-[#15803D]"
                disabled={isSubmitting}
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

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter your post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newPostCategory}
                  onValueChange={setNewPostCategory}
                  required
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farming">Farming</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                {isVoiceMode ? (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      placeholder="Speak your post content..."
                      className="min-h-[200px] text-lg"
                      disabled
                    />
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={isRecording ? stopRecording : startRecording}
                        className="w-full"
                        type="button"
                        disabled={isSubmitting}
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
                    placeholder="Share your thoughts..."
                    className="min-h-[200px] text-lg"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/community">
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#15803D] hover:bg-green-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
