import React from "react";

const ProgressOverview = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Learning Journey</h2>
        <span className="text-sm text-gray-500">Wo Adesua Akwan</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">4</div>
          <div className="text-sm text-gray-600">Lessons Completed</div>
          <div className="text-xs text-gray-500">Adesua a Wowieɛ</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-gray-600">Certificates</div>
          <div className="text-xs text-gray-500">Nkratafa</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">18</div>
          <div className="text-sm text-gray-600">Study Hours</div>
          <div className="text-xs text-gray-500">Adesua Nnɔnhwere</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
