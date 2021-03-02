const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userSchema)