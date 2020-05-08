module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const verifymiddleware = require('../middleware/verify-middleware.js');
    app.post('/users', users.create);
    app.post('/login',users.login);
    app.get('/users', users.findAll);
   app.get('/users/:_id', users.findById);
   app.put('/users/updateById/:_id',users.updateById);

    const multer = require('multer');
   const path = require('path');
   
   const storage = multer.diskStorage({
       destination: function(req, file, cb){
          cb(null, './uploadUser/');
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
   app.put('/user/updateByIdimg/:_id',upload.single('userImage') ,users.updateByIdImg);
}