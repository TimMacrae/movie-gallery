"use client";

import React, { useState } from "react";
import { useMovies } from "@/hooks/useMovies.query";
import { MovieItem } from "@/components/movies/movie-item.component";
import Link from "next/link";
import { APIROUTES } from "@/api/api-routes.config";
import { MoviesPagination } from "@/components/movies/movie-pagination.component";
import { MoviesFilter } from "@/components/movies/movies-filter.component";
import { MoviesQueryFilter } from "@/types/movie.type";
import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieGridSkeleton } from "@/components/skeleton/movie-grid-skeleton.component";

export default function MoviesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [movieFilters, setMovieFilters] = useState<MoviesQueryFilter | null>(
    null
  );

  const { data, isLoading } = useMovies({
    page: pageNumber,
    limit: 10,
    ...movieFilters,
  });

  return (
    <div style={{ minHeight: `calc(100vh - 100px` }}>
      <MoviesFilter
        setMovieFilters={setMovieFilters}
        setPageNumber={setPageNumber}
      />
      <div className="m-4">
        {isLoading ? (
          <MovieGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data?.movies.map((movie) => (
              <Link
                className="w-full h-[450px]"
                key={movie._id}
                href={`${APIROUTES.API.GET_MOVIES}/${movie._id}`}
              >
                <MovieItem key={movie._id} movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <MoviesPagination
        setPageNumber={setPageNumber}
        pageNumber={data?.currentPage}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
