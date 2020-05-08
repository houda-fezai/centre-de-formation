const Course = require('./course.model.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    studentImage: String,
    role: String,
    courses:{
        title:String,
        description:String
       // {type: Schema.Types.ObjectId, ref: 'Course'}
    }
    
    
   

    
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);