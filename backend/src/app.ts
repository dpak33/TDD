import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import connectDB from '../db';
import authRoutes from './routes/auth';
import jobsRoutes from './routes/jobsRoutes';

const app = express();

// Connect to MongoDB
connectDB();

const allowedOrigins: (string | RegExp)[] = ['http://localhost:3000', /\.netlify\.app$/];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') {
                return allowedOrigin === origin;
            } else {
                return allowedOrigin.test(origin);
            }
        })) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
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