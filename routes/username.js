const session = require('express-session');
const express =require('express');
const router=express.Router();

router.get('/username',(req,res)=>{
    res.render('username')
  })

module.exports=router;