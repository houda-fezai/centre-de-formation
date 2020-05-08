const User = require('../models/user.model.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{
        var token= req.headers.authorization;
        console.log('token:', token);
        jwt.verify(token,'une phrase');
        next();


    } catch(error) {
        res.status(401).send(error);

    }
}