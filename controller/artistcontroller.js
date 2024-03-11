const mongoose=require('mongoose');
const express=require('express');
const User=require('../model/user');
const Playlist=require('../model/playlist');
const Song=require('../model/Song');
const Artist=require('../model/Artist');
const connectdb = require('../util/database');
const Album = require('../model/Album');
connectdb();

exports.createAlbum=async(req,res)=>{
    const userId=req.params;
    const text=req.body;
    const user=await User.findById(userId);
    
    const newAlbum=new Album({
        name:userId,
        text:text
    })
    await newAlbum.save(); 
    res.status(200).json({message:"Album is created"}); 
}