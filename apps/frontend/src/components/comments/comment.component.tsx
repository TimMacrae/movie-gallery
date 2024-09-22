import React from "react";
import { Comment as CommentType } from "../../types/movie.type";

interface MovieCommentProps {
  comment: CommentType;
}

export const Comment: React.FC<MovieCommentProps> = ({ comment }) => {
  return (
    <div key={comment._id} className="p-4 my-0 rounded-lg">
      <p className="text-lg font-semibold">{comment.user_id.username}</p>
      <p>{comment.comment}</p>
    </div>
  );
};
