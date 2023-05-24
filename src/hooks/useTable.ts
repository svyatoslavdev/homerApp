import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { api } from 'api/axiosConfig';
import { AxiosResponse } from 'axios';

interface ISearchParams {
  page: number;
  per_page: number;
}

export interface IBeer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  brewers_tips: string;
  ibu: number;
}

interface IUseTable {
  handleSearchParams: (
    key: string,
    value: number | Record<string, string>,
  ) => void;
  page: number;
  rowsPerPage: number;
  sortDirection: 'asc' | 'desc' | undefined;
}

const getBeers = async (params: ISearchParams) =>
  api
    .get<AxiosResponse<IBeer[]>>('/beers', { params })
    .then(response => response.data);

export const useTable = (): [UseQueryResult<IBeer[], Error>, IUseTable] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const rowsPerPage = searchParams.get('rowsPerPage');
  const sortDirection = searchParams.get('sortDirection');

  const query: UseQueryResult<IBeer[], Error> = useQuery(
    ['beers', page, rowsPerPage],
    () =>
      getBeers({
        page: page && +page > 0 ? +page! + 1 : 1,
        per_page: rowsPerPage ? +rowsPerPage! : 10,
      }),
    { keepPreviousData: true },
  );

  useEffect(() => {
    if (Array.from(searchParams.values()).length === 0) {
      setSearchParams(
        qs.stringify({
          page: 0,
          rowsPerPage: 10,
          sortDirection: '',
        }),
      );
    }
  }, []);

  const handleSearchParams = (
    key: string,
    value: number | Record<string, string>,
  ) => {
    if (typeof value === 'object') {
      setSearchParams(
        qs.stringify({ ...qs.parse(searchParams.toString()), ...value }),
      );
    } else {
      if (key === 'rowsPerPage') {
        setSearchParams(
          qs.stringify({
            page: 0,
            [key]: value,
            sortDirection,
          }),
        );

        return;
      }

      setSearchParams(
        qs.stringify({
          page,
          rowsPerPage,
          sortDirection,
          [key]: value,
        }),
      );
    }
  };

  const sortedBeers = useMemo(() => {
    if (!query.data) {
      return query.data;
    }

    if (!sortDirection) {
      return query.data;
    }

    return sortDirection === 'asc'
      ? [...query.data].sort((a, b) => a.abv - b.abv)
      : [...query.data].sort((a, b) => b.abv - a.abv);
  }, [sortDirection, query.data]);

  return [
    { ...query, data: sortedBeers } as UseQueryResult<IBeer[], Error>,
    {
      handleSearchParams,
      rowsPerPage: rowsPerPage ? +rowsPerPage! : 10,
      page: page ? +page! : 1,
      sortDirection: sortDirection
        ? (sortDirection as 'asc' | 'desc')
        : undefined,
    },
  ];
};
