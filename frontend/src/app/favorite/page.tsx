"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieItem } from "@/components/movies/movie-item.component";
import React from "react";
import { GalleryMoviesDialog } from "@/components/gallery/gallery-movie-dialog.component";
import { authProvider } from "@/components/auth/auth-provider.component";
import { PageTitleWrapper } from "@/components/page-title-wrapper.component";
import { MovieItemWrapper } from "@/components/movies/movie-item-wrapper.component";
import { NoItemsFound } from "@/components/no-items-found";
import { useFavoriteMovies } from "@/hooks/useFavoriteMovies.query";
import { MovieGridSkeleton } from "@/components/skeleton/movie-grid-skeleton.component";

function GalleryPage() {
  const { data, isLoading } = useFavoriteMovies();

  return (
    <div>
      <div className="mt-12">
        <PageTitleWrapper title="FAVORITE MOVIES">
          <GalleryMoviesDialog type="add" />
        </PageTitleWrapper>
        {isLoading ? (
          <MovieGridSkeleton />
        ) : (
          <div
            className="flex flex-wrap gap-4 p-4"
            style={{ minHeight: "92vh" }}
          >
            {data?.movies?.map((movie) => (
              <MovieItemWrapper key={movie._id} movie={movie}>
                <MovieItem key={movie._id} movie={movie} />
              </MovieItemWrapper>
            ))}
          </div>
        )}

        {data?.movies?.length === 0 && <NoItemsFound text="No movies found" />}
      </div>
    </div>
  );
}

export default authProvider(GalleryPage);
