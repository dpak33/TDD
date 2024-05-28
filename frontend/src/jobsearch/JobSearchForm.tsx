import React, { useState } from 'react';
import axios from 'axios';

interface Job {
    title: string;
    company: string;
    location: string;
    summary: string;
}

const JobSearchForm: React.FC = () => {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [jobs, setJobs] = useState<Job[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Reset error state
        setError('');

        // Validate inputs
        if (!query || !location) {
            setError('Please enter both a job title and a location.');
            return;
        }

        // Simulate API call
        try {
            // Replace this with your actual API endpoint
            const response = await axios.get('/api/dummy-jobs', { params: { query, location } });
            setJobs(response.data);
        } catch (err) {
            setError('Failed to fetch job listings. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="query">Job Title:</label>
                    <input
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Search Jobs</button>
            </form>

            {jobs.length > 0 && (
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.summary}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobSearchForm;