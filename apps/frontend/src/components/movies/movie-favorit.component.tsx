"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/src/hooks/useUser.query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useMarkFavoritMovieMutation } from "./query/use-mark-favorit-movie.mutation";

interface MovieFavoritProps {
  movie_id: string;
}

export const MovieFavorit: React.FC<MovieFavoritProps> = ({ movie_id }) => {
  const { data: user } = useUser();
  const markFavoritMovieMutation = useMarkFavoritMovieMutation();
  const isFavoritMovie: boolean =
    user?.favoritMovies?.some((id: string) => id === movie_id) ?? false;

  const handleAddOrRemoveFavoritMovie = () => {
    if (isFavoritMovie) {
      markFavoritMovieMutation.mutate({ movie_id, action: "remove" });
    }
    if (!isFavoritMovie) {
      markFavoritMovieMutation.mutate({ movie_id, action: "add" });
    }
  };

  if (!user) return null;
  return (
    <div className="absolute top-4 right-4 z-50">
      {isFavoritMovie ? (
        <Button
          variant="outline"
          className="px-2 py-1"
          onClick={() => handleAddOrRemoveFavoritMovie()}
        >
          <BookmarkCheck className="h-4 w-4 text-yellow-400" />
        </Button>
      ) : (
        <Button
          variant="outline"
          className="px-2 py-1"
          onClick={() => handleAddOrRemoveFavoritMovie()}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
