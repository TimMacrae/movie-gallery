"use client";

import React, { useState } from "react";
import { useMovies } from "@/hooks/useMovies.query";
import { MovieItem } from "@/components/movies/movie-item.component";
import Link from "next/link";
import { APIROUTES } from "@/api/api-routes.config";
import { MoviesPagination } from "@/components/movies/movie-pagination.component";
import { MoviesFilter } from "@/components/movies/movies-filter.component";
import { MoviesQueryFilter } from "@/types/movie.type";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function MoviesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [movieFilters, setMovieFilters] = useState<MoviesQueryFilter | null>(
    null
  );

  const { data, isLoading } = useMovies({
    page: pageNumber,
    limit: 8,
    ...movieFilters,
  });

  return (
    <div style={{ minHeight: `calc(100vh - 80px` }}>
      <MoviesFilter
        setMovieFilters={setMovieFilters}
        setPageNumber={setPageNumber}
      />
      <Card className="m-4">
        {isLoading && <LoadingSpinner />}
        <div
          className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2 gap-9 px-6 py-6 "
          style={{ height: "80vh" }}
        >
          {data?.movies.map((movie) => (
            <Link
              key={movie._id}
              href={`${APIROUTES.API.GET_MOVIES}/${movie._id}`}
            >
              <MovieItem key={movie._id} movie={movie} />
            </Link>
          ))}
        </div>
      </Card>
      <MoviesPagination
        setPageNumber={setPageNumber}
        pageNumber={data?.currentPage}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
