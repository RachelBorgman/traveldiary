const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: [{
        url: {
            type: String,
            // required: true
        }
    }],
    rating: {
        type: Number,
        required: true
    },

}, {timestamps: true});

const Travels = mongoose.model('Travels', travelSchema);

module.exports = Travels;