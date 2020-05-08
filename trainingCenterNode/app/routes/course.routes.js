module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');
 
    app.post('/courses', courses.create);
   app.get('/courses', courses.findAll);
   app.get('/courses/:_id', courses.findById);
   app.put('/courses/updateById/:_id', courses.updateById);
   app.delete('/courses/:_id', courses.delete);

   
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
   app.put('/courses/updateByIdimg/:_id',upload.single('courseImage') ,courses.updateByIdImg);

   
}