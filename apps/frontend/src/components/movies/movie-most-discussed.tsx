"use client";
import React from "react";
import { useMovies } from "@/hooks/useMovies.query";
import { SectionTitleWrapper } from "../section-title-wrapper.component";
import { MovieMostDiscussedItem } from "./movie-most-discussed-item";

export const MovieMostDiscussed: React.FC = () => {
  const { data } = useMovies({
    page: 1,
    limit: 2,
    sortBy: "commentsTotal",
    sortOrder: "desc",
  });

  if (!data) return null;
  return (
    <SectionTitleWrapper title="MOST DISCUSSED MOVIE">
      <div className="grid  md:grid-cols-2  lg:grid-cols-4 gap-4 h-[400px]">
        <MovieMostDiscussedItem movie={data.movies[0]} />
        <MovieMostDiscussedItem movie={data.movies[1]} />
      </div>
    </SectionTitleWrapper>
  );
};
