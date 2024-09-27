"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieItem } from "@/components/movies/movie-item.component";
import React from "react";
import { useGalleryMovies } from "../../hooks/useGalleryMovies.query";
import { GalleryMoviesDialog } from "@/components/gallery/gallery-movie-dialog.component";
import { authProvider } from "@/components/auth/auth-provider.component";
import { PageTitleWrapper } from "@/components/page-title-wrapper.component";
import { NoItemsFound } from "@/components/no-items-found";
import { MovieItemWrapper } from "@/components/movies/movie-item-wrapper.component";

function GalleryPage() {
  const { data, isLoading } = useGalleryMovies();

  return (
    <div>
      <div className="mt-12">
        <PageTitleWrapper title="MOVIE GALLERY">
          <GalleryMoviesDialog type="add" />
        </PageTitleWrapper>
        {isLoading && <LoadingSpinner />}
        {data?.movies?.length === 0 ? (
          <NoItemsFound text="No movies found" />
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
      </div>
    </div>
  );
}

export default authProvider(GalleryPage);
