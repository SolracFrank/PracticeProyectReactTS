import { useQuery } from 'react-query';
import { FetchApiData } from '../../services/AxiosFetch';

interface GetDataQueryProps {
  api: string;
  apiField?: string;
  apiKey: string;
  cacheTime: number;
  token?: string;
}

export const useGetDataQuery = ({
  api,
  apiField,
  apiKey,
  cacheTime,
  token,
}: GetDataQueryProps) => {
  const fullApiUrl : string = `${api}${apiField || ''}`;
  console.log('useCache API: '+fullApiUrl)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [apiKey,apiField],
    queryFn: () => FetchApiData({api,apiField,token}),
    enabled: true,
    cacheTime: cacheTime,
    retry: 0,
    retryDelay: 3000
  }
  );
  return { data, isLoading, isError, error };
};
