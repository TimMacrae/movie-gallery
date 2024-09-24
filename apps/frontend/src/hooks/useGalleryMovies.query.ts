import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";
import { GalleryMovies } from "../types/gallery-movies.type";

export const getGalleryMovies = async (): Promise<GalleryMovies> => {
  const response = await axios.get<GalleryMovies>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.GET_GALLERY_MOVIES}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useGalleryMovies = () => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.GALLERY_MOVIES],
    queryFn: () => getGalleryMovies(),
  });
};
