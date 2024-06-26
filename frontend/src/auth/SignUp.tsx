import React, { useState } from 'react';
import axios from 'axios';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, { username, email, password });
            console.log('User signed up successfully');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios error
                console.error('Sign up error:', error.response?.data?.message);
                setError(error.response?.data?.message || 'Sign up failed');
            } else {
                // Non-Axios error
                console.error('An unexpected error occurred:', error);
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;