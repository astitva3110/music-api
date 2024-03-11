const mongoose=require('mongoose');
const express=require('express');
const User=require('../model/user');
const Playlist=require('../model/playlist');
const Song=require('../model/Song');
const Artist=require('../model/Artist');
const connectdb = require('../util/database');

connectdb();

exports.addSongIntoPlaylist=async(req,res)=>{
  const PlaylistId=req.params.playlist_id;
  const songId=req.body.songId;
  const userId=req.body.userId;
  try{
    const playlist1=await Playlist.findById(PlaylistId);
    const user=await User.findById(userId);
    const song=await Song.findById(songId);
    if(!song){
      res.status(404).json({message:"Song id not found"});
    }
    if(!user.Playlist.includes(PlaylistId)){
        res.status(500).json({message:"User don't have that playlist"});
      }
      else{
          playlist1.song.push(song);
          await playlist1.save();
          res.status(200).json({message:"song is added successfully"});
      }
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"internal Server Error"});
  }
  
}
//remove a song
exports.removeSong=async(req,res)=>{
    const PlaylistId=req.params.playlist_id;
    const {songId,userId}=req.body;
    try{
      const playlist1=await Playlist.findById(PlaylistId);
      const user=await User.findById(userId);
      const song=await Song.findById(songId);
      if(!song){
        res.status(404).json({message:"Song id not found"});
      }
      if(!user.Playlist.includes(PlaylistId)){
          res.status(500).json({message:"User don't have that playlist"});
        }
        else{
            playlist1.song.pull(songId);
            await playlist1.save();
            res.status(200).json({message:"song is remove successfully"});
        }
    }
    catch(err){
      console.error(err);
      res.status(500).json({message:"internal Server Error"});
    }
    
}

//delete the playlist
exports.deletePlaylist=async(req,res)=>{
    const PlaylistId=req.params;
    const {userId}=req.body;
    try{
        const playlist1=await Playlist.findById(PlaylistId);
      const user=await User.findById(userId);
      if(!user.Playlist.includes(PlaylistId)){
        res.status(500).json({message:"User don't have that playlist"});
      }
       user.deleteOne({playlist1:playlist1._id});
       Playlist.deleteOne({_id:playlist1_id});
       await user.save();
       await playlist1.save();
       res.status(200).json({message:"Playlist is deleted"});
      
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
      }   
}

//edit the playlist 
exports.editPlaylist=async(req,res)=>{
    const PlaylistId=req.params.playlist_id;
    const userId=req.body.userId;
    try{
      const playlist1=await Playlist.findById(PlaylistId);
      const user=await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if(!user.Playlist ||!user.Playlist.includes(PlaylistId)){
        res.status(500).json({message:"User don't have that playlist"});
      }
      playlist1.text=req.body.text;
      playlist1.img=req.body.img;
       await playlist1.save();
       res.status(200).send({ message: "Updated successfully" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal Server Error"});
      } 
}

exports.getPlaylist=async (req, res) => {
	const playlist = await PlayList.findById(req.params.playlist_id);
	if (!playlist) return res.status(404).send("not found");
    
	const songs = await Song.find({ _id: playlist.songs });
	res.status(200).send({ data: { playlist, songs } });
}