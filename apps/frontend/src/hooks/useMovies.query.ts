import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";
import { Movie } from "../components/movies/types/movie.type";

interface MoviesQueryParams {
  page: number;
  limit: number;
  search?: string;
  genre?: string;
  releaseYear?: string;
  top10?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}

const getMovies = async (
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
  });
};
