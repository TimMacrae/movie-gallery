import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIROUTES } from "../api/api-routes.config";

axios.defaults.withCredentials = true;

const fetchUser = async () => {
  const { data } = await axios.get(
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
