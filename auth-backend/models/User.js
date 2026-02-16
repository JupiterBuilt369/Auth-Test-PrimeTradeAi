const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // We changed 'name' to 'username' and added 'email'
    username: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }
});

module.exports = mongoose.model('User', userSchema);