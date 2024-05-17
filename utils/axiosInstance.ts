import axios from 'axios';
import { getAccessToken } from './authUtils';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'https://node-mongo-auth.onrender.com',
    timeout: 5000, 
});

axiosInstance.interceptors.request.use(
    async function (config) {

        const accessToken = await getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;