const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const session=require('express-session');
const Oauth=require('./routes/Oauth2')
const username=require('./routes/username');
const app =express();

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(Oauth);
app.use(username);

// app.use(session({
//     secret: 'mysecret-is-secure-in-the-code-do-not-take-tesion',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))
app.get('/',(req,res)=>{
    res.render('home');
});

app.listen(3000,function(req,res){
    console.log("server is connected at 3000");
});