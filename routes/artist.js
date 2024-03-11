const express = require('express');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const Artist = require('../model/Artist');
const artistcontroller=require('../controller/artistcontroller')
const isArtist=require('../middleware/isArtist')
const verify=require('../middleware/verify');
require('dotenv').config();

const router = express.Router();

router.use(fileupload({
  useTempFiles: true
}));
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


router.post('/upload',[verify,isArtist],async(req,res)=>{
  try {
const imageFile = req.files.image;
const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath);
    
const audioFile = req.files.audio;
const audioResult = await cloudinary.uploader.upload(audioFile.tempFilePath, { resource_type: 'video' });

const newartist = new Artist({
  name: req.body.name,
  songName: req.body.songName,
  imageUrl: imageResult.secure_url,
  audioUrl: audioResult.secure_url,
    });

    await newartist.save();
    res.redirect("/musik")
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//create a album
router.post('/createAlbum',[verify,isArtist],artistcontroller.createAlbum);

module.exports = router;
