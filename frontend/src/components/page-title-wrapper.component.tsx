import React from "react";

interface PageTitleWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const PageTitleWrapper: React.FC<PageTitleWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <div className="flex justify-between align-middle m-4">
        <div className="text-2xl font-semibold">{title.toUpperCase()}</div>
        {children}
      </div>
      <hr className="mx-4 border-t-1 border-gray-300" />
    </>
  );
};
