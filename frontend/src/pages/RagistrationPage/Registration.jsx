import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/AuthService/interceptor.jsx';
import axios from "axios";

export default function Registration() {

    const API_BASE = 'http://127.0.0.1:8000';

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', password2: '' });
    const [error, setError] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        const API_BASE = 'http://127.0.0.1:8000';
        e.preventDefault();
        setError(null);
        if (form.password !== form.password2) {
            setError('Паролі не співпадають');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/auth/registration/', {
                email: form.email,
                password: form.password,
                password2: form.password2,
            });
            navigate('/login');
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                JSON.stringify(err.response?.data) ||
                'Не вдалося зареєструватися'
            );
        }
    };

    return (
        <div className="container py-5">
            <form
                className="mx-auto p-4 shadow-sm bg-white"
                style={{ maxWidth: 400 }}
                onSubmit={handleSubmit}
            >
                <h2 className="text-center mb-4">Registration</h2>

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
                        name="email"
                        className="form-control"
                        placeholder="Ваш email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input
                        id="password2"
                        type="password"
                        name="password2"
                        className="form-control"
                        placeholder="Підтвердіть пароль"
                        value={form.password2}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        Зареєструватися
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/login')}
                    >
                        Уже маю аккаунт
                    </button>
                </div>
            </form>
        </div>
    );
}
