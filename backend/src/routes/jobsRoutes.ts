import { Router } from 'express';
import Job from '../models/jobs';

const router: Router = Router();

// Save a job
router.post('/save-job', async (req, res) => {
    const jobData = req.body;

    const job = new Job({
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        summary: jobData.summary,
        salary: jobData.salary
    });

    try {
        await job.save();
        res.status(201).json({ message: 'Job saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save job', error });
    }
});

// Get saved jobs
router.get('/saved-jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch saved jobs', error });
    }
});

export default router;
