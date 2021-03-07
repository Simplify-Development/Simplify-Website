const mongoose = require('mongoose');

const totalSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Total Applications', totalSchema)