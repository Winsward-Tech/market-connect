import React from "react";
import { Check } from "lucide-react";

const AchievementsList = ({ achievements }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Your Achievements • Wo Nkɔanim
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl text-center ${
              achievement.earned
                ? "bg-yellow-50 border-2 border-yellow-200"
                : "bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h3 className="font-medium text-sm">{achievement.title}</h3>
            <p className="text-xs text-gray-500">{achievement.titleTwi}</p>
            {achievement.earned && (
              <Check className="w-4 h-4 text-green-600 mx-auto mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
