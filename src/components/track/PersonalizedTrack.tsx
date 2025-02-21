import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Goal, Project } from "../../types";

// Mock projects - in production, these would be generated based on the goal
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Basic Todo App",
    description:
      "Build a simple todo application to learn React fundamentals including components, props, and state.",
    duration: { value: 1, unit: "weeks" },
    difficulty: "beginner",
  },
  {
    id: "2",
    title: "Weather Dashboard",
    description:
      "Create a weather dashboard using React, working with APIs, and managing complex state.",
    duration: { value: 2, unit: "weeks" },
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "E-commerce Platform",
    description:
      "Build a full-featured e-commerce platform with authentication, cart management, and checkout process.",
    duration: { value: 4, unit: "weeks" },
    difficulty: "advanced",
  },
];

const PersonalizedTrack: React.FC = () => {
  const { trackId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const goal = location.state?.goal as Goal;

  if (!goal) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">Track not found.</p>
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

  const handleStartProject = (projectId: string) => {
    // In production, this would navigate to the project's learning interface
    console.log("Starting project:", projectId);
  };

  const handleEditGoal = () => {
    if (goal.isTemplate) {
      navigate("/goal/template", { state: { goal } });
    } else {
      navigate("/goal/create", { state: { goal } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Goal Summary */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Your Learning Track
              </h1>
              <p className="text-gray-600">{goal.text}</p>
            </div>
            <button
              onClick={handleEditGoal}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit Goal
            </button>
          </div>
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span>
              {goal.criteria.timeline.value} {goal.criteria.timeline.unit}
            </span>
            <span>•</span>
            <span className="capitalize">{goal.criteria.experienceLevel}</span>
            <span>•</span>
            <span>Track ID: {trackId}</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recommended Projects
          </h2>

          {MOCK_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {index + 1}. {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>
                      {project.duration.value} {project.duration.unit}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{project.difficulty}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartProject(project.id)}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Track Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Track Progress
            </h2>
            <span className="text-sm text-gray-500">0% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedTrack;
