import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Goal, Duration, ExperienceLevel } from "../../types";

// Mock template data - would come from an API in production
const MOCK_TEMPLATES: Record<string, Goal> = {
  "1": {
    id: "1",
    text: "Learn React Development from basics to advanced concepts",
    isTemplate: true,
    criteria: {
      timeline: { value: 12, unit: "weeks" },
      experienceLevel: "beginner",
      clarity: 0.8,
    },
  },
  "2": {
    id: "2",
    text: "Become a full stack developer with React and Node.js",
    isTemplate: true,
    criteria: {
      timeline: { value: 24, unit: "weeks" },
      experienceLevel: "intermediate",
      clarity: 0.8,
    },
  },
};

interface GoalFormData {
  text: string;
  timeline: Duration;
  experienceLevel: ExperienceLevel;
}

const GoalTemplate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("id");

  // Handle invalid template ID
  if (!templateId || !MOCK_TEMPLATES[templateId]) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">Template not found.</p>
          <button
            onClick={() => navigate("/search")}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const template = MOCK_TEMPLATES[templateId];

  const [formData, setFormData] = useState<GoalFormData>({
    text: template.text,
    timeline: template.criteria.timeline,
    experienceLevel: template.criteria.experienceLevel,
  });

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
    // Create the final goal object
    const refinedGoal: Goal = {
      id: crypto.randomUUID(),
      text: formData.text,
      isTemplate: false,
      criteria: {
        timeline: formData.timeline,
        experienceLevel: formData.experienceLevel,
        clarity: 0.9, // Template-based goals start with high clarity
      },
    };

    // In production, you'd save this to your backend
    navigate("/goal/confirm", { state: { goal: refinedGoal } });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Refine Your Goal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Goal Description
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              Experience Level
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

export default GoalTemplate;
