"use client";
import { APIROUTES } from "@/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Movie } from "@/types/movie.type";

axios.defaults.withCredentials = true;

interface MarkFavoriteMovieValues {
  movie_id: string;
  action: "add" | "remove";
}

const postMarkFavoriteMovie = async (
  values: MarkFavoriteMovieValues
): Promise<Movie> => {
  const { data } = await axios.post<Movie>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.POST_FAVORITE_MOVIE}`,
    values
  );
  return data;
};

export const useMarkFavoriteMovieMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: postMarkFavoriteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.USER],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error, could not mark movie as favorit",
        description: error?.message || "Something went wrong.",
      });
    },
  });
};
