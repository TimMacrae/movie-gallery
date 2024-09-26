"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMovies } from "@/hooks/useMovies.query";
import Image from "next/image";
import { APIROUTES } from "@/api/api-routes.config";
import Link from "next/link";
import { SectionTitleWrapper } from "../section-title-wrapper.component";

export const MovieTop10: React.FC = () => {
  const { data } = useMovies({
    page: 1,
    limit: 10,
    sortBy: "averageRating",
    sortOrder: "desc",
  });

  return (
    <SectionTitleWrapper title="THE BEST RATED MOVIES">
      <Carousel className="h-full " opts={{ loop: true, align: "start" }}>
        <CarouselContent className="-ml-2 ">
          {data?.movies?.map((movie, index) => (
            <CarouselItem
              key={movie._id}
              className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5 xl:basis-1/6  "
            >
              <div className="p-4 pt-0">
                <Link
                  key={movie._id}
                  href={`${APIROUTES.API.GET_MOVIES}/${movie._id}`}
                >
                  <Card className="h-[300px] w-[210px]">
                    <CardContent className="relative flex  items-center justify-center p-0 h-full w-full">
                      <span
                        style={{
                          textShadow:
                            "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff",
                        }}
                        className="absolute bottom-2 -left-3 text-6xl font-bold text-black"
                      >
                        {index + 1}
                      </span>
                      <Image
                        src={APIROUTES.API.ENDPOINT + movie.poster}
                        alt={movie.title}
                        width={210}
                        height={300}
                        className="rounded-xl object-cover w-full h-full shadow-lg"
                      />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white" />
        <CarouselNext className="right-0 bg-white" />
      </Carousel>
    </SectionTitleWrapper>
  );
};
