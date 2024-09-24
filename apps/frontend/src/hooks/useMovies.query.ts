import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";
import { MoviesQueryParams, MoviesResponse } from "../types/movie.type";

export const getMovies = async (
  moviesQueryParams: MoviesQueryParams
): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.GET_MOVIES}`,
    {
      params: moviesQueryParams,
      withCredentials: true,
    }
  );
  return response.data;
};

export const useMovies = (moviesQueryParams: MoviesQueryParams) => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.MOVIES, moviesQueryParams],
    queryFn: () => getMovies(moviesQueryParams),
    retry: 1,
  });
};
