const mongoose=require('mongooose');
const { Schema } = require('mongoose');

const ArtistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    albums:[{
        type:mongoose.Schema.ObjectId,
        ref:"Album"
    }],
    img:{
       type:String,
    } 
});

ArtistSchema.methods.addAlbum=function(album) {
    this.albums.push(album);
    return this.save();
};

const artist=mongoose.model("artist",ArtistSchema)
module.export=artist;