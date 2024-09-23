import { genres } from "@/src/types/movie.type";
import { z } from "zod";

export const GalleryMovieDialogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must not be longer than 100 characters" }),
  release_date: z.date({ message: "Release date must be a valid date" }),
  genre: z.enum(genres),
  poster: z.string().min(1, { message: "Poster is required" }),
  duration: z
    .string()
    .min(1, { message: "Duration is required" })
    .max(1000, { message: "Duration must not be longer than 1000 minutes" }),
  plot: z
    .string()
    .min(1, { message: "Plot is required" })
    .max(200, { message: "Plot must not be longer than 200 characters" }),
});

export type GalleryMovieDialogValues = z.infer<typeof GalleryMovieDialogSchema>;
