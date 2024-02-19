
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const Artist = require('../model/Artist');
require('dotenv').config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.cloud_name ,
  api_key: process.env.api_key ,
  api_secret: process.env.api_secret
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
    try {
      const { name, songName } = req.body;
      const imageBuffer = req.files['image'][0].buffer;
      const audioBuffer = req.files['audio'][0].buffer;
      const imageUploadResult = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) throw error;
        return result;
      }).end(imageBuffer.toString('base64'));
  
      const audioUploadResult = await cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
        if (error) throw error;
        return result;
      }).end(audioBuffer.toString('base64')); 
      const newArtist = new Artist({
        name: name,
        songName: songName,
        imageUrl: imageUploadResult.secure_url,
        audioUrl: audioUploadResult.secure_url
      });  
   await newArtist.save();
      res.redirect('/musik')
    } catch (error) {
      console.error('Error:', error);
    }
  });

module.exports = router;
