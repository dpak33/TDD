import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import SavedJobs from '../jobsearch/SavedJobs';
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SavedJobs Component', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
    });

    test('renders without crashing', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <SavedJobs />
                </MemoryRouter>
            );
        });

        // Wait for the loading indicator to disappear
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Check for the "No saved jobs found." message
        expect(screen.getByText('No saved jobs found.')).toBeInTheDocument();
    });

    test('fetches and displays saved jobs', async () => {
        const jobs = [
            { title: 'Software Engineer', company: 'Tech Inc.', location: 'New York', summary: 'Developing software', salary: '$100,000' },
            { title: 'Data Scientist', company: 'Data Co.', location: 'San Francisco', summary: 'Analyzing data', salary: '$120,000' },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: jobs });

        await act(async () => {
            render(
                <MemoryRouter>
                    <SavedJobs />
                </MemoryRouter>
            );
        });

        // Wait for axios get to be called
        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/jobs/saved-jobs');
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

    test('displays error message on fetch failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch saved jobs'));

        await act(async () => {
            render(
                <MemoryRouter>
                    <SavedJobs />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch saved jobs. Please try again.')).toBeInTheDocument();
        });
    });

    test('displays no saved jobs message when there are no jobs', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <SavedJobs />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('No saved jobs found.')).toBeInTheDocument();
        });
    });

    test('displays a loading state initially', () => {
        render(
            <MemoryRouter>
                <SavedJobs />
            </MemoryRouter>
        );


        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
