import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import stateRoutes from './routes/stateRoutes.js';

dotenv.config(); //connect to .env file

connectDB(); //connect to the database

const app = express(); //this will create a instance of the express module

app.use(express.json());

const PORT = process.env.PORT || 8000;

// Route for users
app.use('/api/users', userRoutes);

// Route for state covid data
app.use('/api/states', stateRoutes);

// Default message for root index GET request
app.get('/', (req, res) => {
    res.status(200);
    res.send('Home for WeChat MP testing');
}) 

app.listen(PORT, () => {
    console.log(`App is running on port number ${PORT}`);
});

