import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
    it('should return Hello World', async () => {
        const res = await request(app).get('/');
        expect(res.text).toBe('Hello World!');
        expect(res.status).toBe(200);
    });
});