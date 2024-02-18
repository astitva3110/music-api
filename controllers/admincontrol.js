const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const Artist=require('../model/Artist');
const Album=require('../model/playlist');
const song=require('../model/song');
const connectdb = require('../util/database');
connectdb();

exports.newArtist=async(req,res,next)=>{
 try{ 
  const {name,img}=req.body;
  const artist=new Artist({
    name:name,
    album:[],
    img:img
  });
   const result= await artist.save()
    res.status(200).json(result);
  
  }
  catch(err){
    console.error("error from new artist routes",err);
    res.status(503).json(err);
  }
}

exports.newAlbum=async(req,res,next)=>{
   try{
    const{artistId,name,img}=req.body;
    let artist1=await Artist.findById(artistId);
    const album = new Album({
        name: name,
        img: image,
        tracks: [],
        artist: artist1,
      });
      await album.save();
      const result = await artist1.addAlbum(album);
      res.status(200).json(result)
   }
   catch(err){
    console.log(err);
    res.status(503).json(err);
   }
}

exports.newtrack=async(req,res,next)=>{
    try{
        const {name,song,img}=req.body;
        let album1=await Album.findById(albumId);
        const track=new Track({
            name:name,
            album:album,
            artist:album.artist,
            song:song,
            img:img
        })
        await track.save()
       const result=await track.addtrack(track)
       res.status(200).json(result);
    }
    catch(err){
       console.log(err);
       res.status(503).json(err);
    }
}