const Course = require('../models/course.model.js');
const bcrypt = require('bcryptjs');
var result;


exports.create = (req, res) => {
    let course;

    console.log("Request received");
    res.status(200).send({"ok":true});
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user

     course = new Course({
                title: req.body.title || "Untitled user",
                description: req.body.description
                
            });


              course.save()
                .then(data => {
                    res.json(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the user."
                    });
                });


};

exports.findAll = (req, res) => {
    Course.find()
        .then(courses => {
            res.send(courses);
            console.log('corses all ')
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};


exports.findById = (req, res) => {
    Course.findOne({ _id: req.params._id })
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "course not found with id " + req.params._id
                });
            }
            res.send(course);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "course content can not be empty"
        });
    }

  
   Course.findOneAndUpdate({ _id: req.params._id }, {
            title: req.body.title || "Untitled course",
            description: req.body.description
            
        }, { new: true })
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            res.send(course);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "course not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating course with id " + req.params._id
            });
        });
};

exports.delete = (req, res) => {
    Course.findOneAndDelete({ _id: req.params._id })
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            res.send({ message: "book deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete book with id " + req.params._id
            });
        });
};

exports.updateByIdImg = (req, res) => {
   
    // Validate Request
   if (!req.body) {
       return res.status(400).send({
           message: "course content can not be empty"
       });
   }

 

  Course.findOneAndUpdate({ _id: req.params._id }, {

     
           courseImage: req.file.path,
           

           
       }, { new: true })
       .then(course => {
           if (!course) {
               return res.status(404).send({
                   message: "student not found with id " + req.params._id
               });
           }
           res.send(course);
       }).catch(err => {
           if (err.kind === 'ObjectId') {
               return res.status(404).send({
                   message: "course not found with id " + req.params._id
               });
           }
           return res.status(500).send({
               message: "Error updating course with id " + req.params._id
           });
       });
};