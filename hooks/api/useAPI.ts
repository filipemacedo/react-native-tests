import camelize from "camelcase-keys";
import axios, { AxiosInstance } from "axios";

export const baseURL = "https://api.github.com/search";

type Params = {
  params?: Record<string, any>;
};

type Hook = (params?: Params) => AxiosInstance;

const useAPI: Hook = (params) => {
  const instance = axios.create({
    baseURL,
    params: {
      ...params,
    },
  });

  instance.interceptors.response.use(
    (response) => camelize(response, { deep: true }),
    (error) => {
      throw error;
    }
  );

  return instance;
};

export default useAPI;
