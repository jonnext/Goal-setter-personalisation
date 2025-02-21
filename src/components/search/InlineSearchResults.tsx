import React from "react";
import { GoalTemplateItem } from "./GoalTemplateItem";

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

interface InlineSearchResultsProps {
  searchTerm: string;
  templates: Template[];
  onTemplateSelect: (templateId: string) => void;
  onStartFromScratch: () => void;
}

const InlineSearchResults: React.FC<InlineSearchResultsProps> = ({
  searchTerm,
  templates,
  onTemplateSelect,
  onStartFromScratch,
}) => {
  if (!searchTerm.trim()) {
    return null;
  }

  const goalTemplates = templates.filter((t) => t.type === "template");
  const projects = templates.filter((t) => t.type === "project");

  return (
    <div className="w-full mt-8">
      {/* Goal Templates Section */}
      {goalTemplates.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">GOAL TEMPLATES</h2>
          <div className="space-y-8">
            {goalTemplates.map((template) => (
              <GoalTemplateItem
                key={template.id}
                type="template"
                title={template.title}
                description={template.description}
                icon={template.icon}
                onSelect={() => onTemplateSelect(template.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-8">PROJECTS</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <GoalTemplateItem
                key={project.id}
                type="project"
                title={project.title}
                description={project.description}
                metadata={project.metadata}
                onSelect={() => onTemplateSelect(project.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Start from Scratch */}
      <div className="mt-8">
        <button
          onClick={onStartFromScratch}
          className="w-full p-6 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <span className="text-2xl font-bold block">Start from Scratch</span>
          <span className="text-lg text-gray-600 mt-2">
            Create a custom goal tailored to your needs
          </span>
        </button>
      </div>
    </div>
  );
};

export default InlineSearchResults;
