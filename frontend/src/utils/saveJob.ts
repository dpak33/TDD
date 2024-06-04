import axios from 'axios';
import { Job } from '../types';

export const saveJob = async (job: Job) => {
    try {
        await axios.post('http://localhost:8000/jobs/save-job', job);
        alert('Job saved successfully');
    } catch (error) {
        alert('Failed to save job');
    }
};
