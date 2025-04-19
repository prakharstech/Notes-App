const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    title: String,
    details: String
})

module.exports = mongoose.model('notesinfo',notesSchema);


