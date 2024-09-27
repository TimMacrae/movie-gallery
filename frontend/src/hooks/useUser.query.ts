import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "@/api/api-routes.config";
import { User } from "@/types/user.type";

axios.defaults.withCredentials = true;

const fetchUser = async (): Promise<User> => {
  const { data } = await axios.get<User>(
    `${APIROUTES.API.ENDPOINT}${APIROUTES.API.GET_USER}`
  );
  return data;
};

export const useUser = () => {
  return useQuery({
    queryKey: [APIROUTES.QUERY_KEYS.USER],
    queryFn: fetchUser,
    staleTime: 5 * 10000,
    retry: 1,
  });
};
