
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },

    rollNumber: {
        type: String,
        required: [true, 'Roll number is required'],
        trim: true
    },

    internship: {
        type: String,
        required: [true, 'Internship selection is required']
    }

}, {
    timestamps: true
});

const Application = mongoose.model(
    'Application',
    ApplicationSchema
);

module.exports = Application;
