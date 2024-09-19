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
