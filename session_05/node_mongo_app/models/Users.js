const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    email: String,
    hobbies: [String]
});




module.exports = mongoose.model('User', userSchema);
