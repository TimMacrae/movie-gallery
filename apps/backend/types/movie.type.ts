export type Genre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Horror"
  | "Romance"
  | "Science-Fiction"
  | "Thriller"
  | "Animation"
  | "Documentary"
  | "Fantasy";

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
}

export interface MoviesQueryFilter {
  _id?: string;
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
