import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import according to your project structure

export const MovieGridSkeleton = () => {
  return (
    <div className="m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            className="w-full h-[450px] rounded-lg overflow-hidden"
            key={index}
          >
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
