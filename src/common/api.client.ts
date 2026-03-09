import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globales o tokens si fuera necesario en el futuro
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí se podría manejar el refresco de tokens o logs de errores
    return Promise.reject(error);
  }
);

export default apiClient;
