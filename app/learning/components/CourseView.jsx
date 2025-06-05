import React from "react";
import { ArrowLeft, BookOpen, ArrowRight, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseView = ({ course, progress, lessons, onBack, onLessonSelect }) => {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
          {course.title}
        </h1>
      </div>

      {/* Course Info Card */}
      <div className="mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 ${course.color} rounded-xl flex items-center justify-center text-2xl sm:text-3xl`}
            >
              {course.icon}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{course.description}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.lessons} lessons
                </span>
                <span>{course.duration}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-medium text-gray-700">{progress?.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${progress?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onLessonSelect(lesson)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    lesson.completed ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                  }`}>
                    {lesson.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lesson.completed ? (
                    <span className="text-sm text-green-600">Completed</span>
                  ) : (
                    <Play className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
