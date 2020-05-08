const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    userImage: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);