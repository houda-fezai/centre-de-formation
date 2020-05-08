const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const adaptHeader = require ('./app/middleware/adapt-header.js');

const mongoose = require('mongoose');

const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(adaptHeader);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/upload',express.static('upload'));



mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser : true
}).then(()=> {
    console.log('connected successfully to database');
}).catch(err =>{
    console.log('cannot connect to database', err);
    process.exit();
})


/*app.get('/', (req, res) => {
    res.json({ "message": "Welcome to centre de formation ." });
});*/
app.get('/', (req, res)=>{
    res.send('<h1> socket.io </h1>');
});

require('./app/routes/user.routes.js')(app);

require('./app/routes/teacher.routes.js')(app);
require('./app/routes/student.routes.js')(app);
require('./app/routes/course.routes.js')(app);

/*app.listen(3000, ()=>{
    console.log('server is listening to port 3000');
});*/


io.on('connection',function(socket){
    console.log(socket.id);
   user = socket.id;
    console.log('a user connected');
    socket.on('disconnected',function(){
     console.log('user disconnected');
    });

 

    socket.on('my message', (msg)=>{
        io.emit('my broadcast', `user:${msg}`);
        console.log(msg);
    });

  

});

http.listen(3000, ()=>{
    console.log('listening to :3000');
})


