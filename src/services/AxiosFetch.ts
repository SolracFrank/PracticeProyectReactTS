import axios from 'axios';

interface FetchApiDataProps {
  api: string;
  apiField?: string;
  token?: string;
}

export const FetchApiData = async ({
  api,
  apiField,
  token,
}: FetchApiDataProps) => {
  try {
    const fullApiUrl : string = `${api}${apiField || ''}`;
    console.log('Probando AXIOS: '+fullApiUrl);
    const client = axios.create({
      baseURL: fullApiUrl,
      headers: {
        Authorization: `${token}`,
        Accept: 'text/plain',
      }
    });
    console.log('abc')
    const response = await client.get('');
    
    console.log("data: ",response);

    return response.data;
  } catch (err) {
    console.log('error '+err)
    throw new Error('Error al obtener datos '+err);
  }
};
