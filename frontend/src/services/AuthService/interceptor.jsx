// src/services/AuthService/interceptor.jsx
import axios from 'axios';
import { refreshAccessToken } from './Login.jsx';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[Auth] Attaching access token to request:', token);
    }
    return config;
});


api.interceptors.response.use(
    res => res,
    async error => {
        const { response, config } = error;
        const url = config.url || '';

        if (
            url.endsWith('/auth/api/token/') ||
            url.endsWith('/auth/api/token/refresh/')
        ) {
            console.warn('[Auth] Token endpoint error, skip auto-refresh/redirect:', response?.status);
            return Promise.reject(error);
        }

        if (response?.status === 401 && !config._retry) {
            config._retry = true;
            console.warn('[Auth] Access token expired, attempting refresh…');
            try {
                const newAccess = await refreshAccessToken();
                console.info('[Auth] Refresh succeeded, new token:', newAccess);
                api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
                config.headers.Authorization = `Bearer ${newAccess}`;
                console.log('[Auth] Retrying original request with new token');
                return api(config);
            } catch (e) {
                console.error('[Auth] Refresh failed, redirecting to login', e);
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
