import axios from "axios";
import { getToken } from "../services/token.service";

const BASE_URL = "http://127.0.0.1:5000"; // To be moved into an environment variable

const $api = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

$api.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `Bearer ${getToken()}`;
		return config;
	},
	(error) => Promise.reject(error)
);

export default $api;
