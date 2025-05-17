// src/services/AuthService/auth.js
import api from "../../../services/AuthService/interceptor.jsx";

// логін і збереження обох токенів
export const login = async (email, password) => {
    try {
        const { data } = await api.post("/auth/api/token/", { email, password });
        const { access, refresh } = data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        return true;
    } catch (error) {
        console.error("Помилка при вході:", error);
        throw error;
    }
};

// оновлення access за допомогою refresh
export const refreshAccessToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("Refresh-токен відсутній");

        const { data } = await api.post("/auth/api/token/refresh/", { refresh });
        const { access } = data;
        localStorage.setItem("access_token", access);
    } catch (error) {
        console.error("Помилка при оновленні токена:", error);
        throw error;
    }
};
