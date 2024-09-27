import Movie from "../../model/movie-schema.model";
import { connectDB } from "../../helper/connectDB.helper";
import { movies } from "./movies";
import mongoose from "mongoose";

const insertMovies = async () => {
  try {
    await connectDB();
    for (let movie of movies) {
      const newMovie = new Movie({
        ...movie,
        user_id: new mongoose.Types.ObjectId(),
      });
      await newMovie.save();
      console.log(`Inserted: ${movie.title}`);
    }
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

insertMovies();
