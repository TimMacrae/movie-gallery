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
}

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // References to the user collection
  release_date: { type: Date, required: true },
  genre: { type: String, required: true },
  poster: { type: String, required: true },
  duration: { type: String, required: true },
  plot: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // References to the comments collection
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
