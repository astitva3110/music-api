const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const crypto=require('crypto');
const session=require('express-session');
const passport= require('./model/Oauth');
require('dotenv').config();


const user=require('./routes/user');
const musik=require('./routes/musik');
const artistroute=require('./routes/artist');
const auth=require('./routes/auth');
const connectdb=require('./util/database')
const app =express();


app.use(express.json());

connectdb();

app.use(artistroute);
app.use(auth);
app.use(musik);
app.use(user);



app.get('/', (req,res)=>{
    res.render('home');
});


app.listen(3000,function(req,res){
    console.log("server is connected at 3000");
});