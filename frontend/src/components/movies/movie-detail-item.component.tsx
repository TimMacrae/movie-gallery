import { ReactNode } from "react";

interface MovieDetailItemProps {
  name: string;
  value: string | ReactNode;
  children?: ReactNode;
}

export const MovieDetailItem: React.FC<MovieDetailItemProps> = ({
  name,
  value,
  children,
}) => {
  return (
    <p className="text-xl font-semibold mb-2">
      {`${name} `}
      <span className="font-medium">
        {value}
        {children}
      </span>
    </p>
  );
};
