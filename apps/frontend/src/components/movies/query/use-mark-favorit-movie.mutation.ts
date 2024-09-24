"use client";
import { APIROUTES } from "@/src/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Movie } from "@/src/types/movie.type";

axios.defaults.withCredentials = true;

interface MarkFavoritMovieValues {
  movie_id: string;
  action: "add" | "remove";
}

const postMarkFavoritMovie = async (
  values: MarkFavoritMovieValues
): Promise<Movie> => {
  const { data } = await axios.post<Movie>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.POST_FAVORIT_MOVIE}`,
    values
  );
  return data;
};

export const useMarkFavoritMovieMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: postMarkFavoritMovie,
    onSuccess: (data: Movie) => {
      console.log("🐳 => data:", data);
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
