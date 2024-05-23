import axios from 'axios';

export const signUp = async (username: string, email: string, password: string) => {
    try {
        await axios.post('http://localhost:5000/signup', { username, email, password });
        console.log('User signed up successfully');
    } catch (error) {
        console.error('Sign up error:', error.response.data.message);
        throw error;
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        console.log('User signed in successfully:', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('Sign in error:', error.response.data.message);
        throw error;
    }
};