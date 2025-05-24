const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profpic: {
        type: String,
        default: "https://res.cloudinary.com/dwnc65sca/image/upload/v1748103117/images_kgtazg.jpg"
    }
})

module.exports = mongoose.model('user',userSchema);