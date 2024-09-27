import { Skeleton } from "../ui/skeleton";

export const MovieMostDiscussedItemSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton className="w-[300px] h-[450px] rounded-xl" />
      </div>
      <div className="h-auto overflow-hidden relative">
        <div className="">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 my-0 rounded-lg">
              <Skeleton className="w-32 h-6 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
