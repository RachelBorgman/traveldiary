const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: [3, "Location must be at least 3 characters long"]
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "End Date is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters long"],
    },
    photos: [{
        url: {
            type: String,
            // required: true
        }
    }],
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },

}, {timestamps: true});

const Travels = mongoose.model('Travels', travelSchema);

module.exports = Travels;