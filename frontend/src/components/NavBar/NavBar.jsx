import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutService } from '../../services/AuthService/Logout.jsx'

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutService();
            navigate('/login');
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        MoodTracker
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {[
                                { to: '/login',        label: 'Login' },
                                { to: '/registration', label: 'Registration' },
                                { to: '/mood/today',   label: 'Today Mood' },
                                { to: '/mood/report',  label: 'Report Mood' },
                            ].map(({ to, label }) => (
                                <li className="nav-item" key={to}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `nav-link${isActive ? ' active' : ''}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="nav-item">
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-link nav-link"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
