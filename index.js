
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();

});

// API Routes
app.use('/api', routes);


// Start server after database connection
async function startServer() {

    try {

        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log('Database connected successfully');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {

        console.error('MongoDB connection failed:', error.message);

        process.exit(1);

    }

}

startServer();
