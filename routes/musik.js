const session = require('express-session');
const express =require('express');
const router=express.Router();
require('dotenv').config();


router.get('/musik',(req,res)=>{
    res.render('musik');
})

module.exports=router;