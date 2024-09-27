interface NoItemsFoundProps {
  text: string;
  className?: string;
}

export const NoItemsFound: React.FC<NoItemsFoundProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={`flex justify-center items-center text-center font-bold h-[85vh] ${className}`}
    >
      {text}
    </div>
  );
};
