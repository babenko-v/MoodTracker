import api from '../AuthService/interceptor.jsx'
import axios from 'axios';


export const login = async (email, password) => {
    try {
        const { data } = await api.post(
            "/auth/api/token/",
            { email, password },
            { withCredentials: true }
        );
        const { access } = data;
        localStorage.setItem("access_token", access);
        return true;
    } catch (error) {
        console.error("Помилка при вході:", error);
        throw error;
    }
};


const API_BASE = 'http://127.0.0.1:8000';

export async function refreshAccessToken() {

    const response = await axios.post(
        `${API_BASE}/auth/api/token/refresh/`,
        null
    );
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    console.log('[Auth] New access token saved:', access);
    return access;
}
