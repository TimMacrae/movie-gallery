"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/src/hooks/useUser.query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useMarkFavoriteMovieMutation } from "./query/use-mark-favorite-movie.mutation";

interface MovieFavoriteProps {
  movie_id: string;
}

export const MovieFavorite: React.FC<MovieFavoriteProps> = ({ movie_id }) => {
  const { data: user } = useUser();
  const markFavoriteMovieMutation = useMarkFavoriteMovieMutation();
  const isFavoriteMovie: boolean =
    user?.favoriteMovies?.some((id: string) => id === movie_id) ?? false;

  const handleAddOrRemoveFavoriteMovie = () => {
    if (isFavoriteMovie) {
      markFavoriteMovieMutation.mutate({ movie_id, action: "remove" });
    }
    if (!isFavoriteMovie) {
      markFavoriteMovieMutation.mutate({ movie_id, action: "add" });
    }
  };

  if (!user) return null;
  return (
    <div className="absolute top-4 right-4 z-50">
      {isFavoriteMovie ? (
        <Button
          variant="outline"
          className="px-2 py-1"
          onClick={() => handleAddOrRemoveFavoriteMovie()}
        >
          <BookmarkCheck className="h-4 w-4 text-yellow-400" />
        </Button>
      ) : (
        <Button
          variant="outline"
          className="px-2 py-1"
          onClick={() => handleAddOrRemoveFavoriteMovie()}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
