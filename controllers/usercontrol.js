const mongoose=require('mongoose');
const User=require('../model/user');
const Album=require('../model/playlist');
const Track=require('../model/song');
const connectdb = require('../util/database');
connectdb();

exports.viewplaylist=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const songs=await User.findById(userId)
        res.status(200).json(songs.playlist)
    }
    catch (err){
        console.error('an error',err);
        if (!err.statusCode){
            err.statusCode=500;
        }
        next();
    }
    
}

ezxport.addplaylist=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const trackId=req.params.id;
        const user =await User.findById(userId)
         const track=await Track.findById(trackId)
        
         user.playlist.push(track);
         const result=await user.save();
         res.status(200).json(result)

    }
    catch(err){
        console.error(err)
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          console.log(err);
          res.status(err.statusCode).json({ error: err.message, data: err.data });
    }
}