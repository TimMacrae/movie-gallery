import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
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
  averageRating: { type: Number },
  ratings: { type: Number },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
