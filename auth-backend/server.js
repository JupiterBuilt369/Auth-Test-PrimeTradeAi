require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // <--- 1. Import CORS
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// --- 2. ADD THIS MIDDLEWARE BLOCK ---
app.use(cors({
    origin: 'http://localhost:3000', // Allow your React App
    credentials: true                // Allow cookies (Refresh Tokens) to travel
}));
// ------------------------------------

app.use(express.json());
app.use(cookieParser());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auth_demo');
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
};
connectDB();

app.use('/auth', authRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));