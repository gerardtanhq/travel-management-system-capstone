import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import { API_URL } from './config';

export default function LoginForm() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const token = useSelector((state) => state.auth.token);
    const adminName = useSelector((state) => state.auth.adminName);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(
            `${API_URL}/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('adminName', data.name);

        dispatch(login({
            token: data.token,
            adminName: data.name,
        }));

        setMessage(`Welcome, ${data.name}.`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');

        dispatch(logout());

        setEmail('');
        setPassword('');
        setMessage('');
    };

    if (token) {
        return (
            <div className="login-container">
                <h2>Admin Login</h2>

                <span>
                    Welcome, {adminName}.
                </span>

                <button
                    className='logout-button'
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
            />

            <button type="submit">
                Login
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}