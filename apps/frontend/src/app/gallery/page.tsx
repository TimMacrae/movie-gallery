"use client";

import { Card } from "@/components/ui/card";
import { APIROUTES } from "@/api/api-routes.config";
import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieItem } from "@/components/movies/movie-item.component";
import Link from "next/link";
import React from "react";
import { useGalleryMovies } from "../../hooks/useGalleryMovies.query";
import { GalleryMoviesDialog } from "@/components/gallery/gallery-movie-dialog.component";
import { authProvider } from "@/components/auth/auth-provider.component";

function GalleryPage() {
  const { data, isLoading } = useGalleryMovies();

  return (
    <div style={{ minHeight: `calc(100vh - 80px` }}>
      <Card className="m-4">
        <div className="flex justify-between m-4">
          <div className="text-2xl font-semibold">Movie Gallery</div>
          <GalleryMoviesDialog type="add" />
        </div>
        <hr className="mx-4 border-t-1 border-gray-300" />
        {isLoading && <LoadingSpinner />}
        {data?.movies?.length === 0 ? (
          <div className="flex justify-center items-center text-center font-bold h-[85vh]">
            No movies found
          </div>
        ) : (
          <div
            className="flex flex-wrap gap-4 p-4"
            style={{ minHeight: "92vh" }}
          >
            {data?.movies?.map((movie) => (
              <Link
                key={movie._id}
                href={`${APIROUTES.API.GET_MOVIES}/${movie._id}`}
              >
                <div className="w-[300px] h-[450px]">
                  <MovieItem key={movie._id} movie={movie} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default authProvider(GalleryPage);
