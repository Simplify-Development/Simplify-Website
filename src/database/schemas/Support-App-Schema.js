const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
    app: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Support Applications', SupportSchema)