import axios from 'axios';
import { Job } from '../types';

export const saveJob = async (job: Job) => {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/jobs/save-job`, job);
        alert('Job saved successfully');
    } catch (error) {
        alert('Failed to save job');
    }
};
