const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/notesapp');

const notesSchema = mongoose.Schema({
    title: String,
    details: String
})

module.exports = mongoose.model('notesinfo',notesSchema);


