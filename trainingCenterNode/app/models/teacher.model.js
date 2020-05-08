const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    name: String,
    lastname: String,
    speciality: String,
    email: String,
    password: String,
    role: String,
    teacherImage:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Teacher', TeacherSchema);