const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    title: String,
    details: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('notesinfo',notesSchema);


