import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Volume2,
  RotateCcw,
  Download,
  Play,
  Pause,
} from "lucide-react";

const LessonView = ({
  lesson,
  course,
  lessons,
  onBack,
  onComplete,
  isPlaying,
  onPlayPause,
}) => {
  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(lesson?.videoUrl);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Video Player Header */}
      <div className="bg-black p-4">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={onBack}
            className="flex items-center hover:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          <div className="text-center">
            <h2 className="font-medium">{lesson.title}</h2>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative bg-black aspect-video max-w-4xl mx-auto">
        {videoId ? (
          // YouTube Video Player
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          // Audio Player
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Volume2 className="w-16 h-16" />
              </div>
              <h3 className="text-xl mb-2">Audio-Visual Lesson</h3>
              <p className="text-gray-400">Lesson with voice-over narration</p>
            </div>
          </div>
        )}

        {/* Play Controls - Only show for audio content */}
        {!videoId && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <button className="text-white hover:text-gray-300">
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700"
                onClick={onPlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
              <button className="text-white hover:text-gray-300">
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-4 text-white text-sm">
              <span>2:34</span>
              <div className="flex-1 bg-gray-600 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
              <span>7:20</span>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Content */}
      <div className="bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Key Learning Points
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Understanding the basics of money management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>How to track your daily sales and expenses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Simple record-keeping methods for your business</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-emerald-700"
                  onClick={onComplete}
                >
                  Complete Lesson
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">Course Progress</h4>
                <div className="space-y-3">
                  {lessons.slice(0, 4).map((l) => (
                    <div key={l.id} className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          l.completed
                            ? "bg-green-600 text-white"
                            : l.id === lesson.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {l.completed ? <Check className="w-4 h-4" /> : l.id}
                      </div>
                      <span
                        className={`text-sm ${
                          l.id === lesson.id ? "font-medium" : ""
                        }`}
                      >
                        {l.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
