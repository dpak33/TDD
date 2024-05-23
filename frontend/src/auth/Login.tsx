import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log('User signed in successfully:', response.data.token);
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default Login;