import React from "react";
import { ArrowLeft, BookOpen, ArrowRight, Check, Play } from "lucide-react";

const CourseView = ({ course, progress, lessons, onBack, onLessonSelect }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard • San kɔ Dashboard
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-4 mb-6">
            <div
              className={`w-20 h-20 ${course.color} rounded-xl flex items-center justify-center text-3xl`}
            >
              {course.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-2">{course.titleTwi}</p>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
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

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress • Nkɔsoɔ</span>
              <span className="text-sm font-medium">
                {progress?.progress || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 ${course.color} rounded-full transition-all duration-300`}
                style={{ width: `${progress?.progress || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Course Content • Adesua Mu Nsɛm
          </h2>
        </div>

        <div className="divide-y">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-6 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              onClick={() => onLessonSelect(lesson)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    lesson.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {lesson.completed ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.titleTwi}</p>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseView;
