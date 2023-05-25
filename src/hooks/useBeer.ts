import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IBeer } from "./useTable";
import { api } from "api/axiosConfig";
import { AxiosResponse } from "axios";

const getBeer = async (id: string) =>
  api
    .get<AxiosResponse<IBeer[]>>(`/beers/${id}`)
    .then((response) => response.data);

export const useBeer = (id: string) => {
  const query: UseQueryResult<IBeer[], Error> = useQuery(["beer", id], () =>
    getBeer(id)
  );

  return query;
};
