import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Job } from '../types';

const SavedJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const response = await axios.get<Job[]>(`${process.env.REACT_APP_BACKEND_URL}/jobs/saved-jobs`);
                setJobs(response.data);
            } catch (err) {
                setError('Failed to fetch saved jobs. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobs();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : jobs.length > 0 ? (
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.summary}</p>
                            <p>{job.salary}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved jobs found.</p>
            )}
        </div>
    );
};

export default SavedJobs;