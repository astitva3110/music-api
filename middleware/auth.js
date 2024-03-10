const jwt = require('jsonwebtoken');
const { validate } = require('../model/Song');
require('dotenv').config();

module.exports = (req, res, next) => {
  // console.log('Request Headers:', req.headers);
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).send({ message: "Access is denied, no token " });
    }

    jwt.verify(token, process.env.JWTKey, (err, validToken) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" });
        } else {
            req.user = validToken;
        }
        next();
    });
};
