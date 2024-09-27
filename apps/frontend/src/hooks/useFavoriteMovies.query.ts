import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";
import { GalleryMovies } from "../types/gallery-movies.type";

export const getFavoriteMovies = async (): Promise<GalleryMovies> => {
  const response = await axios.get<GalleryMovies>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.GET_FAVORITE_MOVIES}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useFavoriteMovies = () => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.FAVORITE_MOVIES],
    queryFn: () => getFavoriteMovies(),
    retry: 1,
  });
};
