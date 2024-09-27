import { connectDB } from "../../helper/connectDB.helper";

import mongoose from "mongoose";
import Rating from "../../model/rating-schema.model";
import Movie from "../../model/movie-schema.model";

// create me a random number between 1-5

const insertComments = async () => {
  try {
    await connectDB();
    const movies = await Movie.find();
    for (let movie of movies) {
      const randomRatingCount = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < randomRatingCount; i++) {
        const newRating = new Rating({
          movie_id: movie._id,
          user_id: new mongoose.Types.ObjectId(),
          rating: Math.floor(Math.random() * 5) + 1,
        });
        await newRating.save();
        console.log(`Inserted: ${newRating}`);
      }
    }
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

insertComments();
