import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Goal, EducationalContent } from "../../types";

// Mock educational content - in production, this would come from your API
const EDUCATIONAL_CONTENT: EducationalContent[] = [
  {
    id: "1",
    title: "Learning Tip",
    content:
      "Break down complex topics into smaller, manageable pieces for better understanding.",
    type: "tip",
  },
  {
    id: "2",
    title: "Did You Know?",
    content:
      "Regular practice and building projects are more effective than passive learning.",
    type: "fact",
  },
  {
    id: "3",
    title: "Quote",
    content:
      '"The best way to learn is by doing. The second best way is by watching others do."',
    type: "quote",
  },
];

const LoadingState: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goal = location.state?.goal as Goal;

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!goal) {
      navigate("/search");
      return;
    }

    // Rotate educational content every 5 seconds
    const contentInterval = setInterval(() => {
      setCurrentContentIndex((prev) => (prev + 1) % EDUCATIONAL_CONTENT.length);
    }, 5000);

    // Simulate track generation progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Navigate to the personalized track when complete
          const trackId = crypto.randomUUID();
          navigate(`/track/${trackId}`, { state: { goal } });
          return prev;
        }
        return prev + 2;
      });
    }, 200);

    return () => {
      clearInterval(contentInterval);
      clearInterval(progressInterval);
    };
  }, [goal, navigate]);

  if (!goal) return null;

  const currentContent = EDUCATIONAL_CONTENT[currentContentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Building Your Learning Track
          </h1>
          <p className="text-gray-600">
            We're personalizing your learning journey based on your goal
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-right text-sm text-gray-500">
            {progress}% Complete
          </div>
        </div>

        {/* Loading animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
            <div
              className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin"
              style={{ borderTopColor: "transparent" }}
            />
          </div>
        </div>

        {/* Educational content carousel */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {currentContent.type === "tip" && (
                <span className="text-2xl">💡</span>
              )}
              {currentContent.type === "fact" && (
                <span className="text-2xl">ℹ️</span>
              )}
              {currentContent.type === "quote" && (
                <span className="text-2xl">💭</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                {currentContent.title}
              </h2>
              <p className="text-blue-800">{currentContent.content}</p>
            </div>
          </div>
        </div>

        {/* Goal summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Your Goal</h2>
          <p className="text-gray-900">{goal.text}</p>
          <div className="mt-2 text-sm text-gray-500">
            {goal.criteria.timeline.value} {goal.criteria.timeline.unit} •{" "}
            <span className="capitalize">{goal.criteria.experienceLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
