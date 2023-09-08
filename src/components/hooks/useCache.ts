import { useQuery } from 'react-query';

interface GetDataQueryProps {
  api: string;
  apiField?: string;
  apiKey: string;
  cacheTime: number;
}

export const useGetDataQuery = ({ api, apiField, apiKey, cacheTime }: GetDataQueryProps) => {
  const { data, isLoading, isError, error } = useQuery(
    [apiKey, apiField], 
    async () => {
      const response = await fetch(api + (apiField || '')); 
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }
      return response.json();
    },
    {
      cacheTime: cacheTime,
    }
  );

  return { data, isLoading, isError, error };
};
