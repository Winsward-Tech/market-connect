import React from "react";
import { BookOpen } from "lucide-react";

const CourseCard = ({ course, progress, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center text-2xl`}
        >
          {course.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <span className="text-sm text-gray-500">{course.titleTwi}</span>
          </div>
          <p className="text-gray-600 mb-3">{course.description}</p>
          <p className="text-sm text-gray-500 mb-3">{course.descriptionTwi}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.lessons} lessons
              </span>
              <span>{course.duration}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {course.level}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 ${course.color} rounded-full`}
                  style={{ width: `${progress?.progress || 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {progress?.progress || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
