const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profpic: {
        type: String,
        default: "default.jpeg"
    }
})

module.exports = mongoose.model('user',userSchema);