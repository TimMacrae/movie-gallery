import { GalleryMovieDialogValues } from "../components/gallery/zod/gallery-movie-dialog-schema.zod";
import { Movie } from "./movie.type";

export interface GalleryMovies {
  movies: Movie[];
}

export type GalleryMovie = GalleryMovieDialogValues;
