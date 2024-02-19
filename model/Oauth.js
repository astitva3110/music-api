const passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const connectdb=require('../util/database');
const User=require('./user');
connectdb();
console.log("connteced to ")
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async(accessToken, refreshToken, profile,done)=>{
    try{
    const existinguser=await User.findOne({googleId:profile.id}).maxTimeMS(30000);
    if(existinguser){
      return done(null,existinguser);
    }
      const newUser= await User.create({
         googleId:profile.id,
         displayName:profile.displayName,
          email: (profile.emails && profile.emails.length > 0 && profile.emails[0].value)||'no email' ,
      });
      
      await newUser.save();
     return done(null,newUser,{googleId:profile.id});
    } catch(error){
      console.error(error);
    }
  }
));


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
  try{
 const user= await User.findById(id)
    done(null,user);
  }catch(error){
    console.log(error)
    done(error, null);
  }
})

module.exports = passport;