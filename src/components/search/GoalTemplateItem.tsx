import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../utils";
import {
  CertificationIcon,
  ServerlessIcon,
  ChevronRight,
} from "../icons/Icons";

const templateItemVariants = cva(
  "flex items-center rounded-lg cursor-pointer group transition-all duration-200",
  {
    variants: {
      variant: {
        default: "hover:bg-blue-50/50",
        selected: "bg-blue-50 border-blue-200",
      },
      size: {
        default: "p-4",
        compact: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface GoalTemplateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: string;
  type: "template" | "project";
  variant?: "default" | "selected";
  size?: "default" | "compact";
  metadata?: {
    platform?: string;
    type?: string;
    completionCount?: number;
    isPro?: boolean;
    userAvatars?: string[];
  };
  onSelect?: () => void;
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case "certification":
      return <CertificationIcon />;
    case "serverless":
      return <ServerlessIcon />;
    default:
      return <div className="w-full h-full bg-blue-100 rounded-lg" />;
  }
};

const GoalTemplateItem = React.forwardRef<
  HTMLDivElement,
  GoalTemplateItemProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type,
      title,
      description,
      icon,
      metadata,
      onSelect,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(templateItemVariants({ variant, size }), className)}
      onClick={onSelect}
      {...props}
    >
      {/* Left Icon */}
      <div className="w-8 h-8 flex-shrink-0 mr-3">{getIconComponent(icon)}</div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        <div className="text-sm text-gray-500">
          {type === "project" && metadata ? (
            <div className="flex items-center space-x-2">
              {metadata.platform && <span>{metadata.platform}</span>}
              {metadata.type && (
                <>
                  <span>•</span>
                  <span>{metadata.type}</span>
                </>
              )}
              {metadata.userAvatars && (
                <>
                  <span>•</span>
                  <div className="flex -space-x-1">
                    {metadata.userAvatars.map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                      />
                    ))}
                  </div>
                </>
              )}
              {metadata.completionCount && (
                <>
                  <span>•</span>
                  <span>{metadata.completionCount}K completed</span>
                </>
              )}
              {metadata.isPro && (
                <>
                  <span>•</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 rounded">
                    Pro
                  </span>
                </>
              )}
            </div>
          ) : (
            <p className="truncate">{description}</p>
          )}
        </div>
      </div>

      {/* Right Badge/Arrow */}
      <div className="flex items-center ml-3">
        {type === "template" && (
          <span className="px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-md mr-2">
            Goal Template
          </span>
        )}
        <div className="transition-transform transform group-hover:translate-x-1">
          <ChevronRight />
        </div>
      </div>
    </div>
  )
);

GoalTemplateItem.displayName = "GoalTemplateItem";

export { GoalTemplateItem, type GoalTemplateItemProps };
