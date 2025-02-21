import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Goal, Duration, ExperienceLevel } from "../../types";

interface GoalFormData {
  text: string;
  timeline: Duration;
  experienceLevel: ExperienceLevel;
}

const calculateGoalClarity = (text: string): number => {
  // This is a simple implementation - in production, you'd want more sophisticated criteria
  const factors = {
    length: text.length > 30 ? 0.3 : 0.1,
    hasSpecifics: /\b(learn|master|build|create|develop|understand)\b/i.test(
      text
    )
      ? 0.3
      : 0.1,
    hasContext: /\b(with|using|through|by|in)\b/i.test(text) ? 0.2 : 0.1,
    hasTechnology:
      /\b(react|javascript|typescript|node|web|frontend|backend)\b/i.test(text)
        ? 0.2
        : 0.1,
  };

  return Math.min(
    Object.values(factors).reduce((sum, value) => sum + value, 0),
    1
  );
};

const GoalCreate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingGoal = location.state?.goal as Goal | undefined;

  const [formData, setFormData] = useState<GoalFormData>({
    text: existingGoal?.text || "",
    timeline: existingGoal?.criteria.timeline || { value: 12, unit: "weeks" },
    experienceLevel: existingGoal?.criteria.experienceLevel || "beginner",
  });

  const [clarity, setClarity] = useState(existingGoal?.criteria.clarity || 0);
  const [showClarityTips, setShowClarityTips] = useState(false);

  useEffect(() => {
    const newClarity = calculateGoalClarity(formData.text);
    setClarity(newClarity);
    setShowClarityTips(newClarity < 0.6);
  }, [formData.text]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "timeline.value") {
      setFormData((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, value: parseInt(value) || 0 },
      }));
    } else if (name === "timeline.unit") {
      setFormData((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, unit: value as Duration["unit"] },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clarity < 0.4) {
      setShowClarityTips(true);
      return;
    }

    const goal: Goal = {
      id: existingGoal?.id || crypto.randomUUID(),
      text: formData.text,
      isTemplate: false,
      criteria: {
        timeline: formData.timeline,
        experienceLevel: formData.experienceLevel,
        clarity,
      },
    };

    navigate("/goal/confirm", { state: { goal } });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create Your Goal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What do you want to learn?
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="e.g., Master React development with TypeScript and build production-ready applications"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {showClarityTips && (
              <div className="mt-2 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Tips to improve your goal clarity:
                </p>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                  <li>Be specific about what you want to learn</li>
                  <li>Include the technology or skills you want to master</li>
                  <li>
                    Mention how you plan to learn (e.g., by building projects)
                  </li>
                  <li>Consider the end result you're aiming for</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Goal Clarity Score
              </label>
              <span className="text-sm text-gray-500">
                {Math.round(clarity * 100)}% Clear
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  clarity < 0.4
                    ? "bg-red-500"
                    : clarity < 0.7
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${clarity * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="timeline.value"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Duration
              </label>
              <input
                type="number"
                id="timeline.value"
                name="timeline.value"
                value={formData.timeline.value}
                onChange={handleInputChange}
                min={1}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="timeline.unit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Time Unit
              </label>
              <select
                id="timeline.unit"
                name="timeline.unit"
                value={formData.timeline.unit}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 p-3 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalCreate;
