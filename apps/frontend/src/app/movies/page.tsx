"use client";

import React, { useState } from "react";
import { useMovies } from "../../hooks/useMovies.query";
import { MovieItem } from "../../components/movies/movie-item.component";
// import Link from "next/link";
// import { APIROUTES } from "@/src/api/api-routes.config";
import { MoviesPagination } from "@/src/components/movies/movie-pagination.component";
import { MoviesFilter } from "@/src/components/movies/movies-filter.component";

export default function MoviesPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading } = useMovies({
    page: pageNumber,
    limit: 8,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: `calc(100vh - 80px` }}>
      <MoviesFilter />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-9 px-6 py-6 "
        style={{ height: "82vh" }}
      >
        {data?.movies.map((movie) => (
          // <Link key={movie._id} href={`${APIROUTES.API.GET_MOVIE}/${movie._id}`}>
          <MovieItem key={movie._id} movie={movie} />
          // </Link>
        ))}
      </div>
      <MoviesPagination
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
