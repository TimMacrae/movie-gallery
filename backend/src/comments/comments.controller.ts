import { Request, Response } from "express";
import Comment from "../../model/comments-schema.model";
import User from "../../model/user-schema.model";
import Movie from "../../model/movie-schema.model";
import { BaseController } from "../utils/base.controller";
import { IComment, ResponseComment } from "../../types/comment.type";
import { ResponseMessage } from "../../types/response.type";

class CommentController extends BaseController {
  public getComments = this.handleRequest(
    async (
      req: Request<{}, {}, { commentIds: string[] }>,
      res: Response<IComment[]>
    ) => {
      const { commentIds } = req.body;

      const comments = await Comment.find({
        _id: { $in: commentIds },
      }).populate("user_id", "username");

      return res.status(200).json(comments);
    }
  );

  public createComment = this.handleRequest(
    async (
      req: Request<{}, {}, IComment>,
      res: Response<ResponseComment | ResponseMessage>
    ) => {
      const { comment, user_id, movie_id } = req.body;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const movie = await Movie.findById(movie_id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      const newComment = new Comment({
        comment,
        user_id,
        movie_id,
      });

      const savedComment = await newComment.save();

      const sendComment = {
        // @ts-ignore
        ...savedComment._doc,
        user_id: { _id: user?._id, username: user?.username },
      };
      return res.status(201).json(sendComment);
    }
  );
}

export default new CommentController();
