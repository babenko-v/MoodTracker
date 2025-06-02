import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../../services/AuthService/Login.jsx";

export default function Login() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            await login(loginForm.email, loginForm.password);
            navigate("/mood/today");
        } catch (err) {
            setError("Невірний email або пароль");
        }
    };

    return (
        <div className="container py-5">
            <form
                onSubmit={handleSubmit}
                className="mx-auto p-4 shadow-sm bg-white"
                style={{ maxWidth: 400 }}
            >
                <h2 className="text-center mb-4">Login</h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Ваш email"
                        value={loginForm.email}
                        onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={loginForm.password}
                        onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        Войти
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/registration")}
                    >
                        Реєстрація
                    </button>
                </div>
            </form>
        </div>
    );
}
