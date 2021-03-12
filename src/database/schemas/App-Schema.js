const mongoose = require('mongoose');

const newAppSchema = new mongoose.Schema({
    appType: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    discordId: {
        type: String,
        require: true
    },
    reqs: {
        type: Boolean,
        required: true
    },
    applicationId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Applications', newAppSchema)