import mongoose, { Document } from "mongoose";

export interface CommentFlattened {
  _id: string;
  user_id: string;
  comment: string;
}

export interface IComment extends Document {
  comment: string;
  user_id: mongoose.Types.ObjectId;
  movie_id: mongoose.Types.ObjectId;
}

export interface ResponseComment {
  _id: string;
  comment: string;
  user_id: { _id: string; username: string };
  movie_id: string;
}
