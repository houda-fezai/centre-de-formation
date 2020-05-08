const Teacher = require('../models/teacher.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var result;



exports.create = (req, res) => {
    let teacher;

    console.log("Request received");
    res.status(200).send({"ok":true});
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "teacher content can not be empty"
        });
    }

    Teacher.findOne({email: req.body.email}).then(
        (teacher)=>{
            return res.status(400).send({
                message: "teacher with email " + teacher.email + " already exists"
            });
        }
    )


    bcrypt.genSalt(10, function(err, salt) {
        console.log("pass before hash : " + JSON.stringify(req.body))
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            teacher = new Teacher({
                name: req.body.name || "Untitled user",
                lastname: req.body.lastname,
                speciality: req.body.speciality,
                email: req.body.email,
                password: hash,
                role: "teacher"
            });
            console.log("pass after hash : " + JSON.stringify(teacher))
                // Save user in the database
            teacher.save()
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
    Teacher.findOne({ email: req.body.email })
        .then(teacher => {
            bcrypt.compare(req.body.password, teacher.password).
            then((result) => {
            
                    console.log('email correct')
                    if (result === true){

                        try {
                        const tempExpiration = 60;
                        var token = jwt.sign({email: req.body.email, id: teacher._id}, 'une phrase', {expiresIn: tempExpiration});
                         res.json({tok: token , expiresIn: tempExpiration, TrId: teacher._id, role: teacher.role});
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
                    message: "teacher not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving teacher with email " + req.params.email
            });
        });
};


exports.findById = (req, res) => {
    Teacher.findOne({ _id: req.params._id })
        .then(teacher => {
            if (!teacher) {
                return res.status(404).send({
                    message: "teacher not found with id " + req.params._id
                });
            }
            res.send(teacher);
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
    Teacher.find()
        .then(teacher => {
            res.send(teacher);
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

 

   Teacher.findOneAndUpdate({ _id: req.params._id }, {

     
           
            name : req.body.name,
            lastname: req.body.name,
           
            
           
       }, { new: true })
       .then(teacher => {
           if (!teacher) {
               return res.status(404).send({
                   message: "teacher not found with id " + req.params._id
               });
           }
           res.send(teacher);
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
   
     
   
       Teacher.findOneAndUpdate({ _id: req.params._id }, {
   
         
               teacherImage: req.file.path,
               

               
           }, { new: true })
           .then(teacher => {
               if (!teacher) {
                   return res.status(404).send({
                       message: "student not found with id " + req.params._id
                   });
               }
               res.send(teacher);
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
