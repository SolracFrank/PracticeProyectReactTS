import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError<unknown> | null;
};

 const useFetch = <T>(url: string, params?: Record<string, unknown>): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError<unknown> | null>(null);

  useEffect(() => {
    setLoading(true);
    
    axios.get<T>(url, { params })
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err: AxiosError<unknown>) => {
        setError(err);
        setLoading(false);
      });
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;