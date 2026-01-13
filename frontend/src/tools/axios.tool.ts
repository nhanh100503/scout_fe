import axios, { AxiosInstance } from 'axios';
import { getLS } from './localStorage.tool';
import { useToast } from '@/composables/useToast';
const { toast, showToast } = useToast();
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getLS("accessToken");
        if (token) { config.headers.Authorization = `Bearer ${token}`; } return config;
    });

// apiClient.ts
import mitt from "mitt";
export const emitter = mitt();

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const apiRes = error.response.data;
            if (apiRes.code === 403) {
                emitter.emit("forbidden", apiRes.message);
            }
            return Promise.reject(apiRes);
        }
        return Promise.reject(error);
    }
);



// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             return Promise.reject(error.response.data);
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
