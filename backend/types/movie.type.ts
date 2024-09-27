import mongoose, { Document } from "mongoose";

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

export interface IMovie extends Document {
  title: string;
  user_id: mongoose.Types.ObjectId;
  release_date: Date;
  genre: string;
  poster: string;
  duration: string;
  plot: string;
  comments: mongoose.Types.ObjectId[];
  commentsTotal: number;
  averageRating: number;
  ratings: number;
}

export interface ResponseMovies {
  movies: IMovie[];
}

export interface RequestMoviesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  releaseYear?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  _id?: string;
}

export interface MovieQuery {
  _id?: string;
  title?: { $regex: string; $options: string };
  genre?: string;
  release_date?: { $gte: Date; $lt: Date };
}

export interface SortOptions {
  [key: string]: 1 | -1;
}

export interface ResponseMovieFilter {
  movies: IMovie[];
  totalPages: number;
  currentPage: number;
}

export interface RequestFavoriteMovie {
  movie_id: string;
  action: "add" | "remove";
}
