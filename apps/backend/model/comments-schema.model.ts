import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  comment: string;
  user_id: mongoose.Types.ObjectId;
}

const commentSchema: Schema = new Schema({
  comment: { type: String, required: true, maxlength: 200 },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
