const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    
    title: String,
    description: String,
    courseImage:String
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);