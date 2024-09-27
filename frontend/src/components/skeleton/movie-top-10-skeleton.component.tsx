import { CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export const MovieTop10Skeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <CarouselItem
      key={index}
      className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5 xl:basis-1/6  "
    >
      <Skeleton className="h-[300px] w-[210px]" />
    </CarouselItem>
  ));
};
