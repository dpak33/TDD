import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/users';

describe('Auth Routes', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await mongoose.connection.close();
    });

    describe('POST /auth/signup', () => {
        it('should create a new user', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created successfully');
        });

        it('should return 400 if user already exists', async () => {
            await request(app)
                .post('/auth/signup')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                });

            const response = await request(app)
                .post('/auth/signup')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /auth/login', () => {
        it('should login a user', async () => {
            await request(app)
                .post('/auth/signup')
                .send({
                    username: 'loginuser',
                    email: 'loginuser@example.com',
                    password: 'loginpassword'
                });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser',
                    password: 'loginpassword'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 400 for invalid credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'invaliduser',
                    password: 'invalidpassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid username or password');
        });
    });
});
