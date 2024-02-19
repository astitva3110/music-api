const mongoose=require('mongoose');
const User=require('../model/user');
const Album=require('../model/playlist');
const Track=require('../model/song');
const Artist=require('../model/Artist');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
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

exports.addplaylist=async(req,res,next)=>{
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

exports.addsong=(req,res)=>{
    cloudinary.config({
        cloud_name: 'dgcuw0c5i',
        api_key: '278399312688125',
        api_secret: '4tHJw3f26hmT-XqnQvYasIMclW8'
      });
      
      // Set up Multer for file uploads
      const storage = multer.memoryStorage();
      const upload = multer({ storage: storage });
      
      // Set up Mongoose schema and model for artists
      const artistSchema = new mongoose.Schema({
        name: String,
        songName: String,
        imageUrl: String,
        audioUrl: String
      });
      
      const Artist = mongoose.model('Artist', artistSchema);
      
      // POST route for handling file uploads and saving to MongoDB
      router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
        try {
          const { name, songName } = req.body;
          const imageBuffer = req.files['image'][0].buffer;
          const audioBuffer = req.files['audio'][0].buffer;
      
          // Upload image and audio to Cloudinary
          const imageUploadResult = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) throw error;
            return result;
          }).end(imageBuffer);
      
          const audioUploadResult = await cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
            if (error) throw error;
            return result;
          }).end(audioBuffer);
      
          // Create a new artist document with the data
          const newArtist = new Artist({
            name: name,
            songName: songName,
            imageUrl: imageUploadResult.secure_url,
            audioUrl: audioUploadResult.secure_url
          });
      
          // Save the artist to MongoDB
          const savedArtist = await newArtist.save();
      
          res.json({ message: 'Artist data saved successfully', artist: savedArtist });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
}