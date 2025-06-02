import React from "react";
import { BookOpen, Check } from "lucide-react";
import CourseCard from "./CourseCard";
import StreakCard from "./StreakCard";
import ProgressOverview from "./ProgressOverview";
import AchievementsList from "./AchievementsList";

const Dashboard = ({
  courses,
  userProgress,
  streakData,
  achievements,
  onCourseSelect,
}) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Akwaaba! Welcome Back
            </h1>
            <p className="text-gray-600">
              Wobɛkɔ so asua ɛnnɛ? • Ready to learn today?
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
          </div>
        </div>

        <StreakCard streakData={streakData} />
        <ProgressOverview />
      </div>

      {/* Available Courses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Available Courses • Adesua a Ɛwɔ Hɔ
        </h2>
        <div className="grid gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={userProgress[course.id]}
              onClick={() => onCourseSelect(course)}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <AchievementsList achievements={achievements} />
    </div>
  );
};

export default Dashboard;
