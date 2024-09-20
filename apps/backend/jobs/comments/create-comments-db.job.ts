import Comment from "../../model/comments-schema.model";
import { connectDB } from "../../helper/connectDB.helper";
import { comments } from "./comments";
import Movie from "../../model/movie-schema.model";
import mongoose from "mongoose";

const insertComments = async () => {
  try {
    await connectDB();
    const movies = await Movie.find();

    for (let movie of movies) {
      const movieComments = movie.comments;
      await Movie.findByIdAndUpdate(movie._id, {
        comments: [],
      });
      for (let comment_id of movieComments) {
        const comment = comments.find(
          (comment) => comment._id.toString() === comment_id.toString()
        );
        if (comment) {
          const newComment = new Comment({
            ...comment,
            movie_id: movie._id,
          });
          await newComment.save();
          console.log(`Inserted: ${newComment.comment}`);
        }
      }
    }
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

insertComments();
