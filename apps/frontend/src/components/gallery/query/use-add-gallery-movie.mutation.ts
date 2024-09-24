"use client";
import { APIROUTES } from "@/src/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { GalleryMovie } from "@/src/types/gallery-movies.type";
import { Movie } from "@/src/types/movie.type";

axios.defaults.withCredentials = true;

const postAddGalleryMovie = async (movie: GalleryMovie): Promise<Movie> => {
  const { data } = await axios.post<Movie>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.ADD_GALLERY_MOVIE}`,
    { movie }
  );
  return data;
};

export const useAddGalleryMovieMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: postAddGalleryMovie,
    onSuccess: (data: Movie) => {
      console.log("🐳 => data:", data);
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.GALLERY_MOVIES],
      });
      toast({
        title: "Success",
        description: "Movies is successfully created!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Something went wrong.",
      });
    },
  });
};
