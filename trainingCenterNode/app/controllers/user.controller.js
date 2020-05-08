const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
var result;


exports.create = (req, res) => {
    let user;

    console.log("Request received");
    res.status(200).send({"ok":true});
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    User.findOne({email: req.body.email}).then(
        (user)=>{
            return res.status(400).send({
                message: "User with email " + user.email + " already exists"
            });
        }
    )



    // Create a user

    // console.log("user=", user)
    bcrypt.genSalt(10, function(err, salt) {
        console.log("pass before hash : " + JSON.stringify(req.body))
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user = new User({
                name: req.body.name || "Untitled user",
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                role: "humanResource"
            });
            console.log("pass after hash : " + JSON.stringify(user))
                // Save user in the database
            user.save()
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
    User.findOne({ email: req.body.email })
        .then(user => {
            bcrypt.compare(req.body.password, user.password).
            then((result) => {
            
                    console.log('email correct')
                    if (result === true){
                        
                         console.log('',user);
                        try {
                        const tempExpiration = 600;
                        var token = jwt.sign({email: req.body.email, id: user._id}, 'une phrase', {expiresIn: tempExpiration});
                         res.json({tok: token , expiresIn: tempExpiration, useN: user.name, roles: user.role});
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
                    message: "user not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with email " + req.params.email
            });
        });
};

exports.findById = (req, res) => {
    User.findOne({ _id: req.params._id })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "book not found with id " + req.params._id
                });
            }
            res.send(user);
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
    User.find()
        .then(users => {
            res.send(users);
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

 

  User.findOneAndUpdate({ _id: req.params._id }, {

            name : req.body.name,
            lastname: req.body.name
            
           
       }, { new: true })
       .then(user => {
           if (!user) {
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
   
     
   
       User.findOneAndUpdate({ _id: req.params._id }, {
   
         
               userImage: req.file.path,
               

               
           }, { new: true })
           .then(user => {
               if (!user) {
                   return res.status(404).send({
                       message: "student not found with id " + req.params._id
                   });
               }
               res.send(user);
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

 
