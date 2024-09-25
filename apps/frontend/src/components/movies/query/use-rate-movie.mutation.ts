"use client";
import { APIROUTES } from "@/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Rating } from "@/types/movie.type";

axios.defaults.withCredentials = true;

interface RateMovieValues {
  movie_id: string;
  rating: number;
}

const postRateMovie = async (values: RateMovieValues): Promise<Rating> => {
  const { data } = await axios.post<Rating>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.POST_RATING}`,
    values
  );
  return data;
};

export const useRateMovieMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: postRateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.RATING],
      });
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.MOVIES],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error, could not rate the movie",
        description: error?.message || "Something went wrong.",
      });
    },
  });
};
