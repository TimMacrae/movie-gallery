import React from "react";

interface SectionTitleWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const SectionTitleWrapper: React.FC<SectionTitleWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className="px-4">
      <h3 className="mt-8 mb-4 font-semibold">{title.toUpperCase()}</h3>
      {children}
    </div>
  );
};
