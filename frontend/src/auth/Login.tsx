import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!username || !password) {
            console.error('Username and password must not be empty');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/login', { username, password });
            console.log('User signed in successfully:', response.data.token);
            onLogin();
            navigate('/jobsearch');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios error
                console.error('Sign in error:', error.response?.data?.message);
            } else {
                // Non-Axios error
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default Login;