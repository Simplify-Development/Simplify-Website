const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    app: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Developer Applications', DevSchema)