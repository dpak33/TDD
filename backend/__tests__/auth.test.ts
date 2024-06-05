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

        it('should return 400 if fields are missing', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send({
                    username: 'testuser',
                    password: 'testpassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Email is required');
        });

        it('should return 500 for server error', async () => {
            jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
                throw new Error('Server error');
            });

            const response = await request(app)
                .post('/auth/signup')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                });

            expect(response.status).toBe(500);
            expect(response.text).toBe('Server error');
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

        it('should return 400 if username is missing', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    password: 'loginpassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username is required');
        });

        it('should return 400 if password is missing', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Password is required');
        });

        it('should return 500 for server error', async () => {
            jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
                throw new Error('Server error');
            });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser',
                    password: 'loginpassword'
                });

            expect(response.status).toBe(500);
            expect(response.text).toBe('Server error');
        });
    });
});