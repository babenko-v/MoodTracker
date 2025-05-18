import { useState } from 'react';
import { login } from "../../services/AuthService/Login.jsx"

function Login() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Вызываем функцию логина
            await login(loginForm.email, loginForm.password);
            console.log('Успешный вход');
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    }

    return (
        <div className="container mx-auto cont">
            <form action="#" method="POST" onSubmit={handleSubmit}>  {/* Здесь изменяем onChange на onSubmit */}
                <div className="master_2">
                    <h2 className="header_regist">Registration</h2>
                    <div className="input">
                        <input
                            className="form-control mx-auto my-3"
                            placeholder="Ваш email"
                            type="email"
                            name="useremail"
                            value={loginForm.email}
                            onChange={(event) => setLoginForm(prev => ({...prev, email: event.target.value}))}
                        />

                        <input
                            className="form-control mx-auto my-3"
                            placeholder="Пароль"
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={(event) => setLoginForm(prev => ({...prev, password: event.target.value}))}
                        />
                    </div>
                    <div className="md-mx-auto btn-reg">
                        <button className='button_left' type="submit">Войти</button> {/* Кнопка для отправки */}
                        <button className='button_right' type="reset">Уже маю аккаунт</button>
                    </div>
                </div>
            </form>

            <div>
                <h1>Email: {loginForm.email}</h1>
                <h1>Password: {loginForm.password}</h1>
            </div>
        </div>
    );
}

export default Login;