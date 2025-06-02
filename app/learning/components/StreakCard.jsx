import React from "react";

const StreakCard = ({ streakData }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="text-6xl">🔥</div>
        </div>
        <div className="text-3xl font-bold text-orange-600 mb-1">
          {streakData.currentStreak}
        </div>
        <div className="text-gray-600 font-medium">Day Streak!</div>
        <div className="text-sm text-gray-500">
          Nnafua {streakData.currentStreak} toɔ so!
        </div>
        {streakData.currentStreak >= 7 && (
          <div className="mt-2 text-sm text-emerald-600 font-medium">
            Ayɛ! You're on fire! 🎉
          </div>
        )}
      </div>

      {/* Weekly Progress */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {streakData.weekData.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-500 mb-2">{day.day}</div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                day.completed
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {day.completed ? "✓" : day.date}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Longest streak: {streakData.longestStreak} days</span>
        <span>Streak tenten: nnafua {streakData.longestStreak}</span>
      </div>

      {!streakData.todayCompleted && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
          <div className="text-orange-700 font-medium mb-1">
            Don't break your streak!
          </div>
          <div className="text-sm text-orange-600">
            Mma wo streak mmu! Complete a lesson today
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakCard;
