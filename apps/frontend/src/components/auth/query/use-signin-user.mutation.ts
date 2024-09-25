"use client";
import { APIROUTES } from "@/api/api-routes.config";
import axios from "axios";
import { SignupResponse } from "@/components/auth/zod/signup-form-schema.zod";
import { SigninFormValues } from "@/components/auth/zod/signin-form-schema.zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

axios.defaults.withCredentials = true;

const signinUser = async ({
  email,
  password,
}: SigninFormValues): Promise<SignupResponse> => {
  const { data } = await axios.post<SignupResponse>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.SIGNIN}`,
    { email, password }
  );
  return data;
};

export const useSigninUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: signinUser,
    onSuccess: (data: SignupResponse) => {
      queryClient.setQueryData([APIROUTES.QUERY_KEYS.USER], data);
      toast({
        title: "Success",
        description: "You have successfully signed in!",
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
