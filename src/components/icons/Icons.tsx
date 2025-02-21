import React from "react";

export const CertificationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ServerlessIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M22 12H2M22 12L18 8M22 12L18 16M2 12L6 8M2 12L6 16"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export const StatusIcon = ({
  status,
}: {
  status?: "completed" | "in-progress" | "not-started";
}) => {
  switch (status) {
    case "completed":
      return (
        <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    case "in-progress":
      return (
        <div className="w-full h-full rounded-full border-2 border-blue-500">
          <div className="w-2/3 h-2/3 m-auto mt-[17%] bg-blue-500 rounded-full" />
        </div>
      );
    default:
      return (
        <div className="w-full h-full rounded-full border-2 border-gray-200" />
      );
  }
};
