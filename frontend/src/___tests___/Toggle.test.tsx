import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Toggle from '../components/Toggle';
import JobSearchForm from '../jobsearch/JobSearchForm';
import SavedJobs from '../jobsearch/SavedJobs';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';

const MockPage = ({ text }: { text: string }) => (
    <div>
        <Toggle />
        <h1>{text}</h1>
    </div>
);

describe('Toggle Component', () => {

    test('renders correct initial text based on path', () => {
        render(
            <MemoryRouter initialEntries={['/jobsearch']}>
                <MockPage text="Job Search Page" />
            </MemoryRouter>
        );

        expect(screen.getByText('To Saved Jobs')).toBeInTheDocument();

        render(
            <MemoryRouter initialEntries={['/login']}>
                <MockPage text="Login Page" />
            </MemoryRouter>
        );

        expect(screen.getByText('To Sign Up')).toBeInTheDocument();
    });

    test('navigates between job search and saved jobs', () => {
        render(
            <MemoryRouter initialEntries={['/jobsearch']}>
                <Routes>
                    <Route path="/jobsearch" element={<MockPage text="Job Search Page" />} />
                    <Route path="/savedjobs" element={<MockPage text="Saved Jobs Page" />} />
                </Routes>
            </MemoryRouter>
        );

        const toggleContainer = screen.getByRole('button', { name: 'toggle navigation' });
        expect(toggleContainer).toBeInTheDocument();

        fireEvent.click(toggleContainer);
        expect(screen.getByText('Saved Jobs Page')).toBeInTheDocument();

        fireEvent.click(toggleContainer);
        expect(screen.getByText('Job Search Page')).toBeInTheDocument();
    });

    test('navigates between login and signup', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<MockPage text="Login Page" />} />
                    <Route path="/signup" element={<MockPage text="Sign Up Page" />} />
                </Routes>
            </MemoryRouter>
        );

        const toggleContainer = screen.getByRole('button', { name: 'toggle navigation' });
        expect(toggleContainer).toBeInTheDocument();

        fireEvent.click(toggleContainer);
        expect(screen.getByText('Sign Up Page')).toBeInTheDocument();

        fireEvent.click(toggleContainer);
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    test('displays the correct text when navigating', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/jobsearch']}>
                <Toggle />
            </MemoryRouter>
        );

        const toggleContainer = container.querySelector('.toggle-container');
        fireEvent.click(toggleContainer!);
        expect(screen.getByText('To Job Search')).toBeInTheDocument();

        fireEvent.click(toggleContainer!);
        expect(screen.getByText('To Saved Jobs')).toBeInTheDocument();
    });

    test('displays the correct text when navigating between login and signup', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Toggle />
            </MemoryRouter>
        );

        const toggleContainer = container.querySelector('.toggle-container');
        fireEvent.click(toggleContainer!);
        expect(screen.getByText('To Login')).toBeInTheDocument();

        fireEvent.click(toggleContainer!);
        expect(screen.getByText('To Sign Up')).toBeInTheDocument();
    });
});