const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    title: String,
    details: String,
    user: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('notesinfo',notesSchema);


