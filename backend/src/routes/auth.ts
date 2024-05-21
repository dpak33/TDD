import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUserByUsername, User } from '../models/users';

const router = express.Router();
const SECRET_KEY = 'your_jwt_secret_key';

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (findUserByUsername(username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: Date.now(), // simple id generation
        username,
        password: hashedPassword
    };

    addUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

export default router;