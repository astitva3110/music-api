const session = require('express-session');
const express =require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const auth=require('../middleware/auth');
const musiccontrol=require('../controllers/musiccontrol.js')
require('dotenv').config();
router.use(bodyParser.json());

router.get('/musik',(req,res)=>{
  res.render('musik')
});
router.get('/play/:id',auth,musiccontrol.playmusic);


module.exports=router;