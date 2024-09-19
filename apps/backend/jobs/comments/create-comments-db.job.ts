import Comment from "../../model/comments-schema.model";
import { connectDB } from "../../helper/connectDB.helper";
import { comments } from "./comments";
import mongoose from "mongoose";

const insertComments = async () => {
  try {
    await connectDB();
    for (let comment of comments) {
      const newComment = new Comment(comment);
      await newComment.save();
      console.log(`Inserted: ${newComment.comment}`);
    }
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

insertComments();
