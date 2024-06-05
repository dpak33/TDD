import express, { Request, Response } from 'express';
import request from 'supertest';
import validateFields from '../src/middleware/validateFields';

const app = express();
app.use(express.json());

// Mock route to test the middleware
app.post('/test', validateFields(['username', 'email', 'password']), (req: Request, res: Response) => {
    res.status(200).json({ message: 'All fields are present' });
});

describe('validateFields Middleware', () => {
    it('should pass when all required fields are present', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('All fields are present');
    });

    it('should return 400 if username is missing', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                email: 'testuser@example.com',
                password: 'testpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username is required');
    });

    it('should return 400 if email is missing', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email is required');
    });

    it('should return 400 if password is missing', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                username: 'testuser',
                email: 'testuser@example.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Password is required');
    });
});