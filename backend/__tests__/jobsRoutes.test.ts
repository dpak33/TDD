import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Job from '../src/models/jobs';

describe('Jobs Routes', () => {
    beforeEach(async () => {
        // Clear the Job collection before each test
        await Job.deleteMany({});
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await mongoose.connection.close();
    });

    describe('POST /jobs/save-job', () => {
        it('should save a job successfully', async () => {
            const jobData = {
                title: 'Software Engineer',
                company: 'Tech Inc.',
                location: 'New York',
                summary: 'Developing software',
                salary: '$100,000'
            };

            const response = await request(app)
                .post('/jobs/save-job')
                .send(jobData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Job saved successfully');

            // Check if the job was saved in the database
            const savedJob = await Job.findOne({ title: 'Software Engineer' });
            expect(savedJob).not.toBeNull();
            expect(savedJob?.company).toBe('Tech Inc.');
        });

        it('should return 500 if saving a job fails', async () => {
            // Simulate a validation error by sending invalid data
            const invalidJobData = {
                title: '',
                company: 'Tech Inc.',
                location: 'New York',
                summary: 'Developing software',
                salary: '$100,000'
            };

            const response = await request(app)
                .post('/jobs/save-job')
                .send(invalidJobData);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Failed to save job');
        });
    });

    describe('GET /jobs/saved-jobs', () => {
        it('should fetch all saved jobs successfully', async () => {
            const jobData = [
                { title: 'Software Engineer', company: 'Tech Inc.', location: 'New York', summary: 'Developing software', salary: '$100,000' },
                { title: 'Data Scientist', company: 'Data Co.', location: 'San Francisco', summary: 'Analyzing data', salary: '$120,000' }
            ];

            await Job.insertMany(jobData);

            const response = await request(app)
                .get('/jobs/saved-jobs');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].title).toBe('Software Engineer');
            expect(response.body[1].title).toBe('Data Scientist');
        });

        it('should return 500 if fetching jobs fails', async () => {
            // Mock a failure
            jest.spyOn(Job, 'find').mockImplementationOnce(() => {
                throw new Error('Server error');
            });

            const response = await request(app)
                .get('/jobs/saved-jobs');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Failed to fetch saved jobs');
        });
    });
});