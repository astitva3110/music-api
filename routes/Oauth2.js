const express =require('express');
const path=require('path');
const passport=require('passport');
const session = require('express-session');
const router=express.Router();
const auth=require('../model/Oauth');
const { Session } = require('inspector');

router.use(session({
  secret: 'mysecret-is-secure-in-the-code-do-not-take-tesion',
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
    console.log("u");   
     res.redirect('/username');
  });
  router.get('/login',(req,res)=>{
    res.send("hii")
  })


module.exports=router;