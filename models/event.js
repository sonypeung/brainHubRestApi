const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: () => Promise.resolve(true),
            message: 'Email validation failed'
          }
    },
    eventDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('event', schema);