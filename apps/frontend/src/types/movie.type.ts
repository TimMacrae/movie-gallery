export const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Science-Fiction",
  "Thriller",
  "Animation",
  "Documentary",
  "Fantasy",
] as const;

export type Genre = (typeof genres)[number];

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  release_date: number;
  genre: Genre;
  duration: number;
  plot: string;
  comments: string[];
  ratings: number;
  averageRating: number;
  commentsTotal: number;
}

export interface MoviesQueryFilter {
  search?: string;
  genre?: string;
  releaseYear?: string;
  top10?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export interface MoviesQueryParams extends MoviesQueryFilter {
  page: number;
  limit: number;
}

export interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}
