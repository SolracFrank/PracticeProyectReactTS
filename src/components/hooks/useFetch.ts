import { useEffect, useState } from "react";
import { NestedObject } from "../../interfaces/Interfaces";
import axios from "axios";

export const useGetData = (apiUrl: string, apiUrlId: string) => {
  const [data, setData] = useState<NestedObject>({});
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}+${apiUrlId}`);
        setData(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, [apiUrl, apiUrlId]);

  return { data, status };
};

export const useGetAllData = (apiUrl:string) => {
  const [data, setData] = useState<[]>();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}`);
        setData(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, status };
};
