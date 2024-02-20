
const express = require('express');
const router = express.Router();
const session = require('express-session');
const usercontrol=require('../controllers/usercontrol');
const auth=require('../middleware/auth');
router.get("/username",(req,res)=>{
    res.render('username');
});
router.get("/upload",(req,res)=>{
    res.render('artist');
})
// router.post('/artist',usercontrol.addsong);
// router.get("/playlist",auth,usercontrol.viewplaylist)

// router.put("/playlist",auth,usercontrol.addplaylist);

module.exports = router;
