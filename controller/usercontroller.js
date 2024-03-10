const mongoose=require('mongoose');
const express=require('express');
const User=require('../model/user');
const Playlist=require('../model/playlist');
const Song=require('../model/Song');
const Artist=require('../model/Artist');
const User=require('../model/user');
const connectdb = require('../util/database');
connectdb();

exports.getuser=async(req,res)=>{
    const userId=req.params;
    try{
      const user=await User.findById(userId);
      if(!user){
        res.status(404).json({message:'User is not found'});
      }
      res.status(200).json({message:"User is found "})
    }
    catch(err){
      console.error(err);
    }
}

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

exports.createPlaylist=async(req,res)=>{
 const {text}=req.body; 
 const userId=req.params;
 try{
 const user=await User.findById(userId);
 
 const newPlaylist=new Playlist({
  user:userId,
  text:text
 })

 await newPlaylist.save();
 await user.Playlist.push(newPlaylist._id)

 res.status(200).json({message:"User playlist is created",Playlist:newPlaylist});
 }
  catch(err){
            console.error(err);
            res.status(500).json({message:"internal Server Error"});
           }
}

// exports.getUnfollow=async(req,res)=>{
//     res.status(200).json("user on the page to unfollow")
// }

// exports.postUnfollow = async (req, res) => {
//     const currentUser = req.params.user_id;
//     const { _id } = req.body;

//     try {
//         if (currentUser === _id) {
//             return res.status(500).json({ message: "User can't follow itself" });
//         }

//         const unfollow = await User.findById(currentUser);
//         const user = await User.findById(_id);

//         if (!user || !unfollow) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (!user.following.includes(currentUser)) {
//             return res.status(500).json({ message: "User is not present" });
//         }

//         user.following.pull(currentUser);
//         unfollow.follower.pull(_id);

//         await unfollow.save();
//         await user.save();

//         return res.status(200).json({ message: "user unfollowed the other user" });
//     } catch (err) {
//         console.error(err);

//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

exports.getSearch=async(req,res)=>{
    const {query}=req.params;
    try{
        const Song=await Song.find({name:{$regex:new RegExp(query,'i')}})
        res.status(200).json(Song);
    }
    catch(err){
            console.error(err);
            res.status(500).json({message:"internal Server Error"});
           }
   
}