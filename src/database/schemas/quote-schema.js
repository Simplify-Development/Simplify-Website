const mongoose = require('mongoose');

const Quotes = new mongoose.Schema({
    discordId: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Staff Quotes', Quotes)