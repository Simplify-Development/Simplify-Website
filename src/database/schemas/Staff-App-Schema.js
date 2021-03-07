const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    app: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Staff Applications', StaffSchema)