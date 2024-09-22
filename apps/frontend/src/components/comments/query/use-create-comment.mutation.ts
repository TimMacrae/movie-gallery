"use client";
import { APIROUTES } from "@/src/api/api-routes.config";
import axios from "axios";
import { CreateCommentValues } from "@/src/components/comments/zod/create-comment-schema.zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/src/types/movie.type";

axios.defaults.withCredentials = true;

const postCreateComment = async (
  comment: CreateCommentValues
): Promise<Comment> => {
  const { data } = await axios.post<Comment>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.POST_CREATE_COMMENT}`,
    comment
  );
  return data;
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: postCreateComment,
    onSuccess: (data: Comment) => {
      console.log("🐳 => data:", data);
      queryClient.setQueryData(
        [APIROUTES.QUERY_KEYS.COMMENTS],
        (oldData: Comment[]) => {
          oldData ? oldData.push(data) : oldData;
          console.log("🍉 => ", oldData);
        }
      );

      queryClient.invalidateQueries({
        queryKey: [APIROUTES.QUERY_KEYS.MOVIES],
      });
      toast({
        title: "Success",
        description: "Comment was successfully created!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Something went wrong.",
      });
    },
  });
};
