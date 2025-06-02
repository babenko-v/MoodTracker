import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';



export async function logoutService() {

    await axios.post(
        `${API_BASE}/auth/logout/`,
        {},
        { withCredentials: true }
    );

    localStorage.removeItem('access_token');
}
