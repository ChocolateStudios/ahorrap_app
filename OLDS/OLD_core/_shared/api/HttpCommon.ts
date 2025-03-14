import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
});

// Interceptor to add an authorization token to each request
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        console.log('INTERCEPTOR HABLANDO');
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Interceptor for handling server errors
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Sesión expirada');
                    break;
                case 500:
                    console.error('Error en el servidor');
                    break;
            }
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
        } else {
            console.error('Error al configurar la petición');
        }
        return Promise.reject(error);
    }
);

export default instance;
