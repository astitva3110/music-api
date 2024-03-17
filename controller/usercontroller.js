const mongoose=require('mongoose');
const express=require('express');
const User=require('../model/user');
const Playlist=require('../model/playlist');
const Song=require('../model/Song');
const Artist=require('../model/Artist');
const connectdb = require('../util/database');
connectdb();

//get the info of user
exports.getuser=async(req,res)=>{
    const userId=req.params.user_id;
    try{
      const user=await User.findById(userId);
      if(!user){
        res.status(404).json({message:'User is not found'});
      }
      res.status(200).json({message:"User is found ",user:user})
    }
    catch(err){
      console.error(err);
    }
}

//update the user data
exports.updateUserData=async(req,res)=>{
    const userId=req.params;
    const {update}=req.body;
   try{
   const user =await User.findById(userId);
   if (!user){
    res.status(404).json({message:"user is not matched"});
   }
   Object.assign(user,update);
    await user.save();
    res.status(200).json({message:"data is updated in database"})
   }
   catch(err){
       console.error(err);
   }
} 

 //creating a playlist
exports.createPlaylist=async(req,res)=>{
 const {text}=req.body; 
 const userId=req.params.user_id;
 try{
 const user=await User.findById(userId);
 
 const newPlaylist=new Playlist({
  user:userId,
  text:text
 })

 await newPlaylist.save();
 user.Playlist.push(newPlaylist._id)
 
 await user.save();

 res.status(200).json({message:"User playlist is created",Playlist:newPlaylist});
 }
  catch(err){
            console.error(err);
            res.status(500).json({message:"internal Server Error"});
           }
}

//liked  a song
exports.LikedSong=async(req,res)=>{
  const userId=req.body.user_id; 
  const songId=req.params.song_id;
  try{
  const user=await User.findById(userId);
  const song=await Song.findById(songId);
  console.log(song,user);


  if(!song){
    res.status(404).json({message:"Song id not found"});
  }
   user.likedSong.push(song._id);
   await user.save();
   res.status(200).json({message:"song is liked"});
  
  }
   catch(err){
             console.error(err);
             res.status(500).json({message:"internal Server Error"});
            }
 }

// UNliked  a song
exports.unLikedSong=async(req,res)=>{
  const userId=req.body.user_id; 
  const songId=req.params.song_id;
  try{
  const user=await User.findById(userId);
  const song=await Song.findById(songId);


  if(!song){
    res.status(404).json({message:"Song id not found"});
  }
  if(!user.likedSong.includes(songId)){
    res.status(500).json({message:"the is not liked"});
  }
   user.likedSong.pull(song._id);
   await user.save();
   res.status(200).json({message:"song is unlike successfully!"});
  }
   catch(err){
             console.error(err);
             res.status(500).json({message:"internal Server Error"});
            }
 }

//app-name for the app
 exports.appName=async(req,res)=>{
  const {appname}=req.body; 
  const userId=req.params.user_id;
  try{
  const user= await User.findById(userId);
  user.appname=appname;
  await user.save();
  res.status(200).json({message:"app name is upadated"})
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"internal Server Error"});
   }
  
 }
 exports.getappname=(req,res)=>{
  res.status(200).json({message:"internal Error"});
 }


//searching song
exports.getSearch=async(req,res)=>{
    const {query}=req.params;
    try{
        const song=await Song.find({name:{$regex:new RegExp(query,'i')}})
        res.status(200).json(song);
    }
    catch(err){
            console.error(err);
            res.status(500).json({message:"internal Server Error"});
           }
   
}

//shuffle Array funtion
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//shuffle play
exports.shufflePlay=async(req,res)=>{
  try {
    const songs = await Song.find();
    const shuffle = shuffleArray(songs);
    res.json({ shuffle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
}