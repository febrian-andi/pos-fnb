import useSWR from "swr";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data);

export const useFetchData = (url, id = null) => {

  const { data, error, isLoading: loading, mutate } = useSWR(
    id ? `${API_URL}${url}/${id}` : `${API_URL}${url}`,
    (url) => fetcher(url)
  );

  const errorMessage = error
    ? error?.response?.data?.error || "Something went wrong"
    : null;

  const refetch = async () => {
    try {
      await mutate();
    } catch (refetchError) {
      console.error("Error while refetching:", refetchError);
    }
  };

  return { data, error: errorMessage, loading, refetch };
};