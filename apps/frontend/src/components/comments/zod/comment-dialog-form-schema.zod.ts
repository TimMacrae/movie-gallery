import { z } from "zod";

export const CommentDialogFormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(200, {
      message: "Comment must not be longer than 200 characters.",
    }),
});
