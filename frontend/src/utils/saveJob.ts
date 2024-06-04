import axios from 'axios';
import { Job } from '../types';

export const saveJob = async (job: Job) => {
    try {
        await axios.post('http://127.0.0.1:5000/api/jobs/save-job', job);
        alert('Job saved successfully');
    } catch (error) {
        alert('Failed to save job');
    }
};
