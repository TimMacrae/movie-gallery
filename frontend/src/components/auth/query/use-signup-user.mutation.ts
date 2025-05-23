"use client";
import { APIROUTES } from "@/api/api-routes.config";
import axios from "axios";
import {
  SignupFormValues,
  SignupResponse,
} from "@/components/auth/zod/signup-form-schema.zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

axios.defaults.withCredentials = true;

const signupUser = async ({
  username,
  email,
  password,
}: SignupFormValues): Promise<SignupResponse> => {
  const { data } = await axios.post<SignupResponse>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.SIGNUP}`,
    { username, email, password }
  );
  return data;
};

export const useSignupUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data: SignupResponse) => {
      queryClient.setQueryData([APIROUTES.QUERY_KEYS.USER], data);
      toast({
        title: "Success",
        description: "You have successfully signed up!",
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
