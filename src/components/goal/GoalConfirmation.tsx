import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Goal } from "../../types";

const GoalConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goal = location.state?.goal as Goal;

  if (!goal) {
    // Handle case where user navigates directly to this page without a goal
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">No goal found to confirm.</p>
          <button
            onClick={() => navigate("/search")}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    // In production, you'd save the confirmed goal to your backend
    navigate("/track/loading", { state: { goal } });
  };

  const handleEdit = () => {
    // Navigate back to the appropriate edit screen
    if (goal.isTemplate) {
      navigate("/goal/template", { state: { goal } });
    } else {
      navigate("/goal/create", { state: { goal } });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Review Your Goal
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Goal Description
            </h2>
            <p className="text-gray-600 p-4 bg-gray-50 rounded-lg">
              {goal.text}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Timeline
              </h2>
              <p className="text-gray-600 p-4 bg-gray-50 rounded-lg">
                {goal.criteria.timeline.value} {goal.criteria.timeline.unit}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Experience Level
              </h2>
              <p className="text-gray-600 p-4 bg-gray-50 rounded-lg capitalize">
                {goal.criteria.experienceLevel}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Goal Clarity Score
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${goal.criteria.clarity * 100}%` }}
                />
              </div>
              <p className="text-gray-600 mt-2">
                {Math.round(goal.criteria.clarity * 100)}% Clear
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleEdit}
              className="flex-1 p-3 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Edit Goal
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalConfirmation;
