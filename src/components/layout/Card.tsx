import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-[32px] overflow-hidden min-h-[600px] ${className}`}
      style={{
        backgroundColor: "white",
        border: "1px solid #D0CDCB",
        padding: "40px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="animate-fadeIn w-full h-full flex flex-col bg-white [&>*]:w-full">
        {children}
      </div>
    </div>
  );
};

export default Card;
