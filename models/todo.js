
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
            minlength: 2
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email'
            ]
        },

        rollNumber: {
            type: String,
            required: [true, 'Roll number is required'],
            trim: true
        },

        internship: {
            type: String,
            required: [true, 'Please select an internship'],
            enum: [
                'Web Development Intern',
                'Data Science Intern',
                'Java Developer Intern',
                'UI/UX Design Intern'
            ]
        }
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model(
    'Application',
    ApplicationSchema
);

module.exports = Application;
