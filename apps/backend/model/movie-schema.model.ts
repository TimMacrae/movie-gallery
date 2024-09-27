import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types/movie.type";

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  release_date: { type: Date, required: true },
  genre: { type: String, required: true },
  poster: { type: String, required: true },
  duration: { type: String, required: true },
  plot: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  commentsTotal: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
