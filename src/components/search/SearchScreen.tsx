import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InlineSearchResults from "./InlineSearchResults";
import debounce from "lodash/debounce";

interface Template {
  id: string;
  title: string;
  description: string;
  timeline: { value: number; unit: string };
  experienceLevel: string;
  type: "template" | "project";
  icon?: string;
  metadata?: {
    platform?: string;
    type?: string;
    completionCount?: number;
    isPro?: boolean;
    userAvatars?: string[];
  };
}

// Mock templates - in production this would come from an API
const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Become AWS certified",
    description: "Structured certification preparation path",
    timeline: { value: 12, unit: "weeks" },
    experienceLevel: "beginner",
    type: "template",
    icon: "certification", // In production, this would be a proper icon path
  },
  {
    id: "2",
    title: "Build a serverless application",
    description: "Hands-on AWS project experience",
    timeline: { value: 8, unit: "weeks" },
    experienceLevel: "intermediate",
    type: "template",
    icon: "serverless", // In production, this would be a proper icon path
  },
  {
    id: "3",
    title: "Develop a virtual assistant with Watson Assistant",
    description: "Build an AI-powered chatbot",
    timeline: { value: 4, unit: "weeks" },
    experienceLevel: "intermediate",
    type: "project",
    metadata: {
      platform: "AWS",
      type: "Project",
      completionCount: 1.5,
      isPro: true,
      userAvatars: ["user1", "user2", "user3"], // In production, these would be actual avatar URLs
    },
  },
];

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // In a real app, this would be an API call
  const searchTemplates = (query: string) => {
    return MOCK_TEMPLATES.filter(
      (template) =>
        template.title.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/goal/template?id=${templateId}`);
  };

  const handleStartFromScratch = () => {
    navigate("/goal/create");
  };

  return (
    <div className="h-full p-4">
      <div className="space-y-8">
        <div className="flex w-full gap-2 mb-[32px]">
          <div className="flex-1 h-[56px] px-6 bg-[#f1f0ef] rounded-[8px] justify-center items-center flex">
            <div className="text-[#403b39] text-lg font-bold font-inter leading-7">
              Explore
            </div>
          </div>
          <div className="flex-1 h-[56px] px-6 rounded-[8px] justify-center items-center flex">
            <div className="text-[#887f7a] text-lg font-bold font-inter leading-7">
              My Projects
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div
            className="relative flex items-center h-[48px] bg-white outline-none border-b border-[#e5e5e4]"
            style={{ borderTop: "0", borderLeft: "0", borderRight: "0" }}
          >
            <div
              className="flex-shrink-0 ml-2"
              style={{ width: "24px", height: "24px" }}
            >
              <svg
                width="24"
                height="24"
                className="text-[#403b39] fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="What would you like to learn..."
              className="flex-1 pl-3 pr-4 text-lg text-[#403b39] placeholder-[#9f9995]
                focus:outline-none bg-transparent font-inter appearance-none border-0"
              style={{
                border: "0",
                outline: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
              aria-label="Search for what you'd like to learn"
            />
          </div>

          {showResults && (
            <InlineSearchResults
              searchTerm={searchTerm}
              templates={searchTemplates(searchTerm)}
              onTemplateSelect={handleTemplateSelect}
              onStartFromScratch={handleStartFromScratch}
            />
          )}
        </div>

        {!showResults && (
          <>
            <div className="relative text-center w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative">
                <span className="px-4 text-sm text-gray-500 bg-white">or</span>
              </div>
            </div>

            <div className="w-full">
              <button
                onClick={handleStartFromScratch}
                className="w-full p-4 text-blue-600 text-lg font-medium
                  hover:bg-blue-50 rounded-xl border-2 border-blue-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-all duration-200 transform hover:scale-105"
                aria-label="Start creating a goal from scratch"
              >
                Start from Scratch
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
