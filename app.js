const express=require('express');
const path=require('path');
const passport= require('./model/Oauth');
const cokkieparser=require('cookie-parser');
require('dotenv').config();


const user=require('./routes/user');
const musik=require('./routes/musik');
const artistroute=require('./routes/artist');
const auth=require('./routes/auth');
const playlist=require('./routes/Playlist');
const connectdb=require('./util/database');
const cookieParser = require('cookie-parser');
const app =express();


app.use(express.json());
connectdb();
app.use(auth);
app.use(cookieParser());
app.use(artistroute);
// app.use(musik);
app.use(user);
app.use(playlist);



app.get('/', (req,res)=>{
    res.render('home');
});


app.listen(3000,function(req,res){
    console.log("server is connected at 3000");
});