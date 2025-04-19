const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error:', err));

const notesSchema = mongoose.Schema({
    title: String,
    details: String
})

module.exports = mongoose.model('notesinfo',notesSchema);


