
const express = require('express');
const router = express.Router();

const Application = require('../models/Application');

// GET all applications
router.get('/applications', async (req, res) => {

    try {

        const applications = await Application.find();

        console.log('Fetching student applications...');
        console.log('Total applications:', applications.length);

        res.status(200).json({
            success: true,
            applications: applications
        });

    } catch (error) {

        console.log('Error fetching applications:', error.message);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch applications'
        });

    }

});


// POST a new application
router.post('/applications', async (req, res) => {

    try {

        const {
            studentName,
            email,
            rollNumber,
            internship
        } = req.body;

        console.log('\nNew student application received');

        console.log('Student Name:', studentName);
        console.log('Email:', email);
        console.log('Roll Number:', rollNumber);
        console.log('Internship:', internship);

        const newApplication = new Application({
            studentName,
            email,
            rollNumber,
            internship
        });

        const savedApplication = await newApplication.save();

        console.log('Application saved successfully in MongoDB');
        console.log('Application ID:', savedApplication._id);
        console.log('----------------------------------');

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application: savedApplication
        });

    } catch (error) {

        console.log('Application saving error:', error.message);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;
