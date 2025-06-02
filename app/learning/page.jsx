"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  FileText,
  VolumeIcon as VolumeUp,
  ArrowLeft,
  Volume2,
  Check,
  Download,
} from "lucide-react";
import Link from "next/link";
import Dashboard from "./components/Dashboard";
import CourseView from "./components/CourseView";
import LessonView from "./components/LessonView";
import HomeNavbar from "@/components/HomeNavbar";

// Ghana NLP API configuration
const GHANA_NLP_API = {
  baseUrl:
    process.env.NEXT_PUBLIC_GHANA_NLP_API_URL || "https://api.ghana-nlp.com",
  endpoints: {
    textToSpeech: "/tts",
    translation: "/translate",
    transcription: "/transcribe",
  },
};

const LearningPlatform = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState({
    "financial-literacy": { completed: 3, total: 8, progress: 37 },
    "digital-marketing": { completed: 1, total: 6, progress: 16 },
    "health-practices": { completed: 0, total: 5, progress: 0 },
  });

  const [streakData, setStreakData] = useState({
    currentStreak: 7,
    longestStreak: 12,
    todayCompleted: true,
    weekData: [
      { day: "Mon", completed: true, date: "26" },
      { day: "Tue", completed: true, date: "27" },
      { day: "Wed", completed: true, date: "28" },
      { day: "Thu", completed: true, date: "29" },
      { day: "Fri", completed: true, date: "30" },
      { day: "Sat", completed: true, date: "31" },
      { day: "Sun", completed: true, date: "1" },
    ],
  });

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en"); // 'en' or 'tw' for Twi
  const [audioQueue, setAudioQueue] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const courses = [
    {
      id: "financial-literacy",
      title: "Financial Literacy",
      titleTwi: "Sika Ho Nimdeɛ",
      icon: "💰",
      color: "bg-emerald-500",
      description: "Learn to manage money, save, and grow your business",
      descriptionTwi:
        "Sua sɛdeɛ wobɛhwɛ sika so, wobɛkora, na wobɛma w'adwuma akɛse",
      lessons: 8,
      duration: "2 hours",
      level: "Beginner",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      titleTwi: "Intanɛt So Adwuma",
      icon: "📱",
      color: "bg-blue-500",
      description: "Use phones and internet to sell your products",
      descriptionTwi: "Fa phone ne intanɛt di dwuma tɔn w'adeɛ",
      lessons: 6,
      duration: "1.5 hours",
      level: "Beginner",
    },
    {
      id: "health-practices",
      title: "Health Practices",
      titleTwi: "Apɔmuden Ho Nhyehyɛeɛ",
      icon: "🏥",
      color: "bg-red-500",
      description: "Stay healthy while working at the market",
      descriptionTwi: "Kɔ so te apɔmuden mu wɔ gua so",
      lessons: 5,
      duration: "1 hour",
      level: "Beginner",
    },
  ];

  const lessons = {
    "financial-literacy": [
      {
        id: 1,
        title: "Understanding Money",
        titleTwi: "Sika Nteaseɛ",
        duration: "15 min",
        completed: true,
      },
      {
        id: 2,
        title: "Saving Basics",
        titleTwi: "Sika Kora Mfiase",
        duration: "12 min",
        completed: true,
      },
      {
        id: 3,
        title: "Business Records",
        titleTwi: "Adwuma Nhoma",
        duration: "18 min",
        completed: true,
      },
      {
        id: 4,
        title: "Pricing Your Products",
        titleTwi: "W'adeɛ Bo Fa",
        duration: "20 min",
        completed: false,
      },
      {
        id: 5,
        title: "Customer Service",
        titleTwi: "Adetɔfoɔ Som",
        duration: "16 min",
        completed: false,
      },
      {
        id: 6,
        title: "Profit Calculation",
        titleTwi: "Mfasoɔ Bu",
        duration: "14 min",
        completed: false,
      },
      {
        id: 7,
        title: "Investment Planning",
        titleTwi: "Sika De Hyɛ",
        duration: "22 min",
        completed: false,
      },
      {
        id: 8,
        title: "Financial Goals",
        titleTwi: "Sika Botaeɛ",
        duration: "10 min",
        completed: false,
      },
    ],
  };

  const achievements = [
    {
      title: "First Course Started",
      titleTwi: "Adesua Firii Aseɛ",
      icon: "🌱",
      earned: true,
    },
    {
      title: "7 Day Streak",
      titleTwi: "Nnafua 7 Toɔ So",
      icon: "🔥",
      earned: true,
    },
    { title: "Scholar", titleTwi: "Osuani", icon: "🎓", earned: true },
    { title: "Early Bird", titleTwi: "Anɔpa Kanea", icon: "🌅", earned: false },
    { title: "Night Owl", titleTwi: "Anadwo Sua", icon: "🦉", earned: false },
    {
      title: "Course Completed",
      titleTwi: "Adesua Wieɛ",
      icon: "🏆",
      earned: false,
    },
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView("course");
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentView("lesson");
  };

  const handleLessonComplete = () => {
    // Update progress
    const updatedProgress = { ...userProgress };
    if (selectedCourse && selectedCourse.id in updatedProgress) {
      updatedProgress[selectedCourse.id].completed += 1;
      updatedProgress[selectedCourse.id].progress = Math.round(
        (updatedProgress[selectedCourse.id].completed /
          updatedProgress[selectedCourse.id].total) *
          100
      );
    }
    setUserProgress(updatedProgress);

    // Update streak
    const updatedStreakData = { ...streakData };
    if (!streakData.todayCompleted) {
      updatedStreakData.todayCompleted = true;
      updatedStreakData.currentStreak += 1;
      if (updatedStreakData.currentStreak > updatedStreakData.longestStreak) {
        updatedStreakData.longestStreak = updatedStreakData.currentStreak;
      }
    }
    setStreakData(updatedStreakData);

    // Show completion message
    alert("🎉 Ayɛ! Lesson completed! Your streak continues! 🔥");
    setCurrentView("course");
  };

  // Function to handle text-to-speech using Ghana NLP API
  const handleSpeak = async (text, language = currentLanguage) => {
    if (!isAudioEnabled) return;

    try {
      const response = await fetch(
        `${GHANA_NLP_API.baseUrl}${GHANA_NLP_API.endpoints.textToSpeech}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHANA_NLP_API_KEY}`,
          },
          body: JSON.stringify({
            text,
            language: language === "tw" ? "twi" : "en",
            voice: language === "tw" ? "female_twi" : "female_en",
            speed: 0.8,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate speech");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Add to queue and play
      setAudioQueue((prev) => [...prev, audioUrl]);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      // Fallback to browser's speech synthesis if API fails
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "tw" ? "ak" : "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to handle translation using Ghana NLP API
  const translateText = async (text, fromLang = "en", toLang = "tw") => {
    try {
      const response = await fetch(
        `${GHANA_NLP_API.baseUrl}${GHANA_NLP_API.endpoints.translation}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHANA_NLP_API_KEY}`,
          },
          body: JSON.stringify({
            text,
            source_language: fromLang,
            target_language: toLang,
          }),
        }
      );

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      return data.translated_text;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    }
  };

  // Function to handle audio transcription
  const transcribeAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("language", currentLanguage === "tw" ? "twi" : "en");

      const response = await fetch(
        `${GHANA_NLP_API.baseUrl}${GHANA_NLP_API.endpoints.transcription}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHANA_NLP_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Transcription failed");

      const data = await response.json();
      return data.transcribed_text;
    } catch (error) {
      console.error("Transcription error:", error);
      return null;
    }
  };

  // Function to toggle audio
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (isAudioEnabled) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      setAudioQueue([]);
    }
  };

  // Function to toggle language
  const toggleLanguage = async () => {
    const newLang = currentLanguage === "en" ? "tw" : "en";
    setCurrentLanguage(newLang);

    // Translate current content if needed
    if (selectedLesson) {
      const translatedTitle = await translateText(
        selectedLesson.title,
        currentLanguage,
        newLang
      );
      const translatedContent = await translateText(
        selectedLesson.content,
        currentLanguage,
        newLang
      );
      setSelectedLesson((prev) => ({
        ...prev,
        title: translatedTitle,
        content: translatedContent,
      }));
    }
  };

  // Audio queue management
  useEffect(() => {
    if (audioQueue.length > 0 && !isSpeaking) {
      const audio = new Audio(audioQueue[0]);
      setIsSpeaking(true);

      audio.onended = () => {
        setAudioQueue((prev) => prev.slice(1));
        setIsSpeaking(false);
      };

      audio.play();
    }
  }, [audioQueue, isSpeaking]);

  // Modify the renderDashboard function to include audio controls
  const renderDashboard = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-2xl font-bold text-gray-800"
              onClick={() => handleSpeak("Welcome back! Ready to learn today?")}
            >
              Akwaaba! Welcome Back
            </h1>
            <p
              className="text-gray-600"
              onClick={() => handleSpeak("Wobɛkɔ so asua ɛnnɛ?", "tw")}
            >
              Wobɛkɔ so asua ɛnnɛ? • Ready to learn today?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${
                isAudioEnabled
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              aria-label={isAudioEnabled ? "Disable audio" : "Enable audio"}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm"
            >
              {currentLanguage === "en" ? "Switch to Twi" : "Switch to English"}
            </button>
          </div>
        </div>

        {/* ... rest of the dashboard content ... */}
      </div>
    </div>
  );

  // Modify the renderCourse function to include audio support
  const renderCourse = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ... existing course content ... */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2
            className="text-xl font-semibold"
            onClick={() => handleSpeak("Course Content", currentLanguage)}
          >
            Course Content • Adesua Mu Nsɛm
          </h2>
        </div>

        <div className="divide-y">
          {lessons[selectedCourse.id]?.map((lesson, index) => (
            <div
              key={lesson.id}
              className="p-6 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              onClick={() => {
                setSelectedLesson(lesson);
                setCurrentView("lesson");
                handleSpeak(lesson.title, currentLanguage);
              }}
            >
              {/* ... existing lesson content ... */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Modify the renderLesson function to include audio support
  const renderLesson = () => (
    <div className="bg-gray-900 min-h-screen">
      {/* ... existing lesson content ... */}
      <div className="bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2
                className="text-2xl font-bold mb-4"
                onClick={() =>
                  handleSpeak(selectedLesson?.title, currentLanguage)
                }
              >
                {selectedLesson?.title}
              </h2>
              <h3
                className="text-lg text-gray-600 mb-6"
                onClick={() => handleSpeak(selectedLesson?.titleTwi, "tw")}
              >
                {selectedLesson?.titleTwi}
              </h3>

              {/* Add visual aids for key points */}
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h4
                  className="font-semibold mb-3 flex items-center"
                  onClick={() =>
                    handleSpeak("Key Learning Points", currentLanguage)
                  }
                >
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Key Learning Points • Nea Wobɛsua
                </h4>
                <ul className="space-y-2">
                  {[
                    "Understanding the basics of money management",
                    "How to track your daily sales and expenses",
                    "Simple record-keeping methods for your business",
                  ].map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2"
                      onClick={() => handleSpeak(point, currentLanguage)}
                    >
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add visual progress indicators */}
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-emerald-700"
                  onClick={() => {
                    handleSpeak(
                      "Lesson completed! Great job!",
                      currentLanguage
                    );
                    // ... existing completion logic ...
                  }}
                >
                  Complete Lesson • Wie Adesua
                </button>
                <button
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                  onClick={() =>
                    handleSpeak("Downloading resources", currentLanguage)
                  }
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ... rest of the lesson content ... */}
          </div>
        </div>
      </div>
    </div>
  );

  // If we're in a course or lesson view, show the new platform
  if (currentView === "course" || currentView === "lesson") {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavbar />
        {currentView === "course" && selectedCourse && (
          <CourseView
            course={selectedCourse}
            progress={userProgress[selectedCourse.id]}
            lessons={lessons[selectedCourse.id] || []}
            onBack={() => setCurrentView("dashboard")}
            onLessonSelect={handleLessonSelect}
          />
        )}

        {currentView === "lesson" && selectedLesson && selectedCourse && (
          <LessonView
            lesson={selectedLesson}
            course={selectedCourse}
            lessons={lessons[selectedCourse.id] || []}
            onBack={() => setCurrentView("course")}
            onComplete={handleLessonComplete}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        )}
      </div>
    );
  }

  // Otherwise show the main dashboard with tabs
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HomeNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Learning Resources
        </h1>

        <p className="text-lg mb-8">
          Access educational content on business, farming, and health in your
          preferred language. All content includes audio narration for easy
          learning.
        </p>

        <Tabs defaultValue="business" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="business" className="text-lg py-3">
              Business
            </TabsTrigger>
            <TabsTrigger value="farming" className="text-lg py-3">
              Farming
            </TabsTrigger>
            <TabsTrigger value="health" className="text-lg py-3">
              Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Financial Literacy Basics"
                description="Learn how to manage your money, save, and plan for your business"
                type="video"
                level="Beginner"
                duration="20 min"
                onStartLearning={() => {
                  const financialCourse = courses.find(
                    (course) => course.id === "financial-literacy"
                  );
                  if (financialCourse) {
                    setSelectedCourse(financialCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Pricing Your Products"
                description="How to set the right prices for your goods to maximize profit"
                type="audio"
                level="Beginner"
                duration="15 min"
                onStartLearning={() => {
                  const financialCourse = courses.find(
                    (course) => course.id === "financial-literacy"
                  );
                  if (financialCourse) {
                    setSelectedCourse(financialCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Record Keeping"
                description="Simple methods to track your sales, expenses, and inventory"
                type="guide"
                level="Intermediate"
                duration="25 min"
                onStartLearning={() => {
                  const financialCourse = courses.find(
                    (course) => course.id === "financial-literacy"
                  );
                  if (financialCourse) {
                    setSelectedCourse(financialCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Digital Marketing Basics"
                description="How to promote your business using mobile phones and social media"
                type="video"
                level="Beginner"
                duration="30 min"
                onStartLearning={() => {
                  const digitalCourse = courses.find(
                    (course) => course.id === "digital-marketing"
                  );
                  if (digitalCourse) {
                    setSelectedCourse(digitalCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Expanding Your Market"
                description="Strategies to find new customers and enter new markets"
                type="guide"
                level="Intermediate"
                duration="20 min"
                onStartLearning={() => {
                  const digitalCourse = courses.find(
                    (course) => course.id === "digital-marketing"
                  );
                  if (digitalCourse) {
                    setSelectedCourse(digitalCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Mobile Money for Business"
                description="How to use mobile money services safely for your business"
                type="video"
                level="Beginner"
                duration="15 min"
                onStartLearning={() => {
                  const financialCourse = courses.find(
                    (course) => course.id === "financial-literacy"
                  );
                  if (financialCourse) {
                    setSelectedCourse(financialCourse);
                    setCurrentView("course");
                  }
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="farming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Sustainable Farming Practices"
                description="Learn eco-friendly farming techniques that improve yield"
                type="video"
                level="Beginner"
                duration="25 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Crop Rotation Basics"
                description="How to plan crop rotation to maintain soil health"
                type="guide"
                level="Intermediate"
                duration="20 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Pest Management"
                description="Natural methods to control pests and protect your crops"
                type="video"
                level="Beginner"
                duration="30 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Water Conservation"
                description="Techniques to reduce water usage while maintaining crop health"
                type="audio"
                level="Beginner"
                duration="15 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Post-Harvest Handling"
                description="How to store and preserve your harvest to reduce losses"
                type="guide"
                level="Intermediate"
                duration="25 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Organic Fertilizers"
                description="How to make and use organic fertilizers for better crops"
                type="video"
                level="Beginner"
                duration="20 min"
                onStartLearning={() => {
                  const farmingCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (farmingCourse) {
                    setSelectedCourse(farmingCourse);
                    setCurrentView("course");
                  }
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LearningCard
                title="Workplace Safety"
                description="How to stay safe and healthy while working at the market or farm"
                type="video"
                level="Beginner"
                duration="20 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Nutrition Basics"
                description="Understanding balanced diets and healthy eating habits"
                type="guide"
                level="Beginner"
                duration="15 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Heat Stress Prevention"
                description="How to protect yourself from heat-related illnesses while working"
                type="audio"
                level="Beginner"
                duration="10 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="First Aid Essentials"
                description="Basic first aid skills for common injuries at work"
                type="video"
                level="Intermediate"
                duration="30 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Mental Health Awareness"
                description="Understanding stress and maintaining mental wellbeing"
                type="guide"
                level="Beginner"
                duration="20 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
              <LearningCard
                title="Safe Food Handling"
                description="Proper techniques for handling and storing food products"
                type="video"
                level="Beginner"
                duration="15 min"
                onStartLearning={() => {
                  const healthCourse = courses.find(
                    (course) => course.id === "health-practices"
                  );
                  if (healthCourse) {
                    setSelectedCourse(healthCourse);
                    setCurrentView("course");
                  }
                }}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-green-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Learning Paths
          </h2>
          <p className="mb-6">
            Follow these structured learning paths to build your skills step by
            step:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-green-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Success</h3>
              <p className="text-gray-600 mb-4">
                Learn how to manage money, price products, and grow your
                business
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Financial Literacy Basics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Pricing Your Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>Record Keeping</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-blue-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Farming Excellence</h3>
              <p className="text-gray-600 mb-4">
                Master sustainable farming techniques to improve your yield
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Sustainable Farming Practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Pest Management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>Post-Harvest Handling</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                  className="w-6 h-6 text-red-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Health & Safety</h3>
              <p className="text-gray-600 mb-4">
                Protect yourself and your family with essential health knowledge
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 text-xs">
                    1
                  </div>
                  <span>Workplace Safety</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center mr-2 text-xs">
                    2
                  </div>
                  <span>Nutrition Basics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center mr-2 text-xs">
                    3
                  </div>
                  <span>First Aid Essentials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LearningCard({
  title,
  description,
  type,
  level,
  duration,
  onStartLearning,
}) {
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-6 w-6 text-red-500" />;
      case "audio":
        return <VolumeUp className="h-6 w-6 text-blue-500" />;
      case "guide":
        return <FileText className="h-6 w-6 text-green-500" />;
      default:
        return <BookOpen className="h-6 w-6 text-purple-500" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-700";
      case "audio":
        return "bg-blue-100 text-blue-700";
      case "guide":
        return "bg-green-100 text-green-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  const getTypeBackground = () => {
    switch (type) {
      case "video":
        return "from-red-200 to-red-100";
      case "audio":
        return "from-blue-200 to-blue-100";
      case "guide":
        return "from-green-200 to-green-100";
      default:
        return "from-purple-200 to-purple-100";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div
        className={`h-40 bg-gradient-to-r ${getTypeBackground()} flex items-center justify-center relative`}
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
        <div className="bg-white rounded-full p-4 shadow-md">
          {getTypeIcon()}
        </div>
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-500 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor()}`}
          >
            {type.toUpperCase()}
          </span>
          <div className="flex items-center">
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
              className="w-4 h-4 text-gray-500 mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs text-gray-500">{duration}</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-green-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 flex items-center">
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
              className="w-4 h-4 mr-1"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Level: {level}
          </span>
          <Button
            className="bg-green-600 hover:bg-green-700 transition-all"
            onClick={onStartLearning}
          >
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
              className="w-4 h-4 mr-2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LearningPlatform;
