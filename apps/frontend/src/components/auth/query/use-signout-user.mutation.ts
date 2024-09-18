"use client";
import { APIROUTES } from "@/src/api/api-routes.config";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

interface Message {
  message: string;
}

const signoutUser = async (): Promise<Message> => {
  const { data } = await axios.post<Message>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.SIGNOUT}`,
    { withCredentials: true }
  );
  return data;
};

export const useSignoutUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      queryClient.setQueryData([APIROUTES.QUERY_KEYS.USER], null);
      toast({
        title: "Success",
        description: "You have successfully signed out!",
      });
      router.push(APIROUTES.URL.SIGNIN);
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
