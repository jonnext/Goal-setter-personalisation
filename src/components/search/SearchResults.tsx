import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Temporary mock data - this would come from your API in production
const MOCK_TEMPLATES = [
  {
    id: "1",
    title: "Learn React Development",
    description: "Master React.js from basics to advanced concepts",
    timeline: { value: 12, unit: "weeks" },
    experienceLevel: "beginner",
  },
  {
    id: "2",
    title: "Full Stack Development",
    description: "Become a full stack developer with React and Node.js",
    timeline: { value: 24, unit: "weeks" },
    experienceLevel: "intermediate",
  },
];

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("q") || "";

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/goal/template?id=${templateId}`);
  };

  const handleStartFromScratch = () => {
    navigate("/goal/create");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-600 mt-2">
            Select a template or start from scratch
          </p>
        </div>

        <div className="grid gap-6">
          {MOCK_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {template.title}
              </h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>
                  {template.timeline.value} {template.timeline.unit}
                </span>
                <span>•</span>
                <span className="capitalize">{template.experienceLevel}</span>
              </div>
            </div>
          ))}

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer"
            onClick={handleStartFromScratch}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Start from Scratch
            </h2>
            <p className="text-gray-600">
              Create a custom goal tailored to your needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
