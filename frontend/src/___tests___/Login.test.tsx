import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../auth/Login'; // Adjust the path to your Login component
import axios from 'axios';
import { act } from 'react';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login Component', () => {
    test('Login form submits successfully', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { token: 'fake-token' } });

        render(<Login />);

        // Fill out and submit the form
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

        // Use getByRole to get the button
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        // Wait for axios post to be called
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/auth/login', {
                username: 'testuser',
                password: 'password123'
            });
        });
    });

    test('Prevents form submission with empty fields', async () => {
        render(<Login />);

        // Submit the form without filling out fields
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockedAxios.post).not.toHaveBeenCalled();
        });
    });

    test('Updates state correctly on input change', () => {
        render(<Login />);

        const usernameInput = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);

        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

        expect(usernameInput).toHaveValue('newuser');
        expect(passwordInput).toHaveValue('newpassword123');
    });
});