import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import JobSearchForm from '../jobsearch/JobSearchForm'; // Adjust the path to your JobSearchForm component

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('JobSearchForm Component', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
    });

    test('Job search form submits successfully', async () => {
        const jobs = [
            { title: 'Software Engineer', company: 'Tech Inc.', location: 'New York', summary: 'Developing software', salary: '$100,000' },
            { title: 'Data Scientist', company: 'Data Co.', location: 'San Francisco', summary: 'Analyzing data', salary: '$120,000' },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: jobs });

        render(<JobSearchForm />);

        // Fill out and submit the form
        fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Engineer' } });
        fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'New York' } });

        // Use getByRole to get the button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /search jobs/i }));
        });

        // Wait for axios get to be called
        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/jobs', {
                params: { query: 'Engineer', location: 'New York' }
            });
        });

        // Check that the job results are displayed
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('Tech Inc.')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText('Developing software')).toBeInTheDocument();
        expect(screen.getByText('Data Scientist')).toBeInTheDocument();
        expect(screen.getByText('Data Co.')).toBeInTheDocument();
        expect(screen.getByText('San Francisco')).toBeInTheDocument();
        expect(screen.getByText('Analyzing data')).toBeInTheDocument();
    });

    test('Prevents form submission with empty fields', async () => {
        render(<JobSearchForm />);

        // Submit the form without filling out fields
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /search jobs/i }));
        });

        await waitFor(() => {
            expect(screen.getByText('Please enter a job title.')).toBeInTheDocument();
        });

        expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    test('Updates state correctly on input change', () => {
        render(<JobSearchForm />);

        const queryInput = screen.getByLabelText(/Job Title/i);
        const locationInput = screen.getByLabelText(/Location/i);

        fireEvent.change(queryInput, { target: { value: 'Developer' } });
        fireEvent.change(locationInput, { target: { value: 'Boston' } });

        expect(queryInput).toHaveValue('Developer');
        expect(locationInput).toHaveValue('Boston');
    });
});