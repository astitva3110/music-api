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
    const userId=req.param.userId;
    const text=req.body.text;
    try{
        const artist=await Artist.findById(userId);
    
    const newAlbum=new Album({
        name:userId,
        text:text
    })
    await newAlbum.save(); 
    artist.albums.push(newAlbum._id);
    await artist.save();
    res.status(200).json({message:"Album is created"}); 
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server error" });
      }
    }
