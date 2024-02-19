const mongoose=require('mongoose');
const User=require('../model/user');
const Album=require('../model/playlist');
const Track=require('../model/song'); 
const connectdb = require('../util/database');
connectdb();


exports.view_music=(req,res)=>{
    res.render('musik')
}
exports.playmusic=async(req,res,next)=>{
    try{
  const{musicId}=req.params.id;
  const track=await Track.findById(musicId)
  if (track._id) {
    const path = "s3_musics/" + track.fileName;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Range": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/mpeg",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.status(404).json("Audio file does not exist");
    }
  } else {
    res.status(404).json("Audio does not exist");
  }
}
catch(err){
        console.error('an error',err);
        if (!err.statusCode){
            err.statusCode=500;
        }
    }
}