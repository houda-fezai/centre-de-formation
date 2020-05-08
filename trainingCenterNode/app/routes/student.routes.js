module.exports = (app) => {
    const students = require('../controllers/student.controller.js');
   
    app.post('/student', students.create);
    app.post('/loginS',students.login);
    app.get('/student', students.findAll);
   app.get('/student/:_id', students.findById);
    app.put('/student/updateById/:_id',students.updateById);

   const multer = require('multer');
   const path = require('path');
   
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
   
   
   })
   app.put('/student/updateByIdimg/:_id',upload.single('studentImage') ,students.updateByIdImg);

   
}