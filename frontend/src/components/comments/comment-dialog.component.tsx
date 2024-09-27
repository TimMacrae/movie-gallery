"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CommentDialogFormSchema } from "./zod/comment-dialog-form-schema.zod";
import { useCreateCommentMutation } from "./query/use-create-comment.mutation";
import { useUser } from "@/hooks/useUser.query";

interface CommentDialogProps {
  movieId: string;
}

export const CommentDialog: React.FC<CommentDialogProps> = ({ movieId }) => {
  const { data: user } = useUser();
  const { mutate } = useCreateCommentMutation();

  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof CommentDialogFormSchema>>({
    resolver: zodResolver(CommentDialogFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CommentDialogFormSchema>) => {
    mutate({ ...data, user_id: user?._id as string, movie_id: movieId });
    form.reset();
    setIsOpen(false);
  };

  const handleOpneChange = (pre: boolean) => {
    setIsOpen(pre);
    form.reset();
  };

  const hasError = Object.keys(form.formState.errors).length > 0;

  if (!user || !movieId) return null;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(pre) => {
        handleOpneChange(pre);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2 py-1">
          <Plus className=" h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>CREATE A COMMENT</DialogTitle>
          <DialogDescription>
            Tell us what you think about the movie.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button type="submit" disabled={hasError}>
                CREATE COMMENT
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
