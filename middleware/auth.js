const { verify } = require('crypto');
const jwt=require('jsonwebtoken');
const { validate } = require('../model/song');
require('dotenv').config();

module.exports=(req,res,next)=>{
    const token =req.header.authorization
    if(!token)
    return res.status(401).send({message:"access is denied no token is provided"})
  jwt.verify(token,process.env.JWTKey,(err,validToken)=>{
    if(err){
         return res.status(403).send({message:"invalid token"});
        }
        else {
            req.user= validToken;
            next();
        }
  });
};