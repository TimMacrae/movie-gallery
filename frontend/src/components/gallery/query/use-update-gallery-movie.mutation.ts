"use client";
import { APIROUTES } from "@/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { GalleryMovie } from "@/types/gallery-movies.type";
import { Movie } from "@/types/movie.type";

axios.defaults.withCredentials = true;

const patchAddGalleryMovie = async (movie: GalleryMovie): Promise<Movie> => {
  const { data } = await axios.patch<Movie>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.ADD_GALLERY_MOVIE}`,
    { movie }
  );
  return data;
};

export const useUpdateGalleryMovieMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: patchAddGalleryMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.GALLERY_MOVIES],
      });
      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.MOVIES],
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
