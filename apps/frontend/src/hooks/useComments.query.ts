import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";
import { Comment, CommentIds } from "../types/movie.type";

export const getComments = async (
  commentIds: CommentIds
): Promise<Comment[]> => {
  const response = await axios.post<Comment[]>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.POST_COMMENTS}`,
    {
      commentIds,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useComments = (commentIds: CommentIds) => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.COMMENTS],
    queryFn: () => getComments(commentIds),
    retry: 1,
  });
};
