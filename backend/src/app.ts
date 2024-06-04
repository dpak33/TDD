import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from '../db';
import authRoutes from './routes/auth';
import jobsRoutes from './routes/jobsRoutes';

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight requests for all routes

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/jobs', jobsRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;