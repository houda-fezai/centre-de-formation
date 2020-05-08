const Student = require('../models/student.model.js');
const Course = require('../models/course.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
/*
const storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, './upload/');
    },
    filename: function(req,file,cb){
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});
const upload = multer({storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }


})*/
var result;


exports.create =  (req, res) => {
    let student;
  
    console.log("Request received");
    res.status(200).send({"ok":true});
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

   Student.findOne({email: req.body.email}).then(
        (student)=>{
            return res.status(400).send({
                message: "User with email " + student.email + " already exists"
            });
        }
    )



    // Create a user

    // console.log("user=", user)
    bcrypt.genSalt(10, function(err, salt) {
        console.log("pass before hash : " + JSON.stringify(req.body))
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            
            student = new Student({
                name: req.body.name || "Untitled user",
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                role: "student",
                courses: {
                    title: req.body.courses.title,
                    description: req.body.courses.description
                   // Course
                }
            });
            console.log("pass after hash : " + JSON.stringify(student))
                // Save user in the database
            student.save()
                .then(data => {
                    res.json(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the user."
                    });
                });
        });
    });

};


exports.login = (req, res) => {
    Student.findOne({ email: req.body.email })
        .then(student => {
            bcrypt.compare(req.body.password, student.password).
            then((result) => {
            
                    console.log('email correct')
                    if (result === true){

                        try {
                        const tempExpiration = 60;
                        var token = jwt.sign({email: req.body.email, id: student._id}, 'une phrase', {expiresIn: tempExpiration});
                         res.json({tok: token , expiresIn: tempExpiration, Stid: student._id, role: student.role});
                        }
                        catch(error){
                            console.log(error);
                        }

                    }
                    
              
                })
                .catch(err => {
                    console.log(err);
                });


        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "student not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving student  with email " + req.params.email
            });
        });
};


exports.findById = (req, res) => {
    Student.findOne({ _id: req.params._id })
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            res.send(student);
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


   exports.findAll = (req, res) => {
    Student.find()
        .then(student => {
            res.send(student);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
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

  

    Student.findOneAndUpdate({ _id: req.params._id }, {

             name : req.body.name,
             lastname: req.body.name,
            // Course
            
        }, { new: true })
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "student not found with id " + req.params._id
                });
            }
            res.send(student);
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


exports.updateByIdImg = (req, res) => {
   
        // Validate Request
       if (!req.body) {
           return res.status(400).send({
               message: "course content can not be empty"
           });
       }
   
     
   
       Student.findOneAndUpdate({ _id: req.params._id }, {
   
         
               studentImage: req.file.path,
               

               
           }, { new: true })
           .then(student => {
               if (!student) {
                   return res.status(404).send({
                       message: "student not found with id " + req.params._id
                   });
               }
               res.send(student);
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

