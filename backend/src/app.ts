import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from '../db';
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobsRoutes';

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;