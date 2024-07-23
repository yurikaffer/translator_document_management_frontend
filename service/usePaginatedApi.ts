import { useMemo } from "react";
import useSWR from "swr";

interface PaginatedApi {
  page: number;
  limit: number;
  endpoint: string;
  searchTerm?: string | undefined;
}

export default function usePaginatedApi({
  page,
  limit,
  endpoint,
  searchTerm,
}: PaginatedApi) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    searchTerm
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL + endpoint}/search?page=${page - 1}&size=${limit}&text=${searchTerm}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL + endpoint}?page=${page - 1}&size=${limit}`,
    fetcher,
    {
      revalidateOnMount: true,
      keepPreviousData: true,
    },
  );

  const isLoading = !data && !error;
  const loadingState = isLoading ? "loading" : "idle";
  const rowsPerPage = limit;

  const pages = useMemo(() => {
    return data?.totalPages;
  }, [data?.totalPages, rowsPerPage]);

  return { data, error, pages, loadingState };
}
