import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { saveJob } from '../utils/saveJob';
import { Job } from '../types';
import { useNavigate } from 'react-router-dom';

const JobSearchForm: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [jobs, setJobs] = useState<Job[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');

        if (!query) {
            setError('Please enter a job title.');
            return;
        }

        try {
            const response = await axios.get<Job[]>('http://127.0.0.1:5000/api/jobs', {
                params: { query, location },
            });
            setJobs(response.data);
        } catch (err) {
            setError('Failed to fetch job listings. Please try again.');
        }
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    onClick={() => navigate('/savedjobs')}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <h3 style={{ marginRight: '8px' }}>To saved jobs</h3>
                    <span>➜</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="query">Job Title:</label>
                    <input
                        type="text"
                        id="query"
                        value={query}
                        onChange={handleQueryChange}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={handleLocationChange}
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
                            <p>{job.salary}</p>
                            <button onClick={() => saveJob(job)}>Save Job</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobSearchForm;