// Imports / Node Packages
const mongoose = require('mongoose');

// User Schema / The template MongoDB uses to save user info with
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

// Exporting the file
module.exports = mongoose.model('Users', userSchema)