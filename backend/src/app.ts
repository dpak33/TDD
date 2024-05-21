import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


export default app;