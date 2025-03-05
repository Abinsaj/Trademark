import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? "/api" : BASE_URL,   
});

export default axiosInstance;