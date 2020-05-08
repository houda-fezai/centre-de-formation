module.exports = (app) => {
    const  teachers= require('../controllers/teacher.controller.js');
    app.post('/teachers', teachers.create);
    app.post('/loginTr',teachers.login);
    app.get('/teachers', teachers.findAll);
   app.get('/teachers/:_id', teachers.findById);
   app.put('/teacher/updateById/:_id',teachers.updateById);


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
   app.put('/teacher/updateByIdimg/:_id',upload.single('teacherImage') ,teachers.updateByIdImg);

}