import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from '../auth/Login'; // Adjust the path to your Login component
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login Component', () => {
    const mockOnLogin = jest.fn();

    beforeEach(() => {
        mockOnLogin.mockClear();
        mockedAxios.post.mockClear();
    });

    test('Login form submits successfully', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { token: 'fake-token' } });

        render(
            <MemoryRouter>
                <Login onLogin={mockOnLogin} />
            </MemoryRouter>
        );

        // Fill out and submit the form
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

        // Use getByRole to get the button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        });

        // Wait for axios post to be called
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/auth/login', {
                username: 'testuser',
                password: 'password123'
            });
        });

        // Check that the onLogin function was called
        expect(mockOnLogin).toHaveBeenCalled();
    });

    test('Prevents form submission with empty fields', async () => {
        render(
            <MemoryRouter>
                <Login onLogin={mockOnLogin} />
            </MemoryRouter>
        );

        // Submit the form without filling out fields
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockedAxios.post).not.toHaveBeenCalled();
        });

        // Check that the onLogin function was not called
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    test('Updates state correctly on input change', () => {
        render(
            <MemoryRouter>
                <Login onLogin={mockOnLogin} />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);

        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

        expect(usernameInput).toHaveValue('newuser');
        expect(passwordInput).toHaveValue('newpassword123');
    });
});