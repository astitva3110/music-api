const express =require('express');
const path=require('path');
const passport=require('passport');
const session = require('express-session');
const router=express.Router();
const bodyparser=require('body-parser');
const crypto=require('crypto');
const auth=require('../model/Oauth');
const { Session } = require('inspector');
const jwt=require('jsonwebtoken');
const usernameroute=require('./user');
require('dotenv').config();
const secret = crypto.randomBytes(32).toString('hex');
const JWTKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
router.use(session({
    secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
router.use(passport.initialize());
router.use(passport.session());
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    const newUser = req.newUser || {};
    const token =jwt.sign(newUser,JWTKey);
    // res.json({token:token});
    res.redirect('/username');
  });
module.exports=router;