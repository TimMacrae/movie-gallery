import mongoose, { Schema, Document } from "mongoose";
import Movie from "./movie-schema.model";

interface IComment extends Document {
  comment: string;
  user_id: mongoose.Types.ObjectId;
  movie_id: mongoose.Types.ObjectId;
}

const commentSchema: Schema = new Schema({
  comment: { type: String, required: true, maxlength: 200 },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  movie_id: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
});

// Post save middleware to update commentsTotal in Movie model and add comment ID to Movie comments array
commentSchema.post("save", async function (doc: IComment) {
  try {
    const commentsCount = await Comment.countDocuments({
      movie_id: doc.movie_id,
    });
    await Movie.findByIdAndUpdate(doc.movie_id, {
      commentsTotal: commentsCount,
      $push: { comments: doc._id },
    });
  } catch (error) {
    console.error("Error updating commentsTotal and adding comment ID:", error);
  }
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
