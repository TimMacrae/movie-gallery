import { z } from "zod";

export const createCommentSchema = z.object({
  user_id: z.string(),
  movie_id: z.string(),
  comment: z.string(),
});

export type CreateCommentValues = z.infer<typeof createCommentSchema>;
