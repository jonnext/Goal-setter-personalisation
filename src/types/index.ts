export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export interface Duration {
  value: number;
  unit: "days" | "weeks" | "months";
}

export interface GoalCriteria {
  timeline: Duration;
  experienceLevel: ExperienceLevel;
  clarity: number;
}

export interface Goal {
  id: string;
  text: string;
  criteria: GoalCriteria;
  isTemplate: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  difficulty: ExperienceLevel;
}

export interface Track {
  id: string;
  goal: Goal;
  projects: Project[];
  progress: {
    completedProjects: string[];
    currentProject?: string;
  };
}

export interface EducationalContent {
  id: string;
  title: string;
  content: string;
  type: "tip" | "fact" | "quote";
}
