const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const crypto=require('crypto');
const session=require('express-session');
const passport= require('./model/Oauth');
const mongodb_session=require('connect-mongodb-session')(session)
require('dotenv').config();


const Oauth=require('./routes/Oauth2')
const username=require('./routes/user');
const musik=require('./routes/musik');
const adminroute=require('./routes/adminroutes');
const artistroute=require('./routes/artist');
const connectdb=require('./util/database')
const app =express();


app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
connectdb();
 const store=new mongodb_session({
    uri:process.env.MONGODB_URI,
    collection:'session'
 });
 const secret = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store:store,
}))
 app.use(passport.initialize());
 app.use(passport.session());
app.use(Oauth);
app.use(artistroute);
app.use(username);
app.use(musik);
app.use(adminroute);


app.get('/', (req,res)=>{
    res.render('home');
});

app.listen(3000,function(req,res){
    console.log("server is connected at 3000");
});