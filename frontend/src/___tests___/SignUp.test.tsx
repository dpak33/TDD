import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../auth/SignUp';
import axios from 'axios';
import { act } from 'react';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('SignUp form submits successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'User signed up successfully' } });

    render(<SignUp />);

    // Fill out and submit the form
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    // Use getByRole to get the button
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for axios post to be called
    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/auth/signup', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
    });

    // Optionally, add more expectations if needed
});