import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "@/api/api-routes.config";
import { Rating } from "@/types/movie.type";

export const getRating = async (movie_id: string): Promise<Rating> => {
  const response = await axios.get<Rating>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.GET_RATING}`,
    {
      params: { movie_id },
      withCredentials: true,
    }
  );
  return response.data;
};

export const useRating = (movie_id: string) => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.RATING, movie_id],
    queryFn: () => getRating(movie_id),
    retry: 1,
  });
};
