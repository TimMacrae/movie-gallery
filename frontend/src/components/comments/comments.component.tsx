"use client";
import { useComments } from "@/hooks/useComments.query";
import { CommentIds } from "@/types/movie.type";
import { Comment } from "./comment.component";
import { CommentDialog } from "./comment-dialog.component";

interface MovieCommentsProps {
  commentIds: CommentIds;
  movieId: string;
}

export const Comments: React.FC<MovieCommentsProps> = ({
  movieId,
  commentIds,
}) => {
  const { data: comments } = useComments(commentIds);

  if (!comments) return null;
  return (
    <div className="m-4 p-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">COMMENTS</div>
        <CommentDialog movieId={movieId} />
      </div>

      <hr className="mt-4 border-t-1 border-gray-300" />
      <div>
        {!comments?.length ? (
          <div className="text-center font-medium mt-8">No comments</div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};
