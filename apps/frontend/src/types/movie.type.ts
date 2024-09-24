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
  user_id: string;
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

export interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}

export type CommentIds = string[];

export interface Comment {
  _id: string;
  movieId: string;
  user_id: { username: string; _id: string };
  comment: string;
}

export interface Rating {
  _id: string;
  movie_id: string;
  user_id: string;
  rating: number;
}
