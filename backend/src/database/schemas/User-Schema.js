const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordTag: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Users', userSchema)