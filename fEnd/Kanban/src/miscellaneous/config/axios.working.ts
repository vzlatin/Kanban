import axios from "axios";
import { getToken } from "../../services/token.service";

const baseURL: string = import.meta.env.VITE_BASE_URL;
const timeout: number = import.meta.env.VITE_TIMEOUT;

const $api = axios.create({
    baseURL,
    timeout,
    withCredentials: true,
  });
  
  $api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  export default $api;