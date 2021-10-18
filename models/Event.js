
const mongoose = require('mongoose');

// Event Schema (Blueprint)
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: date,
        required: true,
    },
    attending: Boolean,
}, {timestamps: true});


// Event Model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;